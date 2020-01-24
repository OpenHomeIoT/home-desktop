import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "@reach/router";

import DevicesSetupController from "../../controller/DevicesSetupController";
import Card from "../../components/card/Card";
import Heading from "../../components/Heading";
import Row from "../../components/Row";
import CardHeader from '../../components/card/CardHeader';
import CardBody from '../../components/card/CardBody';
import Text from "../../components/Text";
import CardFooter from '../../components/card/CardFooter';
import Icon from '../../components/Icon';

class DevicesSetupView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      controller: new DevicesSetupController(this),
      devicesToConfigure: []
    };
  }

  componentDidMount() {
    const { controller } = this.state;
    controller.viewInitialized();
  }

  /**
   * Display a new device to be configured.
   * @param {{ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }} device the device.
   */
  newDeviceToBeConfigured(device) {
    const { devicesToConfigure } = this.state;
    const idx = this._getDeviceIdx(device._id);
    if (idx === -1) {
      devicesToConfigure.push(device);
    } else {
      devicesToConfigure[idx] = device;
    }
    this.setState({ devicesToConfigure });
  }

  /**
   * Remove a device to be configured.
   * @param {{ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }} device the device.
   */
  removeDeviceToBeConfigured(device) {
    const { devicesToConfigure } = this.state;
    const idx = this._getDeviceIdx(device._id);
    if (idx !== -1) {
      devicesToConfigure.splice(idx, 1);
    }
    this.setState({ devicesToConfigure });
  }

  render() {
    const { devicesToConfigure } = this.state;
    const style = {
      devicesSetupView: {
        padding: "2rem 0 0 0"
      },
      deviceToConfigure: {
        margin: "0 0 1em 0",
        width: "60%"
      },
      heading: {
        textAlign: "center"
      },
      deviceRow: {
        width: "50%",
        display: "flex",
        justifyContent: "center"
      },
      discovered: {
        fontSize: ".8rem",
        color: "#aaa"
      },
      header: {
        padding: "1em 1em 0 1em"
      },
      body: {
        padding: "1em"
      },
      footer: {
        borderTop: "1px solid #bdc3c7",
        padding: "1em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        color: "#000"
      },
      link: {
        textDecoration: "none",
        color: "#000"
      }
    };
    return (
      <div style={ style.devicesSetupView}>
      <Row>
          <Heading h={4} style={style.heading}>You have some devices to setup...</Heading>
        </Row>
        {
          devicesToConfigure.map((device) => {
            const dateDiscovered = new Date(device.timeDiscovered).toDateString();
            const timeDiscovered = new Date(device.timeDiscovered).toLocaleTimeString();

            return (
              <Row key={`device-${device.ssid}`} style={style.deviceRow}>
                <Card style={style.deviceToConfigure}>
                  <CardHeader style={style.header}>
                    <Heading h={5}>{`SSID: ${device.ssid}`}</Heading>
                  </CardHeader>
                  <CardBody style={style.body}>
                    <Text style={style.discovered}>{`Discovered: ${dateDiscovered} at ${timeDiscovered}`}</Text>
                  </CardBody>
                  <Link to={`/device/setup/${device.ssid}`} style={style.link}>
                    <CardFooter style={style.footer}>
                        <Text>Setup</Text>
                        <Icon size="1.5rem">arrow_right</Icon>
                    </CardFooter>
                  </Link>
                </Card>
              </Row>
            );
          })
        }
      </div>
    );
  }

  /**
   * Show devices that need to be configured.
   * @param {{ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }[]} devices the devices.
   */
  showDevicesToBeConfigured(devices) {
    this.setState({ devicesToConfigure: devices });
  }

  /**
   * Get the index of the device to configure in the array.
   * @param {string} id the id of the device record.
   */
  _getDeviceIdx(id) {
    const { devicesToConfigure } = this.state;
    let i = 0;
    for (const device of devicesToConfigure) {
      if (device._id === id) {
        return i;
      }
      i++;
    }
    return -1;
  }

  _setupDevice(id) {

  }
}

export default DevicesSetupView;
