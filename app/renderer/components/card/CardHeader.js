import React from 'react';
import PropTypes from 'prop-types';

const CardHeader = ({ children, style: compStyle }) => {
    const style = {
        cardHeader: {},
    };
    Object.assign(style.cardHeader, compStyle);
    return <div style={style.cardHeader}>{ children }</div>;
}

CardHeader.propTypes = {

};

export default CardHeader;
