import React from 'react';
import PropTypes from 'prop-types';

const Paper = (props) => {
    const style = {
        paper: {
            backgroundColor: "#fff",
            borderRadius: 3
        }
    };
    Object.assign(style.paper, props.style);
    return (
        <div style={style.paper}>{props.children}</div>
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
