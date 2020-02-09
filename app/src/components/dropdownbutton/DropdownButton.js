import React, { Component } from "react";
import PropTypes from "prop-types";

import IconButton from "../IconButton";

class DropdownButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.dialogRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("touchstart", (event) => this.handleClickOutside(event));
    }

    componentWillUnmount() {
        window.removeEventListener("touchstart", (event) => this.handleClickOutside(event));
    }

    handleClickOutside(event) {
        if (this.dialogRef &&
            event &&
            this.dialogRef.current &&
            this.dialogRef.current.contains(event.target))
            this.setInvisible();
    }

    render() {
        const { icon, color, children, style } = this.props;
        let compStyle = {
            dropdownButton: {
                cursor: "pointer",
                position: "relative"
            },
            content: {
                visibility: "hidden",
                position: "absolute",
                width: 160,
                boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                zIndex: 50,
                top: 30,
                transform: "translate(-80%, 0)",
                borderRadius: 4,
                backgroundColor: "#ffffff",
                opacity: 0,
                transition: "opacity .2s ease-in-out"
            },
            arrow: {
                content: "",
                position: "absolute",
                top: 35,
                left: 21,
                width: 0,
                height: 0,
                border: "5px solid transparent",
                borderBottomColor: "#ffffff",
                borderTop: 0,
                marginLeft: -10,
                marginTop: -10,
                visibility: "hidden",
                opacity: 0,
                transition: "opacity .2s ease-in-out"
            },
        };
        Object.assign(compStyle.dropdownButton, style);

        if (this.state.visible) {
            compStyle.content.visibility = "visible";
            compStyle.arrow.visibility = "visible";
            compStyle.content.opacity = 1;
            compStyle.arrow.opacity = 1;
        }
        return (
            <div style={compStyle.dropdownButton} onClick={() => this.toggleVisibility()}>
                <IconButton color={color} size={this.props.iconSize}>{icon}</IconButton>
                <div style={compStyle.content} ref={this.dialogRef} onMouseLeave={() => this.setInvisible()}>
                    {children}
                </div>
                <div style={compStyle.arrow} />
            </div>
        );
    }

    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    }

    setInvisible() {
        this.setState({ visible: false });
    }
}


DropdownButton.propTypes = {
    color: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    icon: PropTypes.string,
    iconSize: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
};


export default DropdownButton;
