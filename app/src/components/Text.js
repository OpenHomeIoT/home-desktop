import React from 'react';
import PropTypes from 'prop-types';

import "./Text.css";
const Text = ({ children, style: compStyle, type = 1 }) => {
    const style = {
        text: {}
    };

    if (type === 2) {
        style.text["fontSize"] = 14;
        style.text["letterSpacing"] = 0.25;
    }

    Object.assign(style.text, compStyle);
    return (
        <span className="Text" style={style.text}>{children}</span>
    );
}

Text.propTypes = {
    children: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.number,
};

export default Text;
