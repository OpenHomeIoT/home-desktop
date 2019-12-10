import React from "react";
import PropTypes from "prop-types";

import Toolbar from "../components/toolbar/Toolbar";

const Room = ({ children, devices, name, style: compStyle }) => {
  const style = {
    room: {
      width: "100%"
    }
  };
  Object.assign(style.room, compStyle);
  return (
    <div style={style.room}>
      <Toolbar></Toolbar>
    </div>
  );
}

export default Room;
