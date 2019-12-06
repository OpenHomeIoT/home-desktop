import React from "react";
import PropTypes from "prop-types";

const AppbarToolbar = (props) => {
    const style = {
        toolbar: {
            marginRight: "1rem",
            display: "flex",
            userSelect: "none",
            WebkitUserSelect: "none",
        }
    };

    return ( 
        <div style={style.toolbar}>
            {props.children}
        </div>
    );
};

AppbarToolbar.propTypes = {
    children: PropTypes.object
};
 
export default AppbarToolbar;