import React from "react";
import PropTypes from "prop-types";

import "./AppbarToggleButton.css";
import { updateNavDrawerOpen, updateNavDrawerClosingFromToggleButton } from "../../redux/actions/ui";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    navDrawerOpen: state.ui.navDrawerOpen
})

const mapDispatchToProps = (dispatch) => ({
    updateNavDrawerOpen: (open) => dispatch(updateNavDrawerOpen(open)),
    updateNavDrawerClosingFromToggleButton: (closingFromToggle) => dispatch(updateNavDrawerClosingFromToggleButton(closingFromToggle))
})

const AppbarToggleButton = ({ children, navDrawerOpen, updateNavDrawerClosingFromToggleButton, updateNavDrawerOpen, style: compStyle, visible = true }) => {
    const style = {
        button: {}
    };
    let className = "AppbarToggleButton";

    if (visible)
        className += " Visible";

    Object.assign(style.button, compStyle);
    return (
        <div className={className} style={style.button}
        onClick={() => {
            updateNavDrawerClosingFromToggleButton(true);
            updateNavDrawerOpen(!navDrawerOpen);
        }}>
            {children}
        </div>
    );
};

AppbarToggleButton.propTypes = {
    children: PropTypes.object,
    visible: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(AppbarToggleButton);
