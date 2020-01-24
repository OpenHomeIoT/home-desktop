import React, { Component } from "react"
import PropTypes from "prop-types"

import Card from "../../components/card/Card";
import CardHeader from "../../components/card/CardHeader";
import CardBody from "../../components/card/CardBody";
import CardFooter from "../../components/card/CardFooter";
import Row from "../../components/Row";

class SetupDeviceView extends Component {

  /**
   * Create a new SetupDeviceView component.
   * @param {{ ssid: string }} props props for the SetupDeviceView component.
   */
  constructor(props) {
    super(props);
    this.state = {
      device: null
    };

    // binding
  }

  render() {
    const { ssid, style: compStyle } = this.props;
    const { } = this.state;
    const style = {
      SetupDeviceView: {
        padding: "2em 1em 1em 1em"
      },
      row: {
        marginTop: "1em",
        marginBottom: "1em"
      },
      card: {
        maxWidth: "50%",
        display: "block",
        margin: "0 auto"
      }
    };
    Object.assign(style.SetupDeviceView, compStyle);
    return (
      <div style={style.SetupDeviceView}>
        <Row style={style.row}>
          <Card style={style.card} z={2}>
            <CardHeader></CardHeader>
            <CardBody>
              { ssid }
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </Row>
      </div>
    );
  }
}

SetupDeviceView.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  style: PropTypes.instanceOf(React.CSSProperties)
}

export default SetupDeviceView;
