import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

// import IconButton from "../components/IconButton";
import DeviceThumb from "../components/DeviceThumb";

import {
  Row,
  Toolbar,
  ToolbarTitle,
  ToolbarOptionContainer,
  DropdownButtonText,
  DropdownButton,
  DropdownButtonItem
} from "react-uix";

const Wrapper = styled.div`
  display: block;
  padding: 0 0 2em 0;
  overflow: hidden;
  min-height: 200px;
`;

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
    rows.push(<Row key={`dr-${i}`}>{ devicesForRow }</Row>);
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
    <Wrapper style={style.room}>
      {/* The "none" room should not contain a toolbar */}
      { name !== "none" &&
        <Row>
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
    </Wrapper>
  );
}

Room.propTypes = {
};

export default Room;
