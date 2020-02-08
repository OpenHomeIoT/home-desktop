import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./Grid.css";
import Row from "../Row";
import GridItem from "./GridItem";

/**
 * Render the grid items.
 * @param {GridItem[]} children the grid items.
 * @param {number} numColumns the number of columns in the grid.
 */
const renderGridItems = (children, numColumns) => {
  // split the child GridItems into groups of size <numColumns>
  const splitChildren = _.chunk(children, numColumns);
  const rows = [];
  // const width = 100 / numColumns;
  splitChildren.forEach((childArray, index, _) => {
    // const style = { width: `${width}%` }
    // childArray.forEach(child => child.style = style);
    const rowKey = `grid-row-${index}`;
    rows.push((
      <Row key={`grid-row-${index}`}>
        {
          childArray.map((child, childIndex, _) => {

            return <GridItem key={`grid-item-${childIndex}-${rowKey}`} gridIndex={childIndex} numColumns={numColumns}>{ child }</GridItem>;
          })
        }
      </Row>
    ));
  });
  return rows;
}

const Grid = ({ children, columns = 4, style: compStyle }) => {
  const style = {
    Grid: {}
  };
  Object.assign(style.Grid, compStyle);
  return (
    <div className="Grid" style={style.Grid}>
      { renderGridItems(children, columns) }
    </div>
  );
};

Grid.propTypes = {
  columns: PropTypes.number
};

export default Grid;
