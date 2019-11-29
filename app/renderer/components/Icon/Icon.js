import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ children: icon, style: compStyle }) => {
  const style = {
    icon: {

    }
  };
  Object.assign(style.icon, compStyle);
  return (
    <div style={style.icon}>
      <i className="material-icons">{icon}</i>
    </div>
  );
}

Icon.propTypes = {
  children: PropTypes.string
}
 
export default Icon;