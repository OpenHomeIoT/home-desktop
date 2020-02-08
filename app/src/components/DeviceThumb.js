import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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

const mapStateToProps = (state) => ({
  primaryColor: state.ui.primaryColor,
  foregroundColor: state.ui.foregroundColor
});

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
    const { device, displayIndex, footerLink, foregroundColor, primaryColor, style: compStyle } = this.props;
    // const { } = this.state;
    const style = {
      deviceName: {
        whitespace: "nowrap",
        fontSize: ".75rem"
      },
      deviceThumb: {},
      body: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      footer: {
        // borderTop: "1px solid #bdc3c7",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: primaryColor,
        color: foregroundColor
      }
    };
    Object.assign(style.deviceThumb, compStyle);
    let className = "DeviceThumb";
    if (displayIndex % 4 === 0) className += " Left";
    else if ((displayIndex + 1) % 4 === 0) className += " Right";
    else className += " Center";

    const lightServiceStatus = device.serviceStatuses.filter(serviceStatus => serviceStatus.name.indexOf("OpenHomeIoT:service:switch") !== -1);
    return (
      <div className={className} style={style.deviceThumb}>
        <Card>
          <CardHeader className="Header">
            <Text style={style.deviceName}>{ device.name }</Text>
            <DropdownButton icon="more_vert" color="#000000">
              <DropdownButtonItem>
                <DropdownButtonText>Settings</DropdownButtonText>
              </DropdownButtonItem>
            </DropdownButton>
          </CardHeader>
          <CardBody style={style.body}>
            {/* Light On */}
            { lightServiceStatus[0].status === "on" &&
              <div className="ImageContainer">
                <img src={LightOn} alt="Light on" className="Image" />
              </div>
            }
            {/* Light Off */}
            { lightServiceStatus[0].status === "off" &&
              <div className="ImageContainer">
                <img src={LightOff} alt="Light off" className="Image" />
              </div>
            }
            {/* Unknown */}
            { lightServiceStatus[0].status === "unknown" &&
              <div className="ImageContainer">
                <img src={LightOff} alt="Light off" className="Image" />
              </div>
            }
          </CardBody>
          <Link to={footerLink} style={{ textDecoration: "none" }} activestyle={{}}>
            <CardFooter style={style.footer}>
              <Text style={{ fontSize: ".75rem" }}>{ lightServiceStatus[0].status }</Text>
              <Icon size="1.5rem">arrow_right</Icon>
            </CardFooter>
          </Link>
        </Card>
      </div>
    );
  }
}

DeviceThumb.propTypes = {
  footerLink: PropTypes.string,
  image: PropTypes.string
};

export default connect(mapStateToProps)(DeviceThumb);
