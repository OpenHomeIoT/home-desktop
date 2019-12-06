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
        let style = {
            iconButton: {
                position: "relative",
                boxSizing: "border-box",
                border: "none",
                borderRadius: 4,
                verticalAlign: "middle",
                textAlign: "center",
                padding: ".5rem .5rem .35rem .5rem",
                fontSize: ".8rem",
                overflow: "hidden",
                outline: "none",
                cursor: "pointer",
                userSelect: "none",
                WebkitUserSelect: "none",
                display: "inline-block"
            }
        };

        if (this.state.pressed) {
            style.iconButton.backgroundColor = "#eeeeee";
        }
        return (
            <div style={style.iconButton} onClick={this.props.onClick} onMouseDown={() => this.togglePress()} onMouseUp={() => this.togglePress()}>
                <Icon color={this.props.color}>{this.props.children}</Icon>
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
    onClick: PropTypes.func
};
 
export default IconButton;