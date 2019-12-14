import React, { Component } from 'react';
import PropTypes from "prop-types";

import {
    getAppbarDefined,
    getBottomNavDefined,
    getAppbarHeight,
    getBottomNavHeight,
    clearConfigListener,
} from "./config";

class AppContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appbarDefined: false,
            appbarHeight: 62,
            bottomNavDefined: false,
            bottomNavHeight: 62
        };
        this.updateAppbarDefined = this.updateAppbarDefined.bind(this);
        this.updateAppbarHeight = this.updateAppbarHeight.bind(this);
        this.updateBottomNavDefined = this.updateBottomNavDefined.bind(this);
        this.updateBottomNavHeight = this.updateBottomNavHeight.bind(this);
        this.calcHeight = this.calcHeight.bind(this);
    }

    componentDidMount() {
        getAppbarDefined(this.updateAppbarDefined);
        getAppbarHeight(this.updateAppbarHeight);
        getBottomNavDefined(this.updateBottomNavDefined);
        getBottomNavHeight(this.updateBottomNavHeight);
    }

    componentWillUnmount() {
        clearConfigListener(this.updateAppbarDefined);
        clearConfigListener(this.updateAppbarHeight);
        clearConfigListener(this.updateBottomNavDefined);
        clearConfigListener(this.updateBottomNavHeight);
    }

    updateAppbarDefined(value) { this.setState({ appbarDefined: value }); }
    updateAppbarHeight(value) { this.setState({ appbarHeight: value }); }
    updateBottomNavDefined(value) { this.setState({ bottomNavDefined: value }); }
    updateBottomNavHeight(value) { this.setState({ bottomNavHeight: value }); }

    calcHeight() {
        let height = "100vh";
        let margins = 0;
        if (this.state.appbarDefined && this.state.bottomNavDefined) {
            margins = this.state.appbarHeight + this.state.bottomNavHeight;
        } else if (this.state.appbarDefined) {
            margins = this.state.appbarHeight;
        } else if (this.state.bottomNavDefined) {
            margins = this.state.bottomNavHeight;
        }

        height = `calc(100vh - ${margins}px)`;

        return height;
    }

    render() {
        const height = this.calcHeight();

        let style = {
            appContent: {
                width: "100vw",
                position: "fixed",
                top: (this.state.appbarDefined) ? this.state.appbarHeight : 0,
                zIndex: 0,
                backgroundColor: "#ecf0f1",
                height,
                minWidth: 320,
                top: 62,
                left: 0
            },
            relative: {
                position: "relative",
                height,
                zIndex: 0,
                width: "100vw",
            },
            content: {
                padding: "1em",
                height,
                zIndex: 0,
                overflowY: "scroll",
                WebkitOverflowScrolling: "touch",
            }
        };
        Object.apply(style.appContent, this.props.style);
        return (
            <div style={style.appContent}>
                <div style={style.relative}>
                    <div style={style.content}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

AppContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
};

export default AppContent;
