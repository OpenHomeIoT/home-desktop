import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from "@reach/router";

import HomeController from "../controller/HomeController";

import Heading from "../components/Heading";
import Room from "../components/Room";
import Row from '../components/Row';
import Card from '../components/card/Card';
import Icon from '../components/Icon';
import Text from "../components/Text";

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devicesToBeConfigured: [
        // { _id: "oshiot-Switchead3", ssid: "oshiot-Switchead3", timeDiscovered: Date.now() }
      ],
      externalDevices: [
        {
          usn: "usn1",
          ssdpDescriptionLocation: "",
          ipAddress: "10.1.1.12",
          timeDiscovered: Date.now(),
          timeLastSeen: Date.now(),
          company: "Roku",
          deviceType: "Roku TV",
          room: "Kitchen",
          name: "Kitchen Light",
          status: "On",
          internal: false,
          type: "tv_roku"
        },
        {
          usn: "usn2",
          ssdpDescriptionLocation: "",
          ipAddress: "10.1.1.12",
          timeDiscovered: Date.now(),
          timeLastSeen: Date.now(),
          company: "Roku",
          deviceType: "Roku TV",
          room: "Kitchen",
          name: "Kitchen Light 2",
          status: "Off",
          internal: false,
          type: "tv_roku"
        },
        {
          usn: "usn2",
          ssdpDescriptionLocation: "",
          ipAddress: "10.1.1.12",
          timeDiscovered: Date.now(),
          timeLastSeen: Date.now(),
          company: "Roku",
          deviceType: "Roku TV",
          room: "Kitchen",
          name: "Kitchen Light 3",
          status: "Off",
          internal: false,
          type: "tv_roku"
        },
        {
          usn: "usn2",
          ssdpDescriptionLocation: "",
          ipAddress: "10.1.1.12",
          timeDiscovered: Date.now(),
          timeLastSeen: Date.now(),
          company: "Roku",
          deviceType: "Roku TV",
          room: "Kitchen",
          name: "Kitchen Light 4",
          status: "Off",
          internal: false,
          type: "tv_roku"
        },
        {
          usn: "usn2",
          ssdpDescriptionLocation: "",
          ipAddress: "10.1.1.12",
          timeDiscovered: Date.now(),
          timeLastSeen: Date.now(),
          company: "Roku",
          deviceType: "Roku TV",
          room: "Kitchen",
          name: "Kitchen Light 5",
          status: "Off",
          internal: false,
          type: "tv_roku"
        },
        {
          usn: "usn3",
          ssdpDescriptionLocation: "",
          ipAddress: "10.1.1.13",
          timeDiscovered: Date.now(),
          timeLastSeen: Date.now(),
          company: "Roku",
          deviceType: "Roku TV",
          room: "Bedroom",
          name: "Bedroom Light",
          status: "On",
          internal: false,
          type: "tv_roku"
        },
        // {
        //   usn: "usn3",
        //   ssdpDescriptionLocation: "",
        //   ipAddress: "10.1.1.13",
        //   timeDiscovered: Date.now(),
        //   timeLastSeen: Date.now(),
        //   company: "Roku",
        //   deviceType: "Roku TV",
        //   room: "none",
        //   name: "Light",
        //   status: "On",
        //   internal: false,
        //   type: "tv_roku"
        // },
      ],
      home: {
        name: "Leon-Lessard Home",
        timeCreated: Date.now(),
        timeLastUpdated: Date.now(),
      },
      homeController: new HomeController(this),
      internalDevices: [],
      rooms: ["Bedroom", "Kitchen"]
    };

    this.removeDeviceToBeConfigured = this.removeDeviceToBeConfigured.bind(this);
    this.showNewDeviceToBeConfigured = this.showNewDeviceToBeConfigured.bind(this);
    this.showDevicesToBeConfigured = this.showDevicesToBeConfigured.bind(this);
  }

  componentDidMount() {
    this.state.homeController.viewInitialized();
  }

  render() {
    const { devicesToBeConfigured, externalDevices, home, internalDevices, rooms } = this.state;
    const style = {
      homeView: {
        padding: "2rem 1em 1em 1em",
        userSelect: "none"
      },
      homeName: {
        textAlign: "center",
      },
      devicesToBeConfigured: {
        padding: "0.5em 0",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
      },
      setupLink: {
        textDecoration: "none",
        color:"#000"
      },
      devicesToBeConfiguredCard: {
        // display: "inline",
        padding: "1em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      setupInfoIcon: {
        margin: "0 1em 0 0"
      }
    };

    return (
      <div style={style.homeView}>
        <Row>
          <Heading style={style.homeName} h={4}>{ home.name }</Heading>
        </Row>
        <Row>
          {/* TODO: home action bar */}
        </Row>
        {
          // render the devices to be setup, if any
          devicesToBeConfigured.length > 0 &&
          <Row style={style.devicesToBeConfigured}>
            <Link to="/device/setup" style={style.setupLink}>
              <Card z={2} style={style.devicesToBeConfiguredCard}>
                <Icon size="1.5rem" style={style.setupInfoIcon}>info_outlined</Icon>
                <Text>
                  {this._getDevicesToBeConfiguredText()}
                </Text>
              </Card>
            </Link>
          </Row>
        }
        {
          // render the devices that have not been assigned to a room in the house.
          this._renderDevicesWithNoRoom()
        }
        {
          // render the rooms in the home
          rooms.map((room, index, rooms) => {
            const devices  = internalDevices.filter(device => device.room === room).concat(externalDevices.filter(device => device.room === room));
            return <Room name={room} devices={devices} key={`${index}-room-${room}`} />;
          })
        }
      </div>
    );
  }

  /**
   * Remove the device to be configured from the array.
   * @param {{ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }} deviceToRemove
   */
  removeDeviceToBeConfigured(deviceToRemove) {
    const { devicesToBeConfigured } = this.state;
    const idx = this._getIndexOfDeviceToBeConfigured(deviceToRemove);
    if (idx !== -1) {
      devicesToBeConfigured.splice(idx, 1);
    }
    this.setState({ devicesToBeConfigured });
  }

  /**
   * Add a new device the devicesToConfigure array
   * @param {{ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }} newDevice
   */
  showNewDeviceToBeConfigured(newDevice) {
    const { devicesToBeConfigured } = this.state;
    const idx = this._getIndexOfDeviceToBeConfigured(newDevice);
    if (idx !== -1) {
      devicesToBeConfigured[idx] = newDevice;
    } else {
      devicesToBeConfigured.push(newDevice);
    }
    this.setState({ devicesToBeConfigured });
  }

  /**
   * Show the devices that need to be configured.
   * @param {{ _id: string, ssid: string, timeDiscovered: number, timeLastSeen: number }[]} devicesToBeConfigured the devices to be configured.
   */
  showDevicesToBeConfigured(devicesToBeConfigured) {
    this.setState({ devicesToBeConfigured });
  }

  /**
   *
   * @param {{ name: string, timeCreated: number, timeLastUpdated: number }} home the home.
   */
  showHome(home) {
    this.setState({ home });
  }

  _getIndexOfDeviceToBeConfigured(deviceToBeConfigured) {
    const { devicesToBeConfigured } = this.state;
    let i = 0;
    let found = false;
    for (const device of devicesToBeConfigured) {
      if (device._id === deviceToBeConfigured._id) {
        found = true;
        break;
      }
      i++;
    }
    return (found) ? i : -1;
  }

  _getDevicesToBeConfiguredText() {
    const { devicesToBeConfigured } = this.state;
    if (devicesToBeConfigured.length > 1) {
      return `There are ${devicesToBeConfigured.length} devices to be configured.`;
    }
    if (devicesToBeConfigured.length === 1) {
      return `There is a device that needs to be configured.`;
    }
  }

  /**
   * Render devices with no room.
   */
  _renderDevicesWithNoRoom() {
    const { externalDevices, internalDevices } = this.state;
    const devices = internalDevices.filter(device => device.room === "none").concat(externalDevices.filter(device => device.room === "none"));
    return <Room name="none" devices={devices} key={'room-none'} />;
  }
}

export default HomeView;
