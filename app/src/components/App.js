import React, { Component } from 'react';
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureUIStore, { history } from "../redux/configureUIStore";
import "./App.css";
import { updatePrimaryColor, updateSecondaryColor, updateForegroundColor } from '../redux/actions/ui';

const uiStore = configureUIStore();
// import PropTypes from 'prop-types';


class App extends Component {

    componentDidMount() {
        if (this.props.primaryColor) uiStore.dispatch(updatePrimaryColor(this.props.primaryColor));
        if (this.props.secondaryColor) uiStore.dispatch(updateSecondaryColor(this.props.secondaryColor));
        if (this.props.foregroundColor) uiStore.dispatch(updateForegroundColor(this.props.foregroundColor));
    }

    render() {
        const { children } = this.props;
        return <Provider store={uiStore}><div className="App"><ConnectedRouter history={history}>{ children }</ConnectedRouter></div></Provider>;
    }
}

export default App;
