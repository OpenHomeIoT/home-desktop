import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Row from "../Row";

import {
    getAppbarDefined,
    getPrimaryColor,
    getForegroundColor,
    getAppbarHeight,
    clearConfigListener,
    openMessageBox,
} from "../config";

class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appbarDefined: false,
            appbarHeight: 0,
            foregroundColor: "",
            primaryColor: "",
        }
        this.updateAppbarDefined = this.updateAppbarDefined.bind(this);
        this.updateAppbarHeight = this.updateAppbarHeight.bind(this);
        this.updateForegroundColor = this.updateForegroundColor.bind(this);
        this.updatePrimaryColor = this.updatePrimaryColor.bind(this);

        this.ref = React.createRef();
    }

    componentDidUpdate() {
        openMessageBox(this.ref.current.getBoundingClientRect());
    }

    componentDidMount() {
        getAppbarDefined(this.updateAppbarDefined);
        getAppbarHeight(this.updateAppbarHeight);
        getForegroundColor(this.updateForegroundColor);
        getPrimaryColor(this.updatePrimaryColor);
    }

    componentWillUnmount() {
        clearConfigListener(this.updateAppbarDefined);
        clearConfigListener(this.updateAppbarHeight);
        clearConfigListener(this.updateForegroundColor);
        clearConfigListener(this.updatePrimaryColor);
    }

    updateAppbarDefined(value) { this.setState({ appbarDefined: value }); }
    updateAppbarHeight(value) { this.setState({ appbarHeight: value }); }
    updateForegroundColor(value) { this.setState({ foregroundColor: value }); }
    updatePrimaryColor(value) { this.setState({ primaryColor: value }); }

    render() { 
        const { children, style: compStyle, visible } = this.props;
        const style = {
            blackout: {
                display: "none",
                opacity: 0,
                position: "absolute",
                left: 0,
                top: 0,
                height: (this.state.appbarDefined) ? `calc(100vh - ${this.state.appbarHeight}px)` : "100vh",
                width: "100vw",
                backgroundColor: "rgba(0,0,0,0.6)",
                zIndex: 2,
                transition: "opacity 0.6s",
                pointerEvents: "fill"
            },
            messageBox: {
                display: "none",
                opacity: 0,
                flexDirection: "column",
                position: "absolute",
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: 3,
                backgroundColor: this.state.primaryColor,
                color: this.state.foregroundColor,
                minHeight: 200,
                minWidth: 240,
                boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
                transition: "opacity 0.6s",
                maxHeight: "70vh",
            },
            content: {
                position: "relative",
                padding: "1rem",
            }
        };
        if (visible) {
            style.messageBox.display = "flex";
            style.messageBox.opacity = 1;
            style.blackout.display = "block";
            style.blackout.opacity = 1;
        }
        
        Object.assign(style.messageBox, compStyle);
        return (
            <div style={style.blackout}>
                <div style={style.messageBox} ref={this.ref}>
                    <Row style={style.content}>
                        {children}
                    </Row>
                </div>
            </div>
        );
    }
}

MessageBox.propTypes = {

};
 
export default MessageBox;
