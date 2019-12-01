import ProcessManager from "../../manager/ProcessManager";

const processManager = ProcessManager.getInstance();

const onHealth = (event, { sender, recipient, status }) => {
    switch (sender) {
        case "device":
            processManager.updateDeviceProcessStatus(status);
            break;
        case "renderer":
            processManager.updateRendererProcessStatus(status);
            break;
        default:
            break;
    }
};

export default {
    onHealth
};
