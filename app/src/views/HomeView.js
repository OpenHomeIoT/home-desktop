import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import HomeController from "../controller/HomeController";

import { Heading, Row } from "@react-uix/web";
import Room from "../components/Room";

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
        userSelect: "none",
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
            let devices = [];
            if (openHomeIoTDevices) {
              devices  = openHomeIoTDevices.filter(device => device.room === room).concat(externalDevices.filter(device => device.room === room));
            }
            return <Room name={room} devices={devices} key={`${index}-room-${room}`} />;
          })
        }
      </div>
    );
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

  /**
   * Render devices with no room.
   */
  _renderDevicesWithNoRoom() {
    const { externalDevices, openHomeIoTDevices } = this.state;
    if (openHomeIoTDevices && openHomeIoTDevices.length > 0) {
      const devices = openHomeIoTDevices.filter(device => device.room === "none").concat(externalDevices.filter(device => device.room === "none"));
      return <Room name="none" devices={devices} key={'room-none'} />;
    }
    return <div style={{display: "none"}} />;
  }
}

export default HomeView;
