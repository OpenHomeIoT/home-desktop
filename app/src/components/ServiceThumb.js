import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ServiceThumb.css";
import Card from "./card/Card";
import CardBody from "./card/CardBody";
import CardFooter from "./card/CardFooter";
import CardHeader from "./card/CardHeader";
import Icon from "./Icon";
import Text from "./Text";
import Heading from "./Heading";
import DropdownButton from "./dropdownbutton/DropdownButton";
import DropdownButtonItem from "./dropdownbutton/DropdownButtonItem";
import DropdownButtonIcon from "./dropdownbutton/DropdownButtonIcon";
import DropdownButtonText from "./dropdownbutton/DropdownButtonText";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  primaryColor: state.ui.primaryColor
});

class ServiceThumb extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { footerLink, footerOnClick, footerText, primaryColor, service, style: compStyle } = this.props;
    const style = {
      ServiceThumb: {},
      footer: {
        backgroundColor: primaryColor,
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between",
        cursor: "pointer"
      }
    };
    Object.assign(style.ServiceThumb, compStyle);
    return (
      <div className="ServiceThumb" style={style.ServiceThumb}>
        <Card>
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
          <div onClick={() => footerOnClick && footerOnClick()}>
            { footerLink &&
              <Link to={footerLink} style={{textDecoration: "none"}}>
                <CardFooter style={style.footer}>
                  <span style={{ color: "#ffffff" }}>{footerText}</span>
                  <Icon>arrow_right</Icon>
                </CardFooter>
              </Link>
            }
            { !footerLink &&
              <CardFooter style={style.footer}>
                <span style={{ color: "#ffffff" }}>{footerText}</span>
                <Icon>arrow_right</Icon>
              </CardFooter>
            }
          </div>
        </Card>
      </div>
    );
  }
}

ServiceThumb.propTypes = {
  footerLink: PropTypes.string,
  footerOnClick: PropTypes.func,
  footerText: PropTypes.string,
  selected: PropTypes.bool,
  service: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ServiceThumb);
