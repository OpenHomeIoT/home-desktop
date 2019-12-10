import React from "react";
import PropTypes from "prop-types";

const AppTitleContainer = (props) => {
    const style = {
        container: {
            marginRight: "auto",
            display: "flex",
            userSelect: "none",
            WebkitUserSelect: "none",
            paddingLeft: "1em"
        }
    };
    return (
        <div style={style.container}>
            {props.children}
        </div>
    );
};

AppTitleContainer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default AppTitleContainer;
