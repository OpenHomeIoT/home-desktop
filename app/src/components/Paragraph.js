import React from "react";
import PropTypes from "prop-types";
import "./Paragraph.css";
import Text from "./Text";

const Paragraph = ({ children, color, style: compStyle }) => {
  const style = {
    Paragraph: {}
  };
  Object.assign(style.Paragraph, compStyle);
  return (
    <div className="Paragraph" style={style.Paragraph}>
      <Text color={color}>{ children }</Text>
    </div>
  );
};

Paragraph.propTypes = {
  color: PropTypes.string
};

export default Paragraph;
