import React from 'react';
import PropTypes from 'prop-types';



const Toast = ({ children, visible }) => {
    const style = {
        toast: {
            display: "none",
            opacity: 0,
            position: "absolute",
            bottom: "7%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            transition: "opacity 0.2s",
            padding: ".5em .75em",
            borderRadius: 3,
            boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
        },
        span: {
            color: "#ffffff"
        }
    };

    if (visible) {
        style.toast.display = "block";
        style.toast.opacity = 1;
    }

    return (
        <div style={style.toast}>
            <span style={style.span}>{children}</span>
        </div>
    );
}

Toast.propTypes = {
    visible: PropTypes.bool
};

export default Toast;
