import React from "react";
import PropTypes from "prop-types";

import Util from "../Util";
import { setNavDrawerOpen } from "../config";

const NavItem = (props) => {
    let style = {
        navItem: {
            width: props.width || 240,
            display: "flex",
            alignContent: "center",
            padding: ".5rem .75rem",
            userSelect: "none",
            WebkitUserSelect: "none",
            pointerEvents: "all",
            cursor: "pointer",
            backgroundColor: props.backgroundColor || "#ffffff",
            color: props.foregroundColor || "#000000",
        }
    };

    if (props.active) {
        style.navItem.backgroundColor = `#${Util.substractHexColor(style.navItem.backgroundColor.replace("#", ""), "222222")}`;
    }
    return (
        <div style={style.navItem} onClick={(e) => { setNavDrawerOpen(false)}}>
            {props.children}
        </div>
    );
};

NavItem.propTypes = {
    onClick: PropTypes.func,
    width: PropTypes.number,
    active: PropTypes.bool,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string
};

export default NavItem;
