
import React, { Component } from "react";
// import PropTypes from "prop-types";
import ServicesViewController from "../../controller/service/ServicesViewController";
import Row from "../../components/Row";
import Toolbar from "../../components/toolbar/Toolbar";
import ToolbarTitle from "../../components/toolbar/ToolbarTitle";
import ToolbarOptionContainer from "../../components/toolbar/ToolbarOptionContainer";
import IconButton from "../../components/IconButton";
import Grid from "../../components/grid/Grid";
import { connect } from "react-redux";
import ServiceThumb from "../../components/ServiceThumb";

const mapStateToProps = (state) => ({
  primaryColor: state.ui.primaryColor
});

const renderServices = (services, primaryColor) => {
  if (!services) return;
  // TODO: move below to ServiceThumb.js
  return (services) ? services.map((service, index, _) => (
    <ServiceThumb key={`service-${index}`} service={service} footerLink={`/services/${service._id}`} footerText="More Info" />
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
