import React, { Component } from "react"
import PropTypes from "prop-types"
import Row from "../../components/Row";

class ConnectToDeviceView extends Component {

  /**
   * Create a new ConnectToDeviceView component.
   * @param {{}} props props for the ConnectToDeviceView component.
   */
  constructor(props) {
    super(props);
    this.state = {};

    // binding
  }

  render() {
    const { children, style: compStyle } = this.props;
    const { } = this.state;
    const style = {
      ConnectToDeviceView: {}
    };
    Object.assign(style.ConnectToDeviceView, compStyle);
    return (
      <Row style={style.ConnectToDeviceView}>

      </Row>
    );
  }
}

ConnectToDeviceView.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  style: PropTypes.instanceOf(React.CSSProperties)
}

export default ConnectToDeviceView;
