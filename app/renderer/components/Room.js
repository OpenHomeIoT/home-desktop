import React from "react";
import PropTypes from "prop-types";

import Toolbar from "../components/toolbar/Toolbar";
import ToolbarTitle from "../components/toolbar/ToolbarTitle";

const Room = ({ children, devices, name, style: compStyle }) => {
  const style = {
    room: {
      width: "100%"
    },
    devices: {

    }
  };
  Object.assign(style.room, compStyle);
  return (
    <div style={style.room}>
      {/* The "none" room should not contain a toolbar */}
      { name !== "none" &&
        <Toolbar style={{ backgroundColor: "#fff" }}>
          <ToolbarTitle>{ name }</ToolbarTitle>
        </Toolbar>
      }
      <div style={style.devices}>{  }</div>
    </div>
  );
}

Room.propTypes = {
  devices: PropTypes.arrayOf()
};

export default Room;
