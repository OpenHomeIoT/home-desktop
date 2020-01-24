import React, { Component } from 'react';
import PropTypes from "prop-types";
import Icon from "./Icon";

import "./IconButton.css";
class IconButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
        };
    }
    render() {
        const { children, color, size, style: compStyle, onClick } = this.props;
        const { pressed } = this.state;
        const style = {
            iconButton: {}
        };
        Object.assign(style.iconButton, compStyle);

        if (pressed) {
            style.iconButton.backgroundColor = "#eeeeee";
        }

        return (
            <div className="IconButton" style={style.iconButton} onClick={onClick} onMouseDown={() => this.togglePress()} onMouseUp={() => this.togglePress()}>
                <Icon color={color} size={size}>{children}</Icon>
            </div>
        );
    }

    togglePress() {
        this.setState({ pressed: !this.state.pressed });
    }
}

IconButton.propTypes = {
    children: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.any,
    onClick: PropTypes.func
};

export default IconButton;
