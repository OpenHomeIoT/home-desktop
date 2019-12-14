import React, { Component } from "react";
import PropTypes from "prop-types";

import Util from "../Util";

class DropdownButtonItem extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
        };
    }

    render() { 
        let style = {
            dropdownItem: {
                display: "flex",
                alignContent: "center",
                padding: "0.75rem",
                color: this.props.foregroundColor || "#000000"
            }
        };


        return (
            <div 
                style={style.dropdownItem}
                onMouseEnter={() => this.toggleHover()}
                onMouseLeave={() => this.toggleHover()}
                onClick={() => this.props.onClick && this.props.onClick() }
            >
                {this.props.children}
            </div>
        );
    }

    toggleHover() {
        this.setState({ hovered: !this.state.hovered });
    }
}

DropdownButtonItem.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    foregroundColor: PropTypes.string,
    onClick: PropTypes.func
};
 
export default DropdownButtonItem;