import React from "react";
import PropTypes from "prop-types";

const NavItemText = (props) => {
    const style = {
        navItemText: {
            margin: "4px 1rem 0 1rem"
        },
        span: {
            fontSize: ".8rem"
        }
    };
    return (
        <div style={style.navItemText}>
            <span style={style.span}>{props.children}</span>
        </div>
    );
};

NavItemText.propTypes = {
    children: PropTypes.string,
};
 
export default NavItemText;