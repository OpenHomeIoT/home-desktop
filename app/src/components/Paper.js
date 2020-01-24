import React from 'react';
import PropTypes from 'prop-types';

import "./Paper.css";
const Paper = (props) => {
    const style = {
        paper: {}
    };
    Object.assign(style.paper, props.style);
    return (
        <div className="Paper" style={style.paper}>{props.children}</div>
    );
}

Paper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    style: PropTypes.object
};

export default Paper;
