import React, { Component } from 'react';
import Row from '../../components/Row';
import Toolbar from '../../components/toolbar/Toolbar';
import ToolbarTitle from '../../components/toolbar/ToolbarTitle';
import ToolbarOptionContainer from '../../components/toolbar/ToolbarOptionContainer';
import IconButton from '../../components/IconButton';
import Grid from '../../components/grid/Grid';
import Card from "../../components/card/Card";
import CardBody from "../../components/card/CardBody";
import CardFooter from "../../components/card/CardFooter";
import CardHeader from "../../components/card/CardHeader";
import Heading from '../../components/Heading';
import AutomationsViewController from '../../controller/automation/AutomationsViewController';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const renderAutomations = (automations) => automations.map((automation, index, _) => (
  <Card key={`automation-${index}`}>
    <CardHeader>
      <Heading>{ automation.name }</Heading>
    </CardHeader>
    <CardBody>

    </CardBody>
    <CardFooter>

    </CardFooter>
  </Card>
));

class AutomationsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      automations: [],
      controller: new AutomationsViewController(this)
    };

    // binding
    this.showAutomations = this.showAutomations.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    this.state.controller.initView();
  }

  render() {
    const { automations } = this.state;
    return (
      <div>
        <Row>
          <Toolbar backgroundColor="#ffffff" foregroundColor="#000000">
            <ToolbarTitle>Automations</ToolbarTitle>
            <ToolbarOptionContainer>
              <Link to="/automate/create"><IconButton color="#000000">add</IconButton></Link>
              <IconButton color="#000000">more_vert</IconButton>
            </ToolbarOptionContainer>
          </Toolbar>
        </Row>
        <Grid columns={3}>
          { renderAutomations(automations) }
        </Grid>
      </div>
    );
  }

  /**
   * Show the automations.
   * @param {any[]} automations the automations. // TODO: type signature.
   */
  showAutomations(automations) {
    this.setState({ automations });
  }

  /**
   * Show an error.
   * @param {any} err any error that occurs.
   */
  showError(err) {
    alert(err); // TODO: toast
  }
}

export default AutomationsView;
