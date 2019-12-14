import React, { Component } from "react";
import { nativeImage } from "electron";
import path from "path";
import PropTypes from "prop-types";

class Drawable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      drawableSrc: '',
    };
  }

  componentDidMount() {
    const { src } = this.props;
    const drawablesBase = path.join(process.cwd(), "build/renderer/drawable");
    const image = nativeImage.createFromPath(path.join(drawablesBase, src));
    this.setState({ drawableSrc: image.toDataURL() });
  }

  render() {
    const { style: compStyle, height, width } = this.props;
    const { drawableSrc } = this.state;
    const style = {
      drawable: {
        height,
        width
      },
      img: {
        height,
        width
      }
    };
    Object.assign(style.drawable, compStyle);
    return (
      <div style={style.drawable}>
        {/* TODO: alt text for img */}
        <img style={style.img} src={drawableSrc} />
      </div>
    );
  }
};

Drawable.propTypes = {
  src: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
};

export default Drawable;
