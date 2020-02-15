import React, { Component } from "react";
import Toolbar from "../../components/toolbar/Toolbar";
import ToolbarTitle from "../../components/toolbar/ToolbarTitle";
import ToolbarOptionContainer from "../../components/toolbar/ToolbarOptionContainer";
import DropdownButton from "../../components/dropdownbutton/DropdownButton";
import DropdownButtonItem from "../../components/dropdownbutton/DropdownButtonItem";
import DropdownButtonIcon from "../../components/dropdownbutton/DropdownButtonIcon";
import DropdownButtonText from "../../components/dropdownbutton/DropdownButtonText";
import Row from "../../components/Row";
import ServiceViewController from "../../controller/service/ServiceViewController";
import PropTypes from "prop-types";
import Card from "../../components/card/Card";
import CardBody from "../../components/card/CardBody";
import Text from "../../components/Text";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  primaryColor: state.ui.primaryColor
});

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
              <Card style={{ padding: ".5em", marginBottom: "1em", backgroundColor: primaryColor }}><Text fontSize=".75rem">{ service.description }</Text></Card>
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

export default connect(mapStateToProps)(ServiceView);
