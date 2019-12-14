import React from "react";
import PropTypes from "prop-types";

import Icon from "../Icon";

const DropdownButtonIcon = (props) => {
    const style = {
        dropdownIcon: {
            margin: "0 1rem 0 0"
        }
    };
    return (
        <div style={style.dropdownIcon}>
            <Icon color={props.color}>{props.children}</Icon>
        </div>
    );
};

DropdownButtonIcon.propTypes = {
    children: PropTypes.string,
    color: PropTypes.string,
};
 
export default DropdownButtonIcon;