import React, { Component } from "react";

import Card from "./card/Card";
import CardBody from "./card/CardBody";
import CardFooter from "./card/CardFooter";
import CardHeader from "./card/CardHeader";
import Text from "./Text";
import Drawable from "./Drawable";
import Icon from "./Icon";
import DropdownButton from "./dropdownbutton/DropdownButton";
import DropdownButtonIcon from "./dropdownbutton/DropdownButtonIcon";
import DropdownButtonItem from "./dropdownbutton/DropdownButtonItem";
import DropdownButtonText from "./dropdownbutton/DropdownButtonText";

// import LightOn from "../drawable/light-on.png";

class DeviceThumb extends Component {

  /**
   * Create a new DeviceThumb.
   * @param {{ children: any, device }} props the props. # TODO:
   */
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { device, style: compStyle } = this.props;
    const { } = this.state;
    const style = {
      deviceThumb: {
        width: "25.0%",
        float: "left",
        minHeight: 180
      },
      card: {
        minHeight: 180
      },
      header: {
        padding: "1em",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      },
      deviceName: {
        whiteSpace: "nowrap",
        fontSize: ".74rem"
      },
      image: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2em 0"
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
      <div style={style.deviceThumb}>
        <Card style={style.card}>
          <CardHeader style={style.header}>
            <Text style={style.deviceName}>{ device.name }</Text>
            <DropdownButton icon="more_vert">
              <DropdownButtonItem>
                <DropdownButtonText>Settings</DropdownButtonText>
              </DropdownButtonItem>
            </DropdownButton>
          </CardHeader>
          <CardBody>
            <div style={style.image}>
              <Drawable height={128} width={128} src="internal/light-on.png" />
            </div>
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
