import React from "react";
import PropTypes from "prop-types";

import config from "./config";

const Icon = (props) => {
    const style = {
        icon: {

        },
        i: {
            color: props.color || "#000000",
            fontSize: props.size || 20
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
    size: PropTypes.number,
    children: PropTypes.string,
    style: PropTypes.object
};
 
export default Icon;
