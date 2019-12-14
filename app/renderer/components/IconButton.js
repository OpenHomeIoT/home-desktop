import React, { Component } from 'react';
import PropTypes from "prop-types";
import Icon from "./Icon";


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
            iconButton: {
                position: "relative",
                boxSizing: "border-box",
                border: "none",
                borderRadius: 4,
                verticalAlign: "middle",
                textAlign: "center",
                padding: ".5em .5em .35em .5em",
                fontSize: size || ".8rem",
                overflow: "hidden",
                outline: "none",
                cursor: "pointer",
                userSelect: "none",
                WebkitUserSelect: "none",
                display: "inline-block"
            }
        };
        Object.assign(style.iconButton, compStyle);

        if (pressed) {
            style.iconButton.backgroundColor = "#eeeeee";
        }

        return (
            <div style={style.iconButton} onClick={onClick} onMouseDown={() => this.togglePress()} onMouseUp={() => this.togglePress()}>
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
