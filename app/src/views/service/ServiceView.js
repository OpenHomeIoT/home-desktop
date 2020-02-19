import React, { Component } from "react";
import {
  Toolbar,
  ToolbarTitle,
  ToolbarOptionContainer,
  DropdownButton,
  DropdownButtonItem,
  DropdownButtonIcon,
  DropdownButtonText,
  Row,
  Card,
  CardBody,
  Text
} from "react-uix";
import ServiceViewController from "../../controller/service/ServiceViewController";
import PropTypes from "prop-types";

class ServiceView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      controller: new ServiceViewController(this),
      service: {}
    };

    // binding
    this.showError = this.showError.bind(this);
    this.showService = this.showService.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    this.state.controller.initView(id);
  }

  render() {
    const { primaryColor, style: compStyle } = this.props;
    const { service } = this.state;
    const style = {
      ServiceView: {}
    };
    Object.assign(style.ServiceView, compStyle);
    return (
      <div className="ServiceView" style={style.ServiceView}>
        <Row>
          <Toolbar backgroundColor="#ffffff" foregroundColor="#000000">
            <ToolbarTitle>{ service.friendlyName }</ToolbarTitle>
            <ToolbarOptionContainer>
              <DropdownButton icon="more_vert" color="#000000">
                <DropdownButtonItem>
                  <DropdownButtonIcon color="#000000">settings</DropdownButtonIcon>
                  <DropdownButtonText>Settings</DropdownButtonText>
                </DropdownButtonItem>
              </DropdownButton>
            </ToolbarOptionContainer>
          </Toolbar>
        </Row>
        <Row>
          <Card>
            <CardBody>
              <Card style={{ padding: ".5em", marginBottom: "1em" }}><Text fontSize=".75rem">{ service.description }</Text></Card>
              <Text color="#000" fontSize=".75rem">Author: { service.author }</Text>
              <Text color="#000" fontSize=".75rem">Service ID: { service._id }</Text>
              <Text color="#000" fontSize=".75rem">Enabled: { (service.enabled) ? "Yes" : "No" }</Text>
              <Text color="#000" fontSize=".75rem">Version: { service.version }</Text>
            </CardBody>
          </Card>
        </Row>
      </div>
    );
  }

  /**
   * Show an error.
   * @param {any} err any error that occurs.
   */
  showError(err) {
    alert(err); // TODO: show toast
  }

  /**
   * Show the service.
   * @param {object} service the service. // TODO: type signature
   */
  showService(service) {
    this.setState({ service });
  }
}

ServiceView.propTypes = {
  id: PropTypes.string
};

export default ServiceView;
