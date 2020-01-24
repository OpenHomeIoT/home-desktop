import React from "react";
import PropTypes from "prop-types";

const DropdownButtonText = (props) => {
    const style = {
        dropdownText: {
            margin: "3px 0 0 0",
            fontSize: ".8rem"
        }
    };

    return (
        <div style={style.dropdownText}>
            {props.children}
        </div>
    );
};

DropdownButtonText.propTypes = {
    children: PropTypes.string
};
 
export default DropdownButtonText;