import React from "react";
import PropTypes from "prop-types";

const ToolbarOptionContainer = ({ children, style: compStyle }) => {
  const style = {
    optionContainer: {
      float: "right",
      display: "flex",
      height: "100%",
      padding: "0 1em 0 0",
      alignItems: "center",
      justifyContent: "center"
    }
  };
  Object.assign(style.optionContainer, compStyle);
  return (
    <div style={style.optionContainer}>
      { children }
    </div>
  );
};

export default ToolbarOptionContainer;
