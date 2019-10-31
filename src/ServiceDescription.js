
class ServiceDescription {
  
  // lights
  static LIGHT_SIMPLE = "urn:oshiot:service:light-simple:1";
  static LIGHT_SIMPLE_ID = `${ServiceDescription.LIGHT_SIMPLE}-0`;
  static LIGHT_DIMMABLE = "urn:oshiot:service:light-dimmable:1";
  static LIGHT_DIMMABLE_ID = `${ServiceDescription.LIGHT_DIMMABLE}-0`;

  // sensors
  static CO2_SENSOR = "urn:oshiot:service:co2-sensor:1";
  static CO2_SENSOR_ID = `${ServiceDescription.CO2_SENSOR}-0`;
  static CO_SENSOR = "urn:oshiot:service:co-sensor:1";
  static CO_SENSOR_ID = `${ServiceDescription.CO2_SENSOR}-0`;
  static DUST_SENSOR = "urn:oshiot:service:dust-sensor:1";
  static DUST_SENSOR_ID = `${ServiceDescription.DUST_SENSOR}-0`;

  // switches
  static SWITCH = "urn:oshiot:service:switch:1";
  static SWITCH_ID = `${ServiceDescription.SWITCH}-0`;
  static IRBLASTER = "urn:oshiot:service:irblaster:1";
  static IRBLASTER_ID = `${ServiceDescription.IRBLASTER}-0`;
}

export default ServiceDescription;