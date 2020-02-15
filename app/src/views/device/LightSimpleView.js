import React from "react";
import "LightSimpleView.css";
import Row from "../../components/Row";
import Toolbar from "../../components/toolbar/Toolbar";
import ToolbarTitle from "../../components/toolbar/ToolbarTitle";

const LightSimpleView = ({ style: compStyle }) => {
  const style = {
    LightSimpleView: {}
  };
  Object.assign(style.LightSimpleView, compStyle);
  return (
    <div className="LightSimpleView" style={style.LightSimpleView}>
      <Row>
        <Toolbar>
          <ToolbarTitle>Light Name</ToolbarTitle>
        </Toolbar>
      </Row>
    </div>
  );
};

export default LightSimpleView;
