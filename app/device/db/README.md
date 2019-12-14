# Internal Database Tables

### Connection Buffer Table

When a device disconnects from the Hub via the Socket.io connection, information on how to get that device to reconnect to the Hub is stored in this database.

| Name | Type | Description |
| ---- | ---- | ---- |
| usn | string  | The unique service name of the device. |
| timeAdded | number | The timestamp of when the entry was added to the Connection Buffer Table. |
| ipAddress | string | The IP Address of the IoTDevice that disconnected. |

### Devices Table

Stores the Open Source Home IoT device information.

| Name | Type | Description |
| ---- | ---- | ---- |
| usn | string | The unique service name of the device. |
| ssdpDescriptionLocation | string | The SSDP description location for the device. |
| ipAddress | string | The IP Address of the device. |
| services | string[] | A list of services that this device supports |
