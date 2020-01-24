import React from 'react';
import PropTypes from 'prop-types';

import "./Row.css";
const Row = (props) => {
    const style = {
        row: {}
    };
    Object.assign(style.row, props.style);
    return <div style={style.row} className="Row">{props.children}</div>;
}

Row.propTypes = {
    style: PropTypes.object
};

export default Row;
