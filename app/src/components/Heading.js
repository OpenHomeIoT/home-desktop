import React from "react";
import PropTypes from "prop-types";

import "./Heading.css";
const Heading = ({ children, h = 1, style: compStyle, }) => {
    let style = {
        h: {}
    };
    Object.assign(style.h, compStyle);
    switch (h) {
        default:
        case 1:
            return <h1 className="Heading" style={style.h}>{children}</h1>
        case 2:
            return <h2 className="Heading" style={style.h}>{children}</h2>
        case 3:
            return <h3 className="Heading" style={style.h}>{children}</h3>
        case 4:
            return <h4 className="Heading" style={style.h}>{children}</h4>
        case 5:
            return <h5 className="Heading" style={style.h}>{children}</h5>
        case 6:
            return <h6 className="Heading" style={style.h}>{children}</h6>
    }
};

Heading.propTypes = {
    children: PropTypes.string,
    h: PropTypes.number.isRequired
};

export default Heading;
