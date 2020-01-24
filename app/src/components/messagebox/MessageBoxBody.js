import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getMessageBox, clearMessageBoxListener } from '../config';

class MessageBoxBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageBox: {
                height: 0,
                headerHeight: 0,
                footerHeight: 0,
            },
        };

        this.updateMessageBox = this.updateMessageBox.bind(this);
    }

    componentDidMount() {
        getMessageBox(this.updateMessageBox);
    }

    componentWillUnmount() {
        clearMessageBoxListener(this.updateMessageBox);
    }

    updateMessageBox(messageBox) { this.setState({ messageBox }); }

    render() {
        const { children, style: compStyle } = this.props;

        const style = {
            body: {
                overflow: "hidden",
                overflowY: "scroll",
                WebkitOverflow: "hidden",
                WebkitOverflowY: "scroll",
                WebkitOverflowScrolling: "touch",
                zIndex: -2,
                userSelect: "text",
                padding: "1em 0",
                maxHeight: "45vh",
                boxShadow: "inset 4px 2px -2px #000000"
            }
        };
        Object.assign(style.body, compStyle);
        return (
            <div style={style.body}>{children}</div>
        );
    }
}

export default MessageBoxBody;
