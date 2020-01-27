import React from "react";
import PropTypes from "prop-types";

import Util from "../Util";
import { updateNavDrawerOpen } from "../../redux/actions/ui";

import "./NavItem.css";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    updateNavDrawerOpen: (open) => dispatch(updateNavDrawerOpen(open))
})

const NavItem = (props) => {
    let style = {
        navItem: {
            width: props.width || 240,
            backgroundColor: props.backgroundColor || "#ffffff",
            color: props.foregroundColor || "#000000",
        }
    };

    if (props.active) {
        style.navItem.backgroundColor = `#${Util.substractHexColor(style.navItem.backgroundColor.replace("#", ""), "222222")}`;
    }
    return (
        <div className="NavItem" style={style.navItem} onClick={(e) => { props.updateNavDrawerOpen(false)}}>
            {props.children}
        </div>
    );
};

NavItem.propTypes = {
    onClick: PropTypes.func,
    width: PropTypes.number,
    active: PropTypes.bool,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(NavItem);
