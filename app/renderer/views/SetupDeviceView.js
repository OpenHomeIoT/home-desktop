import React, { Component } from "react"
import PropTypes from "prop-types"

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
    const { children, ssid, style: compStyle } = this.props;
    const { } = this.state;
    const style = {
      SetupDeviceView: {}
    };
    Object.assign(style.SetupDeviceView, compStyle);
    return (
      <div style={style.SetupDeviceView}>
        { children }
      </div>
    );
  }
}

SetupDeviceView.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  ssid: PropTypes.string.isRequired,
  style: PropTypes.instanceOf(React.CSSProperties)
}

export default SetupDeviceView;
