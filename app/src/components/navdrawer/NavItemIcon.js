import React from "react";

import Icon from "../Icon";
import PropTypes from "prop-types";

import "./NavItemIcon.css";
const NavItemIcon = ({ children, size, color, style: compStyle}) => {
    const style = {
        navItemIcon: {}
    };
    Object.assign(style.navItemIcon, compStyle);
    return (
        <div className="NavItemIcon" style={style.navItemIcon}>
            <Icon size={size || "1.5rem"} color={color || "#000000"}>{children}</Icon>
        </div>
    );
};

NavItemIcon.propTypes = {
    children: PropTypes.string,
    size: PropTypes.number,
};

export default NavItemIcon;
