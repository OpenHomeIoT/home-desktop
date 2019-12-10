import React, { Component } from "react";
import PropTypes from "prop-types";

import { getPrimaryColor, getSecondaryColor, getForegroundColor, clearConfigListener } from "./config";

class Themeable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      primaryColor: "#000000",
      secondaryColor: "#000000",
      foregroundColor: "#000000",
    };

    this._onHandleForegroundColorUpdate = this._onHandleForegroundColorUpdate.bind(this);
    this._onHandlePrimaryColorUpdate = this._onHandlePrimaryColorUpdate.bind(this);
    this._onHandleSecondaryColorUpdate = this._onHandleSecondaryColorUpdate.bind(this);
  }

  componentDidMount() {
    getPrimaryColor(this._onHandlePrimaryColorUpdate);
    getSecondaryColor(this._onHandleSecondaryColorUpdate);
    getForegroundColor(this._onHandleForegroundColorUpdate);
  }

  componentWillUnmount() {
    clearConfigListener(this._onHandleForegroundColorUpdate);
    clearConfigListener(this._onHandlePrimaryColorUpdate);
    clearConfigListener(this._onHandleSecondaryColorUpdate);
  }

  render() {
    return <div>{ this.props.children }</div>;
  }

  /**
   * Handle an update to the forground color value.
   * @param {string} foregroundColor the foreground color.
   */
  _onHandleForegroundColorUpdate(foregroundColor) {
    this.setState({ foregroundColor });
  }

  /**
   * Handle an update to the primary color value.
   * @param {string} primaryColor the primary color
   */
  _onHandlePrimaryColorUpdate(primaryColor) {
    this.setState({ primaryColor });
  }

  /**
   * Handle an update to the secondary color value.
   * @param {string} secondaryColor the secondary color.
   */
  _onHandleSecondaryColorUpdate(secondaryColor) {
    this.setState({ secondaryColor });
  }
}

export default Themeable;
