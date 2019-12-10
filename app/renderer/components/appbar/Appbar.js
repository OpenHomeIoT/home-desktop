import React, { Component } from 'react';
import PropTypes from "prop-types";

import {
    getPrimaryColor,
    getForegroundColor,
    setAppbarDefined,
    setAppbarHeight,
    clearConfigListener
} from "../config";

class Appbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foregroundColor: "",
            primaryColor: "",
        };
        this.updateForegroundColor = this.updateForegroundColor.bind(this);
        this.updatePrimaryColor = this.updatePrimaryColor.bind(this);
    }

    componentDidMount() {
        getForegroundColor(this.updateForegroundColor);
        getPrimaryColor(this.updatePrimaryColor);
    }

    componentWillUnmount() {
        clearConfigListener(this.updateForegroundColor);
        clearConfigListener(this.updatePrimaryColor);
    }

    updateForegroundColor(color) {
        this.setState({ foregroundColor: color })
    }

    updatePrimaryColor(color) {
        this.setState({ primaryColor: color });
    }

    render() {
        const { backgroundColor, demo, foregroundColor, children, height, style: compStyle } = this.props;

        const style = {
            appbar: {
                height: height || 62,
                width: "100%",
                backgroundColor: backgroundColor || this.state.primaryColor,
                color: foregroundColor || this.state.foregroundColor,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
                boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
                padding: "0 1em"
            },
        };

        if (!demo) {
            setAppbarDefined(true);
            setAppbarHeight(style.appbar.height);
            style.appbar.position = "fixed";
        }
        Object.apply(style.appbar, compStyle);
        return (
            <div style={style.appbar}>
                {children}
            </div>
        );
    }
}

Appbar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    height: PropTypes.number,
    demo: PropTypes.bool,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string,
};

export default Appbar;
