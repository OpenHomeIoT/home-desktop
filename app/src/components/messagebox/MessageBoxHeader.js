import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Heading from '../Heading';

class MessageBoxHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foregroundColor: "",
        };
        this.updateForegroundColor = this.updateForegroundColor.bind(this);

        this.ref = React.createRef();
    }

    componentDidMount() {
        getForegroundColor(this.updateForegroundColor);
    }

    componentDidUpdate() {
        addMessageBoxHeader(this.ref.current.getBoundingClientRect());
    }

    componentWillUnmount() {
        clearConfigListener(this.updateForegroundColor);
    }

    updateForegroundColor(value) { this.setState({ foregroundColor: value }); }

    render() {
        const { children, style: compStyle } = this.props;

        const style = {
            header: {
                width: "100%",
                zIndex: 1,
            },
            border: {
                width: "70%",
                height: 2,
                backgroundColor: this.state.foregroundColor
            }
        };
        Object.assign(style.header, compStyle);
        return (
            <div style={style.header} ref={this.ref}>
                <Heading h={5}>{children}</Heading>
                <div style={style.border} />
            </div>
        );
    }
}

MessageBoxHeader.propTypes = {

};

export default MessageBoxHeader;
