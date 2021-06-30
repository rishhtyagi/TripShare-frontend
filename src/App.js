import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EditProfile from "./components/EditProfile";
import CreateTrip from "./components/CreateTrip";
import NewMatch from "./components/NewMatch";
import DeleteProfile from "./components/DeleteProfile";
import ChangePhoto from "./components/ChangePhoto";
import ChatUI from "./components/ChatUI";

import MyTrips from "./components/MyTrips";
import AboutUs from "./components/AboutUs";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
            <Switch>
              <Route path="/" exact component={Welcome} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/editProfile" exact component={EditProfile} />
              <Route path="/createtrip" exact component={CreateTrip} />
              <Route path="/newMatch" exact component={NewMatch} />
              <Route path="/deleteProfile" exact component={DeleteProfile} />
              <Route path="/changePhoto" exact component={ChangePhoto} />
              <Route path="/chatUi/:id" exact component={ChatUI} />
              <Route path="/myTrips" exact component={MyTrips} />
              <Route path="/aboutUs" exact component={AboutUs} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}
