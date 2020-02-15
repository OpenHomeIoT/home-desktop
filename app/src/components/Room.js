import React from "react";
// import PropTypes from "prop-types";

// import IconButton from "../components/IconButton";
import DeviceThumb from "../components/DeviceThumb";
import Row from "./Row";
import Toolbar from "../components/toolbar/Toolbar";
import ToolbarTitle from "../components/toolbar/ToolbarTitle";
import ToolbarOptionContainer from "./toolbar/ToolbarOptionContainer";
import DropdownButtonText from "./dropdownbutton/DropdownButtonText";
import DropdownButton from "./dropdownbutton/DropdownButton";
import DropdownButtonItem from "./dropdownbutton/DropdownButtonItem";

import "./Room.css";

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

  const deviceThumbs = devices.map((device, index, devices) => <DeviceThumb device={device} key={`${device.name}-device-${index}`} displayIndex={index} />);

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
    rows.push(<Row key={`dr-${i}`} style={{ padding: "0 .2em 1em .2em"}} >{ devicesForRow }</Row>);
  }
  return rows;
}

const Room = ({ devices, name, style: compStyle }) => {
  const style = {
    room: {},
    devices: {}
  };
  Object.assign(style.room, compStyle);
  return (
    <div style={style.room} className="Room">
      {/* The "none" room should not contain a toolbar */}
      { name !== "none" &&
        <Row style={{ padding: "0 .2em" }}>
          <Toolbar backgroundColor="#ffffff" foregroundColor="#000000">
            <ToolbarTitle>{ name }</ToolbarTitle>
            <ToolbarOptionContainer>
              <DropdownButton icon="more_vert" color="#000">
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
