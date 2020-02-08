import React from "react";
import PropTypes from "prop-types";
import "./GridItem.css";

const GridItem = ({ children, gridIndex, numColumns = 4, style: compStyle }) => {
  const style = {
    GridItem: { width: `${100 / numColumns}%`}
  };
  Object.assign(style.GridItem, compStyle);
  let className = "GridItem";
  if (gridIndex % numColumns === 0) className += " Left";
  else if ((gridIndex + 1) % numColumns === 0) className += " Right";
  return (
    <div className={className} style={style.GridItem}>
      { children }
    </div>
  );
};

GridItem.propTypes = {
  gridIndex: PropTypes.number.isRequired,
  numColumns: PropTypes.number.isRequired
};

export default GridItem;
