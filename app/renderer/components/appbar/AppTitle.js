import React from "react";
import PropTypes from "prop-types";

const AppTitle = ({ children, fontSize }) => {
    const style = {
        title: {
            marginLeft: "1rem",
            paddingTop: 6
        },
        span: {
            fontSize: fontSize || "1.25rem"
        }
    };

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