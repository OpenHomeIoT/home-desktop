import React from 'react';
import PropTypes from 'prop-types';

import Icon from "../Icon/Icon";

const IconButton = ({ children: icon, onClick, size, style: compStyle }) => {
  const style = {
    iconButton: {
      cursor: "pointer",
    },
    icon: {
      userSelect: "none"
    }
  };
  Object.assign(style.iconButton, compStyle);
  return (
    <div style={style.iconButton} onClick={() => onClick && onClick()}>
      <Icon size={size}>{ icon }</Icon>
    </div>
  );
}

IconButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
};

export default IconButton;
