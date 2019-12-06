import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ children, style: compStyle, type = 1 }) => {
    const style = {
        text: {
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: 0.5
        }
    };

    if (type === 2) {
        style.text.fontSize = 14;
        style.text.letterSpacing = 0.25;
    }

    Object.assign(style.text, compStyle);
    return (
        <span style={style.text}>{children}</span>
    );
}

Text.propTypes = {
    children: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.number,
};
 
export default Text;