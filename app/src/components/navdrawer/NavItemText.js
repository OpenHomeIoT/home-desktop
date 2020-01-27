import React from "react";
import PropTypes from "prop-types";

import "./NavItemText.css";
const NavItemText = (props) => {
    const style = {
        navItemText: {}
    };
    Object.assign(style.navItemText, props.style);
    return (
        <div className="NavItemText" style={style.navItemText}>
            <span>{props.children}</span>
        </div>
    );
};

NavItemText.propTypes = {
    children: PropTypes.string,
};

export default NavItemText;
