import React from "react";
import PropTypes from "prop-types";

const Icon = (props) => {
    const style = {
        icon: {
            fontSize: props.size || "1rem",
            width: props.size || "1em",
            height: props.size || "1em"
        },
        i: {
            color: props.color || "#000000",
            width: props.size || "1em",
            height: props.size || "1em"
        }
    };

    Object.assign(style.icon, props.style);

    return (
        <div style={style.icon}>
            <i style={style.i} className="material-icons">{props.children}</i>
        </div>
    );
};

Icon.propTypes = {
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.string,
    style: PropTypes.object
};

export default Icon;
