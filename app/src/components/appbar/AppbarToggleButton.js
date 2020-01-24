import React from "react";
import PropTypes from "prop-types";

import "./AppbarToggleButton.css";
const AppbarToggleButton = ({ children, style: compStyle, onClick, visible = true }) => {
    const style = {
        button: {}
    };
    let className = "AppbarToggleButton";

    if (visible)
        className += " Visible";

    Object.assign(style.button, compStyle);
    return (
        <div className={className} style={style.button} onClick={() => { onClick && onClick() }}>
            {children}
        </div>
    );
};

AppbarToggleButton.propTypes = {
    children: PropTypes.object,
    onClick: PropTypes.func,
    visible: PropTypes.bool
};


export default AppbarToggleButton;
