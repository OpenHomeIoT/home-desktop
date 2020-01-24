import React from "react";
import PropTypes from "prop-types";

import "./Icon.css";
const Icon = (props) => {
    const style = {
        icon: {
            width: props.size,
            height: props.size
        },
        i: {
            fontSize: props.size,
            color: props.color
        }
    };

    Object.assign(style.icon, props.style);

    return (
        <div style={style.icon} className="IconContainer">
            <i style={style.i} className="material-icons Icon">{props.children}</i>
        </div>
    );
};

Icon.propTypes = {
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.string,
    style: PropTypes.object
};

export default Icon;
