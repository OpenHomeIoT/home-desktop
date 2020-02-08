import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import HomeController from "../controller/HomeController";

import Heading from "../components/Heading";
import Room from "../components/Room";
import Row from '../components/Row';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      externalDevices: [],
      home: {
        name: "Leon-Lessard Home",
        timeCreated: Date.now(),
        timeLastUpdated: Date.now(),
      },
      homeController: new HomeController(this),
      openHomeIoTDevices: [],
      rooms: ["Bedroom", "Kitchen"]
    };

    // binding
    this.showAllOpenHomeIoTDevices = this.showAllOpenHomeIoTDevices.bind(this);
  }

  componentDidMount() {
    this.state.homeController.viewInitialized();
  }

  render() {
    const { externalDevices, home, openHomeIoTDevices, rooms } = this.state;
    const style = {
      homeView: {
        userSelect: "none", // TODO: move this to AppContent
      },
      homeName: {
        textAlign: "center",
      },
      setupLink: {
        textDecoration: "none",
        color:"#000"
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
          // render the devices that have not been assigned to a room in the house.
          this._renderDevicesWithNoRoom()
        }
        {
          // render the rooms in the home
          rooms.map((room, index, rooms) => {
            const devices  = openHomeIoTDevices.filter(device => device.room === room).concat(externalDevices.filter(device => device.room === room));
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
   *
   * @param {{ name: string, timeCreated: number, timeLastUpdated: number }} home the home.
   */
  showHome(home) {
    this.setState({ home });
  }

  /**
   *
   * @param {any[]} openHomeIoTDevices the OpenHomeIoT devices
   */
  showAllOpenHomeIoTDevices(openHomeIoTDevices) {
    this.setState({ openHomeIoTDevices })
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
    const { externalDevices, openHomeIoTDevices } = this.state;
    const devices = openHomeIoTDevices.filter(device => device.room === "none").concat(externalDevices.filter(device => device.room === "none"));
    return <Room name="none" devices={devices} key={'room-none'} />;
  }
}

export default HomeView;
