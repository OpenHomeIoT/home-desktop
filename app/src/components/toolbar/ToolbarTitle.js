import React from "react";
import PropTypes from "prop-types";
import Heading from "../Heading";

const ToolbarTitle = ({ children: title, style: compStyle }) => {
  const style = {
    toolbarTitle: {
      height: 60,
      display: "inline-flex",
      alignItems: "center",
      margin: "0 0 0 1em"
    },
    heading: {
      margin: 0
    }
  };
  Object.assign(style.toolbarTitle, compStyle);
  return (
    <div style={style.toolbarTitle}>
      <Heading h={6} style={style.heading}>{ title }</Heading>
    </div>
  );
};

ToolbarTitle.propTypes = {
  children: PropTypes.string
};

export default ToolbarTitle;
