import React from 'react';
import PropTypes from 'prop-types';

const Row = (props) => {
    const style = {
        row: {
            display: "block",
            margin: "0 auto",
            maxWidth: 1280,
            minWidth: 960
        }
    };
    Object.assign(style.row, props.style);
    return (<div style={style.row}>{props.children}</div>);
}

Row.propTypes = {
    children: PropTypes.object,
    style: PropTypes.object
};

export default Row;
