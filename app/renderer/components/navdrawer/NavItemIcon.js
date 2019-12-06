import React from "react";

import Icon from "../Icon";
import PropTypes from "prop-types";

const NavItemIcon = (props) => {
    const style = {
        navItemIcon: {

        }
    };
    return (
        <div style={style.navItemIcon}>
            <Icon size={props.size}>{props.children}</Icon>
        </div>
    );
};

NavItemIcon.propTypes = {
    children: PropTypes.string,
    size: PropTypes.number,
};

export default NavItemIcon;
