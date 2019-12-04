import React from 'react';
import PropTypes from 'prop-types';

import Icon from "../Icon/Icon";

const IconButton = ({ children: icon, onClick, style: compStyle }) => {
  const style = {
    iconButton: {
      userSelect: "none",
      cursor: "pointer"
    }
  };
  Object.assign(style.iconButton, compStyle);
  return (
    <div style={style.iconButton} onClick={() => onClick && onClick()}>
      <Icon>{ icon }</Icon>
    </div>
  );
}

IconButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func
};

export default IconButton;
