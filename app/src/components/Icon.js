import React from "react";
import PropTypes from "prop-types";

import "./Icon.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    primaryColor: state.ui.primaryColor,
    foregroundColor: state.ui.foregroundColor
});

const Icon = ({ children, color, foregroundColor, primaryColor, size, style: compStyle }) => {
    const style = {
        icon: {
            width: size,
            height: size
        },
        i: {
            fontSize: size,
            color: color || foregroundColor
        }
    };

    Object.assign(style.icon, compStyle);
    return (
        <div style={style.icon} className="IconContainer">
            <i style={style.i} className="material-icons Icon">{children}</i>
        </div>
    );
};

Icon.propTypes = {
    accent: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.string,
    style: PropTypes.object
};

export default connect(mapStateToProps)(Icon);
