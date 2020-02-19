import React from "react";
// import PropTypes from "prop-types";
import DeviceThumb from "./DeviceThumb";
import LightOff from "../drawable/internal/light-off.png";
import LightOn from "../drawable/internal/light-on.png";

const LightThumb = ({ device, status="unknown", style: compStyle }) => {
  const style = {
    LightThumb: {}
  };
  Object.assign(style.LightThumb, compStyle);
  return (
    <div className="LightThumb" style={style.LightThumb}>
      <DeviceThumb
        device={device}
        image={(status === "on") ? LightOn : LightOff}
        footerLink="/device/light/deviceUSNHere" // TODO: deviceUSN
      />
    </div>
  );
};

LightThumb.propTypes = {};

export default LightThumb;
