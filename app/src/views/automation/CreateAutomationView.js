import React, { Component } from "react";
// import PropTypes from "prop-types";
import {
  Row,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Grid,
  Paragraph,
  Toolbar,
  ToolbarTitle
} from "@react-uix/web";
import CreateAutomationsViewController from "../../controller/automation/CreateAutomationsViewController";
import ServiceThumb from "../../components/ServiceThumb";

class CreateAutomationView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      controller: new CreateAutomationsViewController(this),
      selectedTriggerService: null,
      services: [],
    };

    // binding
    this.showError = this.showError.bind(this);
    this.showServices = this.showServices.bind(this);
    this._selectTriggerService = this._selectTriggerService.bind(this);
  }

  componentDidMount() {
    this.state.controller.initView();
  }

  render() {
    const { style: compStyle } = this.props;
    const { selectedTriggerService, services } = this.state;
    const style = {
      CreateAutomationView: {}
    };
    Object.assign(style.CreateAutomationView, compStyle);
    return (
      <div className="CreateAutomationView" style={style.CreateAutomationView}>
        <Row>
          <Card>
            <CardHeader>
              <Heading h={6}>Create a new Automation</Heading>
            </CardHeader>
            <CardBody>
              <Paragraph color="#000">
                Automations help you automate processes in your home.
                An automation consists of a trigger service and one or more service actions.
              </Paragraph>
              <Paragraph color="#000">To create an automation, start with a trigger service below.</Paragraph>
            </CardBody>
          </Card>
        </Row>
        {/* TODO: add automation name */}
        <Row style={{ paddingTop: "1em" }}>
          <Toolbar>
            <ToolbarTitle>Choose your Trigger Service</ToolbarTitle>
          </Toolbar>
        </Row>
        <Grid columns={3}>
          { services.map((service, index, _) => <ServiceThumb key={`service-${index}`} footerText={(selectedTriggerService && selectedTriggerService._id === service._id) ? "Selected" : "Select" } service={service} footerOnClick={() => this._selectTriggerService(service)} />) }
        </Grid>
        { selectedTriggerService &&
          this._renderServiceActions()
        }
      </div>
    );
  }

  /**
   * Show an error.
   * @param {any} err any error that occurs.
   */
  showError(err) {
    alert(err); // TODO: toast
  }

  /**
   * Show the services
   * @param {any[]} services the service. // TODO: type signature
   */
  showServices(services) {
    this.setState({ services });
  }

  _renderServiceActions() {
    return (
      <Row>
        <Toolbar>
          <ToolbarTitle>Add an Action</ToolbarTitle>
        </Toolbar>
        <Grid columns={3}>
          <Card><CardBody>1</CardBody></Card>
          <Card><CardBody>2</CardBody></Card>
          <Card><CardBody>3</CardBody></Card>
        </Grid>
      </Row>
    );
  }

  /**
   * Select a trigger service.
   * @param {any} selectedTriggerService the selected trigger service. // TODO: type signature
   */
  _selectTriggerService(selectedTriggerService) {
    if (this.state.selectedTriggerService !== null && this.state.selectedTriggerService._id === selectedTriggerService._id) {
      // deselect the trigger service
      this.setState({ selectedTriggerService: null });
    } else
      this.setState({ selectedTriggerService });
  }
}

CreateAutomationView.propTypes = {};

export default CreateAutomationView;
