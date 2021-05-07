import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <Nav className="mr-auto">
          <Link to={"aboutUs"} className="nav-link">
            About Us
          </Link>
        </Nav>
        <Nav className="navbar-right">
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
          <Link to={"dashboard"} className="nav-link">
            My Profile
          </Link>
          <Link to={"createtrip"} className="nav-link">
            Create Trip
          </Link>
          <Link to={"myTrips"} className="nav-link">
            Trip List
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
      <Navbar bg="dark" variant="dark">
        <Link to={""} className="navbar-brand">
          <img
            src="https://www.vhv.rs/dpng/d/450-4505042_trekking-png-hd-mountain-hiking-clip-art-transparent.png"
            width="25"
            height="25"
            alt="brand"
          />{" "}
          TRIP SHARE
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
