import React from "react";
import PropTypes from "prop-types";

const AppTitle = ({ children, fontSize, style: compStyle }) => {
    const style = {
        title: {},
        span: {
            fontSize: fontSize || "1.25em"
        }
    };
    Object.assign(style.title, compStyle);
    return (
        <div style={style.title}>
            <span style={style.span}>{children}</span>
        </div>
    );
};

AppTitle.propTypes = {
    children: PropTypes.string,
    fontSize: PropTypes.number,
};

export default AppTitle;
