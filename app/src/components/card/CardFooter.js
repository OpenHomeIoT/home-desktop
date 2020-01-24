import React from 'react';
// import PropTypes from 'prop-types';

const CardFooter = ({ children, style: compStyle }) => {
    const style = {
        cardFooter: {

        }
    };
    Object.assign(style.cardFooter, compStyle);
    // TODO: implement
    return <div style={style.cardFooter}>{children}</div>;
}

CardFooter.propTypes = {

};

export default CardFooter;
