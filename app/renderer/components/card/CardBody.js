import React from 'react';
import PropTypes from 'prop-types';

const CardBody = ({ children, style: compStyle }) => {
    const style = {
        body: {

        }
    };
    Object.assign(style.body, compStyle);
    return <div style={style.body}>{children}</div>;
}

CardBody.propTypes = {

};

export default CardBody;
