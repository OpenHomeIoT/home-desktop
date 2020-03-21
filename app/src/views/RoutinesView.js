import React, { Component } from 'react';
import { Row, Card, CardHeader, CardBody, Heading, Spacer } from '@react-uix/web';
// import PropTypes from 'prop-types';

class RoutinesView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Row>
          <Card>
            <CardHeader>
              <Heading h={6}>Morning</Heading>
            </CardHeader>
            <CardBody>

            </CardBody>
          </Card>
        </Row>
        <Spacer size="2em" />
        <Row>
          <Card>
            <CardHeader>
              <Heading h={6}>Bedtime</Heading>
            </CardHeader>
            <CardBody>

            </CardBody>
          </Card>
        </Row>
        <Spacer size="2em" />
        <Row>
          <Card>
            <CardHeader>
              <Heading h={6}>Leaving the house</Heading>
            </CardHeader>
            <CardBody>

            </CardBody>
          </Card>
        </Row>
        <Spacer size="2em" />
        <Row>
          <Card>
            <CardHeader>
              <Heading h={6}>Coming home</Heading>
            </CardHeader>
            <CardBody>

            </CardBody>
          </Card>
        </Row>
      </div>
    );
  }
}

export default RoutinesView;
