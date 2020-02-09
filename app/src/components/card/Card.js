import React from "react";
import PropTypes from "prop-types";
import Paper from "../Paper";
import "./Card.css";

const Card = ({ children, style: compStyle, z=1 }) => {
    const style = {
        card: {},
        paper: {
            backgroundColor: (compStyle) ? compStyle.backgroundColor : "auto",
            borderRadius: 4
        }
    };

    if (z < 1) z = 1;
    if (z > 5) z = 5;
    const className = `Card Card-${z}`;
    Object.assign(style.card, compStyle);
    return (
        <div className={className} style={style.card}>
            <Paper style={style.paper}>
                {children}
            </Paper>
        </div>
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
