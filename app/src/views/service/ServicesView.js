
import React, { Component } from "react";
// import PropTypes from "prop-types";
import ServicesViewController from "../../controller/service/ServicesViewController";
import Row from "../../components/Row";
import Toolbar from "../../components/toolbar/Toolbar";
import ToolbarTitle from "../../components/toolbar/ToolbarTitle";
import ToolbarOptionContainer from "../../components/toolbar/ToolbarOptionContainer";
import IconButton from "../../components/IconButton";
import Grid from "../../components/grid/Grid";
import Heading from "../../components/Heading";
import Card from "../../components/card/Card";
import CardHeader from "../../components/card/CardHeader";
import CardBody from "../../components/card/CardBody";
import CardFooter from "../../components/card/CardFooter";
import DropdownButton from "../../components/dropdownbutton/DropdownButton";
import DropdownButtonItem from "../../components/dropdownbutton/DropdownButtonItem";
import DropdownButtonText from "../../components/dropdownbutton/DropdownButtonText";
import Icon from "../../components/Icon";
import DropdownButtonIcon from "../../components/dropdownbutton/DropdownButtonIcon";
import Text from "../../components/Text";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
  primaryColor: state.ui.primaryColor
});

const renderServices = (services, primaryColor) => {
  if (!services) return;
  // TODO: move below to ServiceThumb.js
  return (services) ? services.map((service, index, _) => (
    <Card key={`service-${index}`}>
      <CardHeader>
        <div>
          <Heading h={6}>{ service.friendlyName }</Heading>
          <Text fontSize=".6rem" color="#555">{ service.name }</Text>
        </div>
        <DropdownButton icon="more_vert" color="#000000">
          <DropdownButtonItem>
            <DropdownButtonIcon color="#000000">settings</DropdownButtonIcon>
            <DropdownButtonText>Settings</DropdownButtonText>
          </DropdownButtonItem>
        </DropdownButton>
      </CardHeader>
      <CardBody>
        <Text color="#000" fontSize=".75rem">Author: { service.author }</Text>
        <Text color="#000" fontSize=".75rem">Enabled: { (service.enabled) ? "Yes" : "No" }</Text>
        <Text color="#000" fontSize=".75rem">Version: { service.version }</Text>
        <Text color="#000" fontSize=".75rem">Repository: <a href={service.repositoryUrl} target="__blank">{ service.repositoryUrl }</a></Text>
      </CardBody>
      <Link to={`/services/${service._id}`} style={{textDecoration: "none"}}>
        <CardFooter style={{ backgroundColor: primaryColor, display: "flex", alignContent: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#ffffff" }}>More Info</span>
          <Icon>arrow_right</Icon>
        </CardFooter>
      </Link>
    </Card>
  )) : null;
}

class ServicesView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      controller: new ServicesViewController(this),
      services: []
    };
  }

  componentDidMount() {
    this.state.controller.initView();
  }

  render() {
    const { primaryColor, style: compStyle } = this.props;
    const { services } = this.state;
    const style = {
      ServicesView: {

      }
    };
    Object.assign(style.ServicesView, compStyle);
    return (
      <div className="ServicesView" style={style.ServicesView}>
        <Row>
          <Toolbar backgroundColor="#ffffff" foregroundColor="#000000">
            <ToolbarTitle>Services</ToolbarTitle>
            <ToolbarOptionContainer>
              {/* TODO: link to add service */}
              <IconButton color="#000000">add</IconButton>
              <IconButton color="#000000">more_vert</IconButton>
            </ToolbarOptionContainer>
          </Toolbar>
        </Row>
        <Grid columns={3}>
          { renderServices(services, primaryColor) }
        </Grid>
      </div>
    );
  }

  /**
   * Show all of the services.
   * @param {object[]} services the services. // TODO: type signature
   */
  showAllServices(services) {
    this.setState({ services });
  }
}

ServicesView.propTypes = {};

export default connect(mapStateToProps)(ServicesView);
