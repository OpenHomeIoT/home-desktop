import React from "react";
import PropTypes from "prop-types";

const NavHeader = (props) => {
    const style = {
        navHeader: {
            width: props.width || 240,
            backgroundColor: props.backgroundColor || "#ffffff",
            color: props.foregroundColor || "#000000",
        }
    };
    return (
        <div style={style.navHeader}>
            {props.children}
        </div>
    );
};

NavHeader.propTypes = {
    children: PropTypes.object,
    width: PropTypes.number,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string,
};
 
export default NavHeader;