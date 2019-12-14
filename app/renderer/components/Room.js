import React from "react";
import PropTypes from "prop-types";

import IconButton from "../components/IconButton";
import DeviceThumb from "../components/DeviceThumb";
import Row from "./Row";
import Toolbar from "../components/toolbar/Toolbar";
import ToolbarTitle from "../components/toolbar/ToolbarTitle";
import ToolbarOptionContainer from "./toolbar/ToolbarOptionContainer";
import DropdownButtonText from "./dropdownbutton/DropdownButtonText";
import DropdownButton from "./dropdownbutton/DropdownButton";
import DropdownButtonItem from "./dropdownbutton/DropdownButtonItem";

/**
 * Get the style for a device based on its index
 * @param {number} index the index of the device.
 */
const getDeviceStyle = (index) => {
  if (index % 4 === 0) {
    return { padding: ".7em .7em .7em 0" };
  }
  if ((index + 1) % 4 === 0) {
    return { padding: ".7em 0 .7em .7em" };
  }
  return { padding: ".7em" };
};

/**
 * Render the devices.
 * @param {{ }[]} devices
 */
const renderDevices = devices => {
  const numDevices = devices.length;
  if (numDevices === 0) {
    return <div style={{display: "none"}} />;
  }
  let numRows = parseInt(`${numDevices / 4}`, 10);
  numRows += 1;

  const deviceThumbs = devices.map((device, index, devices) => <DeviceThumb device={device} key={`${device.name}-device-${index}`} style={getDeviceStyle(index)} />);

  const rows = [];
  for (let i = 0; i < numRows; i++) {
    const startIdx = i * 4;
    let endIdx = ((i + 1) * 4) - 1;
    if (endIdx > numDevices - 1) {
      endIdx = numDevices - 1;
    }
    let devicesForRow = deviceThumbs.slice(startIdx, endIdx + 1);
    if (startIdx === endIdx && startIdx === 0) {
      // there is only one device in the row
      devicesForRow = [deviceThumbs[0]];
    }
    rows.push(<Row style={{ padding: "0 .2em" }} key={`dr-${i}`}>{ devicesForRow }</Row>);
  }
  return rows;
}

const Room = ({ devices, name, style: compStyle }) => {
  const style = {
    room: {
      display: "block",
      width: "100%",
      height: "100%",
      marginBottom: "2em"
    },
    devices: {

    }
  };
  Object.assign(style.room, compStyle);
  return (
    <div style={style.room}>
      {/* The "none" room should not contain a toolbar */}
      { name !== "none" &&
        <Row style={{ padding: "0 .2em" }}>
          <Toolbar style={{ backgroundColor: "#fff" }}>
            <ToolbarTitle>{ name }</ToolbarTitle>
            <ToolbarOptionContainer>
              <DropdownButton icon="more_vert" iconSize="1.5rem">
                <DropdownButtonItem>
                  <DropdownButtonText>Settings</DropdownButtonText>
                </DropdownButtonItem>
                <DropdownButtonItem>
                  <DropdownButtonText>Help</DropdownButtonText>
                </DropdownButtonItem>
              </DropdownButton>
            </ToolbarOptionContainer>
          </Toolbar>
        </Row>
      }
      {
        renderDevices(devices)
      }
    </div>
  );
}

Room.propTypes = {
};

export default Room;
