import React, { Component } from 'react';
import { 
  Row, 
  Card, 
  CardBody, 
  CardFooter,
  CardHeader,
  Grid,
  Heading,
  Spacer,
  Toolbar,
  ToolbarTitle,
  TextInput,
  Button,
  DropdownList,
  DropdownListItem,
  DropdownListItemText,
  ColorPicker
} from '@react-uix/web';
import SettingsViewController from '../../controller/settings/SettingsViewController';
// import PropTypes from 'prop-types';

class SettingsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controller: new SettingsViewController(this),
      settings: {
        network: {
          hostname: "",
          servicesPort: 30027
        },
        theme: {
          colorPrimary: "#000000"
        }
      }
    };
  }

  componentDidMount() {
    const { controller } = this.state;
    controller.initView();
  }

  render() {
    const apiServicesPortPlaceHolder = (this.state.settings.network)  ? `${this.state.settings.network.servicesPort}` : "30027";
    const hostnamePlaceholder = (this.state.settings.network) ? this.state.settings.network.hostname : "x.x.x.x or hostnamehere.local";
  
    return (
      <div>
        <Row>
          <Toolbar>
            <ToolbarTitle>Hub Settings</ToolbarTitle>
          </Toolbar>
        </Row>

        {/* Network Settings */}
        <Row>
          <Card>
            <CardHeader>
              <Heading h={6}>Network</Heading>
            </CardHeader>
            <CardBody>
              <div>
                <Grid columns={2}>
                  <label htmlFor="hostname">Host Name:</label>
                  <TextInput 
                    id="hostname" 
                    placeholder={hostnamePlaceholder}
                    style={{width: "100%"}}
                    onChange={(hostname) => this._onHostNameUpdated(hostname)}
                  />
                </Grid>
              </div>
              <div>
                <Grid columns={2}>
                  <label htmlFor="apiPort">Hub API Services Port:</label>
                  {/* TODO for @react-uix/web: Allow TextInput of having an output of integer */}
                  <TextInput 
                    id="apiPort" 
                    placeholder={apiServicesPortPlaceHolder}
                    style={{width: "100%"}}
                    onChange={(apiServicesPort) => this._onApiServicesPortUpdated(apiServicesPort)}
                  />
                </Grid>
              </div>
            </CardBody>
          </Card>
        </Row>

        {/* Theme Settings */}
        <Spacer size="1em" />
        <Row>
          <Card>
            <CardHeader>
              <Heading h={6}>Theme</Heading>
            </CardHeader>
            <CardBody>
              <div>
                <Grid columns={2}>
                  <label htmlFor="themeLightOrDark">Light or Dark:</label>
                  <DropdownList id="themeLightOrDark">
                    <DropdownListItem>
                      <DropdownListItemText>Light</DropdownListItemText>
                    </DropdownListItem>
                    <DropdownListItem>
                      <DropdownListItemText>Dark</DropdownListItemText>
                    </DropdownListItem>
                  </DropdownList>
                </Grid>
              </div>
              <div>
                <Grid columns={2}>
                  <label htmlFor="colorPrimary">Primary Color:</label>
                  {/* TODO for @react-uix/web: add 'value' param to ColorPicker */}
                  <ColorPicker id="colorPrimary" value={(this.state.settings.theme) ? this.state.settings.theme.colorPrimary : "#000000"} />
                </Grid>
              </div>
            </CardBody>
          </Card>
        </Row>

        {/* Save Button */}
        <Spacer size="1em" />
        <Row>
          <Card>
            <CardFooter>
              <div style={{display:"flex", justifyContent: "flex-end"}}>
                <Button
                  onClick={() => this._saveSettings()}
                >Save</Button>
              </div>
            </CardFooter>
          </Card>
        </Row>
      </div>
    );
  }

  /**
   * Show an error.
   * @param {Error} err any error that occurs.
   */
  showError(err) {
    alert(err);
    // TODO: better error handling
  }

  /**
   * Show the settings.
   * @param {{ network: object, theme: object }} settings the settings. 
   */
  showSettings(settings) {
    if (typeof settings === "object") {
      const network = Object.assign({}, this.state.settings.network);
      const theme = Object.assign({}, this.state.settings.theme);
      if (settings.network) {
        Object.assign(network, settings.network);
      }
      if (settings.theme) {
        Object.assign(theme, settings.theme)
      }
      this.setState({ settings: { network, theme } });
    }
  }

  /**
   * Called when the user updates the 'API Services Port' value.
   * @param {string} apiServicesPort the api services port.
   */
  _onApiServicesPortUpdated(apiServicesPort) {
    try {
      const port = parseInt(apiServicesPort);
      const settings = Object.assign({}, this.state.settings);
      settings.network.servicesPort = port;
      this.setState({ settings });
    } catch (e) {
      // TODO: flag the apiPort TextInput as having invalid input
    }
  }

  /**
   * Called when the user updates the 'Host Name' value.
   * @param {string} hostname the hostname.
   */
  _onHostNameUpdated(hostname) {
    const settings = {};
    Object.assign(settings, this.state.settings);
    settings.network.hostname = hostname;
    this.setState({ settings });
  }

  /**
   * Save the settings.
   */
  _saveSettings() {
    const { controller } = this.state;
    controller.saveSettings(this.state.settings);
  }
}

export default SettingsView;
