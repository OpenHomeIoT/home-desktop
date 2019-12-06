import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addMessageBoxFooter, getMessageBox } from '../config';

class MessageBoxFooter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            messageBox: {
                width: 0,
                height: 0,
                footerHeight: 0,
                headerHeight: 0
            }
         };
        this.ref = React.createRef();
        this.updateMessageBox = this.updateMessageBox.bind(this);
    }

    componentDidMount() {
        addMessageBoxFooter(this.ref.current.getBoundingClientRect());
        getMessageBox(this.updateMessageBox);
    }

    updateMessageBox(value) { this.setState({messageBox: value }); }

    render() { 
        const { children, style: compStyle } = this.props;
        const style = {
            footer: {
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                zIndex: 2,
                padding: "1rem 0 0 0",
            }
        };
        Object.assign(style.footer, compStyle);
        return (
            <div style={style.footer} ref={this.ref}>{ children }</div>
        );
    }
}

MessageBoxFooter.propTypes = {

};

export default MessageBoxFooter;