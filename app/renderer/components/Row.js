import React from 'react';
import PropTypes from 'prop-types';

const Row = (props) => {
    const style = {
        row: {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: 1080,
            minWidth: 770,
            overflow: "hidden",
            clear: "both"
        }
    };
    Object.assign(style.row, props.style);
    return (<div style={style.row}>{props.children}</div>);
}

Row.propTypes = {
    style: PropTypes.object
};

export default Row;
