import React from 'react';
import PropTypes from 'prop-types';

import { setPrimaryColor, setSecondaryColor, setForegroundColor } from "./config";

const App = ({ children, primaryColor, secondaryColor, foregroundColor }) => {
    const style = {
        app: {
            height: "100vh",
            width: "100vw",
            position: "relative",
            fontSize: 16
        }
    };

    setPrimaryColor(primaryColor);
    setSecondaryColor(secondaryColor);
    setForegroundColor(foregroundColor);

    return (
        <div style={style.app}>{children}</div>
    );
}

export default App;
