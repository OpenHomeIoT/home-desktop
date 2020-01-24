import React, { Component } from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import uiReducer from "../redux/reducers/ui";
import "./App.css";
import { updatePrimaryColor, updateSecondaryColor, updateForegroundColor } from '../redux/actions/ui';

const uiStore = createStore(uiReducer);
// import PropTypes from 'prop-types';


class App extends Component {

    componentDidMount() {
        if (this.props.primaryColor) uiStore.dispatch(updatePrimaryColor(this.props.primaryColor));
        if (this.props.secondaryColor) uiStore.dispatch(updateSecondaryColor(this.props.secondaryColor));
        if (this.props.foregroundColor) uiStore.dispatch(updateForegroundColor(this.props.foregroundColor));
    }

    render() {
        const { children } = this.props;
        return <Provider store={uiStore}><div className="App">{ children }</div></Provider>;
    }
}

export default App;
