//@ts-check
import Database from "../../common/database/Database";

class ExternalDeviceDatabase extends Database {

    static _instance = null;

    /**
     *
     * @returns {ExternalDeviceDatabase}
     */
    static getInstance() {
        if (!ExternalDeviceDatabase._instance) {
            ExternalDeviceDatabase._instance = new ExternalDeviceDatabase();
        }
        return ExternalDeviceDatabase._instance;
    }

    constructor() {
        super({
            name: "ExternalDevices",
            isLedger: false,
            primaryKey: "",
            fields: [
                { name: "usn", type: "string" },
                { name: "ssdpDescriptionLocation", type: "string" },
                { name: "ipAddress", type: "string" },
                { name: "timeDiscovered", type: "number" },
                { name: "timeLastSeen", type: "number" },
                { name: "company", type: "string" },
                { name: "deviceType", type: "string" },
                { name: "name", type: "string" }
            ]
        }, {});
    }
}

export default ExternalDeviceDatabase;
