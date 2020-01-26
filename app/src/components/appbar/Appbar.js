import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Appbar.css";
import { updateAppbarDefined, updateAppbarHeight } from '../../redux/actions/ui';

const mapStateToProps = (state) => {
    return {
        primaryColor: state.ui.primaryColor,
        foregroundColor: state.ui.foregroundColor
    };
}

const mapDispatchToProps = (dispatch) => ({
    updateAppbarDefined: (appbarDefined) => dispatch(updateAppbarDefined(appbarDefined)),
    updateAppbarHeight: (height) => dispatch(updateAppbarHeight(height))
});

class Appbar extends Component {

    componentDidMount() {
        if (!this.props.demo) {
            this.props.updateAppbarDefined(true);
            this.props.updateAppbarHeight(this.props.height || 62);
        }
    }

    render() {
        const { demo, children, height, style: compStyle } = this.props;

        const style = {
            appbar: {
                height: height || 62,
                backgroundColor: this.props.primaryColor,
                color: this.props.foregroundColor
            },
        };

        if (!demo) {
            style.appbar["position"] = "fixed";
        }
        Object.apply(style.appbar, compStyle);
        return (
            <div className="Appbar" style={style.appbar}>
                {children}
            </div>
        );
    }
}

Appbar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    height: PropTypes.number,
    demo: PropTypes.bool,
    backgroundColor: PropTypes.string,
    foregroundColor: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Appbar);
