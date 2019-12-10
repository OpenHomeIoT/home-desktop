import React from "react";
import PropTypes from "prop-types";

const Heading = ({ children, h = 1, style: compStyle, }) => {
    let style = {
        h: {
            display: "block",
            margin: "0 0 1em 0",
            fontFamily: "'Roboto', sans-serif",
            wordWrap: "break-word"
        }
    };
    Object.assign(style.h, compStyle);
    switch (h) {
        case 1:
            return <h1 style={Object.assign(style.h, { fontSize: 96, fontWeight: 300, letterSpacing: -1.5 })}>{children}</h1>
        case 2:
            return <h2 style={Object.assign(style.h, { fontSize: 60, fontWeight: 300, letterSpacing: -0.5 })}>{children}</h2>
        case 3:
            return <h3 style={Object.assign(style.h, { fontSize: 48, fontWeight: 400, letterSpacing: 0})}>{children}</h3>
        case 4:
            return <h4 style={Object.assign(style.h, { fontSize: 34, fontWeight: 400, letterSpacing: 0.25 })}>{children}</h4>
        case 5:
            return <h5 style={Object.assign(style.h, { fontSize: 24, fontWeight: 400, letterSpacing: 0 })}>{children}</h5>
        case 6:
            return <h6 style={Object.assign(style.h, { fontSize: 20, fontWeight: 500 })}>{children}</h6>
    }
};

Heading.propTypes = {
    children: PropTypes.string,
    h: PropTypes.number.isRequired
};

export default Heading;
