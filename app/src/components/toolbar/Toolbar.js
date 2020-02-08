import React, { Component } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";

const mapStateToProps = (state) => ({
  primaryColor: state.ui.primaryColor,
  uiForegroundColor: state.ui.foregroundColor
});

class Toolbar extends Component {

  render() {
    const { children, backgroundColor, foregroundColor, uiForegroundColor, primaryColor, style: compStyle } = this.props;
    const style = {
      toolbar: {
        backgroundColor: backgroundColor || primaryColor,
        height: "4em",
        width: "100%",
        margin: "0 0 1em 0",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        borderRadius: 3,
        color: foregroundColor || uiForegroundColor
      }
    };
    Object.assign(style.toolbar, compStyle);
    return (
      <div style={style.toolbar}>{ children }</div>
    );
  }
}

export default connect(mapStateToProps)(Toolbar);
