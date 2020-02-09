import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import "./Text.css";

const mapStateToProps = (state) => ({
    foregroundColor: state.ui.foregroundColor
});

const Text = ({ children, color, fontSize="1rem", foregroundColor, style: compStyle }) => {
    const style = {
        text: {
            fontSize,
            color: color || foregroundColor,
        }
    };

    Object.assign(style.text, compStyle);
    return (
        <span className="Text" style={style.text}>{children}</span>
    );
}

Text.propTypes = {
    color: PropTypes.string
};

export default connect(mapStateToProps)(Text);
