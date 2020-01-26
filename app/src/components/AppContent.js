import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./AppContent.css";

const mapStateToProps = (state, ownProps) => {
    return {
        appbarDefined: state.ui.appbarDefined,
        appbarHeight: state.ui.appbarHeight,
        bottomNavDefined: state.ui.bottomNavDefined,
        bottomNavHeight: state.ui.bottomNavHeight
    };
}

class AppContent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.calcHeight = this.calcHeight.bind(this);
    }

    calcHeight() {
        const { appbarDefined, appbarHeight, bottomNavDefined, bottomNavHeight } = this.props;
        let height = "100vh";
        let margins = 0;
        if (appbarDefined && bottomNavDefined) {
            margins = appbarHeight + bottomNavHeight;
        } else if (appbarDefined) {
            margins = appbarHeight;
        } else if (bottomNavDefined) {
            margins = bottomNavHeight;
        }

        height = `calc(100vh - ${margins}px)`;

        return height;
    }

    render() {
        const { appbarDefined, appbarHeight } = this.props;
        const height = this.calcHeight();
        let style = {
            appContent: {
                top: (appbarDefined) ? appbarHeight : 0,
                height,
            },
            relative: {
                height
            },
            content: {
                height
            }
        };
        Object.apply(style.appContent, this.props.style);
        return (
            <div className="AppContent" style={style.appContent}>
                <div className="Relative" style={style.relative}>
                    <div className="Content" style={style.content}>
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

export default connect(mapStateToProps)(AppContent);
