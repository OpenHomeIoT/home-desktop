import React from "react";
import PropTypes from "prop-types";

import Paper from "../Paper";
import Row from "../Row";

const Card = (props) => {
    let style = {
        card: {
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        }
    };

    if (props.z === 2) {
        style.card.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
    } else if (props.z === 3) {
        style.card.boxShadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)";
    } else if (props.z === 4) {
        style.card.boxShadow = "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)";
    } else if (props.z === 5) {
        style.card.boxShadow = "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)";
    }

    Object.assign(style.card, props.style);
    return (
        <Row>
            <Paper style={style.card}>
                {props.children}
            </Paper>  
        </Row> 
           
    );
};

Card.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    style: PropTypes.object,
    z: PropTypes.number
};
 
export default Card;