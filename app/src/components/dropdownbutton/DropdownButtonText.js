import React from "react";
import PropTypes from "prop-types";

const DropdownButtonText = (props) => {
    const style = {
        dropdownText: {
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
