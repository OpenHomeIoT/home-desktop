import React from "react";
import PropTypes from "prop-types";

const NavItemText = (props) => {
    const style = {
        navItemText: {
            margin: "0 1em 0 1em",
            fontSize: "1.2rem",
            fontWeight: 500
        }
    };
    return (
        <div style={style.navItemText}>
            <span>{props.children}</span>
        </div>
    );
};

NavItemText.propTypes = {
    children: PropTypes.string,
};

export default NavItemText;
