import React, { Component } from "react";

import Card from "./card/Card";
import CardFooter from "./card/CardFooter";
import CardHeader from "./card/CardHeader";
import Text from "./Text";
import Drawable from "./Drawable";

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
        minHeight: 150,
        padding: "1em"
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
        padding: "1em"
      }
    };
    Object.assign(style.deviceThumb, compStyle);
    return (
      <div style={style.deviceThumb}>
        <Card style={style.card}>
          <CardHeader style={style.header}>
            {/* TODO: circle device image */}
            <Text>{ device.name }</Text>
            <div style={style.image}>
              <Drawable height={128} width={128} src="light-on.png" />
            </div>
          </CardHeader>
          <CardFooter style={style.footer}>
            <Text style={{ fontSize: ".75rem" }}>Device Status</Text>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default DeviceThumb;
