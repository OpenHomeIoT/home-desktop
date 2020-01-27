import React from 'react';
// import PropTypes from 'prop-types';

import "./CardFooter.css";
const CardFooter = ({ children, style: compStyle }) => {
    const style = {
        cardFooter: {}
    };
    Object.assign(style.cardFooter, compStyle);
    return <div style={style.cardFooter} className="Footer">{children}</div>;
}

CardFooter.propTypes = {

};

export default CardFooter;
