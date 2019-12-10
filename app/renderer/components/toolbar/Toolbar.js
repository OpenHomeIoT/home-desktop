//@ts-check
import React, { Component } from "react";
import PropTypes from "prop-types";

import Themeable from "../Themeable";

class Toolbar extends Themeable {

  constructor(props) {
    super(props);
  }

  render() {
    const { children, style: compStyle } = this.props;
    const { foregroundColor, primaryColor, secondaryColor } = this.state;
    const style = {
      toolbar: {
        backgroundColor: primaryColor,
        height: "4em",
        width: "100%",
        margin: "0 0 1em 0",

      }
    };
    Object.assign(style.toolbar, compStyle);
    return (
      <div style={style.toolbar}>

      </div>
    );
  }
}

export default Toolbar;
