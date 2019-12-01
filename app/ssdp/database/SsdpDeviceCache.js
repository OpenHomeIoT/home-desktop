import Database from "../../common/database/Database";
import DatabaseHelper from "../../common/database/helper/DatabaseHelper";

export default class SsdpDeviceCache extends Database {
    
    static _instance = null;

    static getInstance() {
        if (SsdpDeviceCache._instance == null) {
            SsdpDeviceCache._instance = new SsdpDeviceCache();
        }
        return SsdpDeviceCache._instance;
    }

    constructor() {
        super({
            name: "SsdpDeviceCache",
            isLedger: false,
            primaryKey: "usn",
            fields: [
                { name: "usn", type: DatabaseHelper.TEXT },
                { name: "ipAddress", type: DatabaseHelper.TEXT },
                { name: "timeDiscovered", type: DatabaseHelper.INT },
                { name: "timeLastSeen", type: DatabaseHelper.INT },
                { name: "headers", type: DatabaseHelper.TEXT },
                { name: "rendererIsAwareOfDevice", type: DatabaseHelper.BOOLEAN }
            ]
        }, { isMemoryDB: false });
    }
};
