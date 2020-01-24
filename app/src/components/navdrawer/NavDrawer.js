import React, { Component } from 'react';
import PropTypes from "prop-types";

import {
    setNavDrawerWidth,
    setNavDrawerOpen,
    getAppbarDefined,
    getAppbarHeight,
    getBottomNavDefined,
    getBottomNavHeight,
    clearConfigListener,
} from "../config";

class NavDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowHeight: 0,
            windowWidth: 0,
            appbarDefined: false,
            appbarHeight: 62,
            bottomNavDefined: false,
            bottomNavHeight: 62,
        };
        this.updateAppbarDefined = this.updateAppbarDefined.bind(this);
        this.updateAppbarHeight = this.updateAppbarHeight.bind(this);
        this.updateBottomNavDefined = this.updateBottomNavDefined.bind(this);
        this.updateBottomNavHeight = this.updateBottomNavHeight.bind(this);
        this.ref = React.createRef();
    }
    componentDidMount() {
        window.addEventListener("mousedown", (event) => this.handleClickOutside(event));
        window.addEventListener("touchstart", (event) => this.handleClickOutside(event));

        getAppbarDefined(this.updateAppbarDefined);
        getAppbarHeight(this.updateAppbarHeight);
        getBottomNavDefined(this.updateBottomNavDefined);
        getBottomNavHeight(this.updateBottomNavHeight);
    }
    componentWillUnmount() {
        window.removeEventListener("mousedown", (event) => this.handleClickOutside(event));
        window.removeEventListener("touchstart", (event) => this.handleClickOutside(event));

        clearConfigListener(this.updateAppbarDefined);
        clearConfigListener(this.updateAppbarHeight);
        clearConfigListener(this.updateBottomNavDefined);
        clearConfigListener(this.updateBottomNavHeight);
    }

    updateAppbarDefined(value) { this.setState({ appbarDefined: value }); }
    updateAppbarHeight(value) { this.setState({ appbarHeight: value }); }
    updateBottomNavDefined(value) { this.setState({ bottomNavDefined: value }); }
    updateBottomNavHeight(value) { this.setState({ bottomNavHeight: value }); }

    handleClickOutside(event) {
        const { open, onClose } = this.props;
        if (event && this.ref && open && !this.ref.contains(event.target)) {
            // clicked outside. Close the nav drawer.
            if (onClose) onClose();
        }
    }

    setRef(ref) {
        this.ref = ref;
    }

    render() {
        let style = {
            navDrawer: {
                position: "fixed",
                overflowY: "scroll",
                width: this.props.width || 240,
                top: 0,
                height: `calc(100vh - ${((this.state.appbarDefined) ? this.state.appbarHeight : 0) + ((this.state.bottomNavDefined) ? this.state.bottomNavHeight : 0)}px)`,
                WebkitOverflowScrolling: "touch",
                WebkitTransform: `translate(-107%, 0)`,
                transform: `translate(-107%, 0)`,
                transition: "transform 300ms ease-in-out",
                zIndex: 2,
                backgroundColor: "#ffffff",
                boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",

            }
        };
        setNavDrawerWidth(style.navDrawer.width);
        if (this.state.appbarDefined) {
            style.navDrawer.top = this.state.appbarHeight;
        }


        if (this.props.open) {
            style.navDrawer.WebkitTransform = `translate(0, 0)`;
            style.navDrawer.transform = `translate(0, 0)`;
        }
        setNavDrawerOpen(this.props.open);


        return (
            <div style={style.navDrawer} ref={this.ref}>
                {this.props.children}
            </div>
        );
    }
}

NavDrawer.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    open: PropTypes.bool.isRequired,
    width: PropTypes.number
};

export default NavDrawer;
