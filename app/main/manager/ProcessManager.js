import { BrowserWindow, Menu, app } from "electron";
import path from "path";
import Channel from "../../common/ipc/Channel";
import IpcHelper from "../../common/ipc/IpcHelper";
import Destination from "../../common/ipc/Destination";

const CWD = process.cwd();
const isDevelopment = process.env.NODE_ENV === "development";

export default class ProcessManager {

    static _instance = null;

    /**
     * Get the instance of the process manager.
     * @returns {ProcessManager}
     */
    static getInstance() {
        if (ProcessManager._instance == null) {
            ProcessManager._instance = new ProcessManager();
        }
        return ProcessManager._instance;
    }

    constructor() {
        this._rendererProcess = null;
        this._rendererProcessStatus = {
            lastUpdated: 0,
            status: "Unknown"
        };
        this._timer = null;
    }

    /**
     * Create the renderer process.
     * @returns {Electron.BrowserWindow}
     */
    createRendererProcess() {
        const rendererProcess = new BrowserWindow({
            width: 1036,
            height: 800,
            minWidth: 640,
            minHeight: 480,
            show: false,
            webPreferences: {
                nodeIntegration: true
            }
        });
        this._rendererProcess = rendererProcess;
        this._rendererProcess.loadFile(path.resolve(path.join(CWD, "build/renderer/index.html")));

        this._rendererProcess.once("ready-to-show", () => this._rendererProcess.show());
        this._rendererProcess.on("ready-to-show", () => {
            if (isDevelopment) {
                // add inspect element on right click menu
                this._rendererProcess.webContents.on('context-menu', (e, props) => {
                    Menu.buildFromTemplate([
                    {
                        label: 'Inspect element',
                        click() {
                        rendererProcess.inspectElement(props.x, props.y);
                        },
                    },
                    ]).popup(this._rendererProcess);
                });
            }
        });
        this._rendererProcess.on("close", (event) => {
            event.preventDefault();
            this._rendererProcess.webContents.send(Channel.PROCESS_QUIT, IpcHelper.createMessage(Destination.main, Destination.renderer, null));
        });
        this._rendererProcess = rendererProcess;
        return this._rendererProcess;
    }

    /**
     * Destroy the renderer process and close the app.
     */
    destroyRendererProcess() {
        // TODO: get rid of this dumbass solution
        while (this._deviceProcess) {} // wait for the device process to be destroyed
        this.updateRendererProcessStatus("Destroyed");
        app.exit();
    }

    /**
     * Get the renderer process.
     * @returns {BrowserWindow | null}
     */
    getRendererProcess() {
        return this._rendererProcess;
    }

    /**
     * Start watching the processes for health checks.
     */
    startWatchingProcesses() {
        console.log("[ProcessManager] Watching processes.");
        this._timer = setInterval(() => this._checkProcesses(), 2000);
    }

    /**
     * Stop watching the processes for health checks.
     */
    stopWatchingProcesses() {
        console.log("[ProcessManager] No longer watching processes.");
        if (this._timer) clearInterval(this._timer);
    }

    /**
     * Update the status of the renderer process.
     * @param {string} status the status of the process.
     */
    updateRendererProcessStatus(status) {
        if (this._rendererProcessStatus.status !== status) {
            console.log(`[ProcessManager] Renderer process status changed from "${this._rendererProcessStatus.status}" to "${status}"`);
        }
        this._rendererProcessStatus.lastUpdated = Date.now();
        this._rendererProcessStatus.status = status;
    }
};
