import React from "react";
import PropTypes from "prop-types";

const NavContent = (props) => {
    const style = {
        navContent: {

        }
    };
    return (
        <div style={style.navContent}>
            {props.children}
        </div>
    );
};

NavContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    width: PropTypes.number
};
 
export default NavContent;