import React from "react";
import PropTypes from "prop-types";

const AppbarToggleButton = ({ children, style: compStyle, onClick, visible = true }) => {
    const style = {
        button: {
            visibility: "hidden",
            opacity: 0,
            cursor: "pointer",
            userSelect: "none",
            WebkitUserSelect: "none",
            transition: "opacity 0.4s",
            pointerEvents: "none"
        }
    };

    if (visible) {
        style.button.visibility = "visible";
        style.button.opacity = 1;
        style.button.pointerEvents = "all";
    }

    Object.assign(style.button, compStyle);
    return (
        <div style={style.button} onClick={() => { onClick && onClick() }}>
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