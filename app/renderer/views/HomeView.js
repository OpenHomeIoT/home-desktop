import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HomeController from "../controller/HomeController";

import Card from '../components/card/Card';
import CardBody from "../components/card/CardBody";
import CardFooter from "../components/card/CardFooter";
import CardHeader from "../components/card/CardHeader";
import Heading from "../components/Heading";
import Room from "../components/Room";
import Row from '../components/Row';


class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      externalDevices: [
        {
          usn: "usn",
          ssdpDescriptionLocation: "",
          ipAddress: "10.1.1.12",
          timeDiscovered: Date.now(),
          timeLastSeen: Date.now(),
          company: "Roku",
          deviceType: "Roku TV",
          room: "Kitchen",
          name: "Kitchen TV"
        }
      ],
      home: {
        name: "Seth's Home",
        timeCreated: Date.now(),
        timeLastUpdated: Date.now(),
      },
      homeController: new HomeController(this),
      internalDevices: [],
      rooms: ["Kitchen"]
    };
  }

  componentDidMount() {
    this.state.homeController.viewInitialized();
  }

  render() {
    const { externalDevices, home, internalDevices, rooms } = this.state;
    const style = {
      homeView: {
        padding: "2rem 1em 1em 1em",
        userSelect: "none"
      },
      homeName: {
        textAlign: "center",
      }
    };

    return (
      <div style={style.homeView}>
        <Row>
          <Heading style={style.homeName} h={5}>{ home.name }</Heading>
        </Row>
        <Row>
          {/* TODO: home action bar */}
        </Row>
        <br/>
        <Row>
          { this._renderDevicesWithNoRoom() }
        </Row>
        {
          rooms.map((room, index, rooms) => {
            const devices  = internalDevices.filter(device => device.room === room).concat(externalDevices.filter(device => device.room === room));
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
   * Render devices with no room.
   */
  _renderDevicesWithNoRoom() {
    const { externalDevices, internalDevices } = this.state;
    const devices = internalDevices.filter(device => device.room === "none").concat(externalDevices.filter(device => device.room === "none"));
    return <Room name="none" devices={devices} />;
  }
}

export default HomeView;
