import React, { Component } from "react";

import Card from "./card/Card";
import CardBody from "./card/CardBody";
import CardFooter from "./card/CardFooter";
import CardHeader from "./card/CardHeader";
import Text from "./Text";
import Icon from "./Icon";
import DropdownButton from "./dropdownbutton/DropdownButton";
// import DropdownButtonIcon from "./dropdownbutton/DropdownButtonIcon";
import DropdownButtonItem from "./dropdownbutton/DropdownButtonItem";
import DropdownButtonText from "./dropdownbutton/DropdownButtonText";

import LightOn from "../drawable/internal/light-on.png";
import LightOff from "../drawable/internal/light-off.png";

import "./DeviceThumb.css";

class DeviceThumb extends Component {

  /**
   * Create a new DeviceThumb.
   * @param {{ children: any, device: any, displayIndex: number }} props the props. # TODO:
   */
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { device, style: compStyle } = this.props;
    // const { } = this.state;
    const style = {
      deviceName: {
        whitespace: "nowrap",
        fontSize: ".75rem"
      },
      deviceThumb: {

      },
      body: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      footer: {
        borderTop: "1px solid #bdc3c7",
        padding: "1em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer"
      }
    };
    Object.assign(style.deviceThumb, compStyle);
    return (
      <div className="DeviceThumb" style={style.deviceThumb}>
        <Card>
          <CardHeader className="Header">
            <Text style={style.deviceName}>{ device.name }</Text>
            <DropdownButton icon="more_vert">
              <DropdownButtonItem>
                <DropdownButtonText>Settings</DropdownButtonText>
              </DropdownButtonItem>
            </DropdownButton>
          </CardHeader>
          <CardBody style={style.body}>
            {/* Light On */}
            { device.status.toLowerCase() === "on" &&
              <div className="ImageContainer">
                <img src={LightOn} alt="Light on" className="Image" />
              </div>
            }
            {/* Light Off */}
            { device.status.toLowerCase() === "off" &&
              <div className="ImageContainer">
                <img src={LightOff} alt="Light off" className="Image" />
              </div>
            }
          </CardBody>
          <CardFooter style={style.footer}>
            <Text style={{ fontSize: ".75rem" }}>{ device.status }</Text>
            <Icon size="1.5rem">arrow_right</Icon>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default DeviceThumb;
