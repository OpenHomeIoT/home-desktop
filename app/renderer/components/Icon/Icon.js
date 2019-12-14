import React from 'react';
import PropTypes from 'prop-types';
import Themeable from '../Themeable';

class Icon extends Themeable {

  constructor(props) {
    super(props);
    this.state = {
      foregroundColor: ""
    };
  }

  render() {
    const { children: icon, color, style: compStyle } = this.props;
    const style = {
      icon: {
        color: color || this.state.foregroundColor
      }
    };
    Object.assign(style.icon, compStyle);
    return (
      <div style={style.icon}>
        <i className="material-icons">{icon}</i>
      </div>
    );
  }
}

Icon.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string
}

export default Icon;
