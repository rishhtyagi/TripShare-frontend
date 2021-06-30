import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logosm from "../images/logosm.png";
import "../assets/css/Style.css";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../services/auth/index";

class NavigationBar extends Component {
  logout = () => {
    this.props.logoutUser();
  };

  render() {
    const guestLinks = (
      <>
        <div className="mr-auto"></div>
        <Nav className="navbar-right">
          <Link to={"aboutUs"} className="nav-link">
            About Us
          </Link>
          <Link to={"register"} className="nav-link">
            <FontAwesomeIcon icon={faUserPlus} /> Register
          </Link>
          <Link to={"login"} className="nav-link">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        </Nav>
      </>
    );
    const userLinks = (
      <>
        <Nav className="mr-auto">
          <Link to={"../dashboard"} className="nav-link">
            My Profile
          </Link>
          <Link to={"../createtrip"} className="nav-link">
            Trip Preferences
          </Link>
          <Link to={"../myTrips"} className="nav-link">
            Trip List
          </Link>
          <Link to={"../aboutUs"} className="nav-link">
            About Us
          </Link>
        </Nav>
        <Nav className="navbar-right">
          <Link to={"login"} className="nav-link" onClick={this.logout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Link>
        </Nav>
      </>
    );

    return (
      <Navbar bg="dark" variant="dark" sticky="top" className="py-2">
        <Link to={""} className="navbar-brand">
          <h3>
            <img src={logosm} width="40" height="40" alt="brand" /> TRIP SHARE
          </h3>
        </Link>

        {this.props.auth.isLoggedIn ? userLinks : guestLinks}
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
