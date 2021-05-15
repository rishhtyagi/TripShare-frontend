import React, { Component } from "react";
import RegisterServices from "../services/RegisterServices";

import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUndo,
  faUserPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.userChange = this.userChange.bind(this);
    this.submitUser = this.submitUser.bind(this);
  }

  initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  componentDidMount() {
    localStorage.removeItem("newtripId");
    localStorage.removeItem("jwtToken");
  }

  userChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  resetRegisterForm = () => {
    this.setState(() => this.initialState);
  };

  submitUser(e) {
    e.preventDefault();

    let user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    console.log("user => " + JSON.stringify(user));

    RegisterServices.createUser(user).then((res) => {
      this.props.history.push("/login");
    });
  }

  render() {
    const { firstName, email, password, lastName } = this.state;

    return (
      <Row className="justify-content-md-center mt-2">
        <Col xs={5}>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header className="mb-3 mt-3">
              <h2>
                <FontAwesomeIcon icon={faUserPlus} /> Register
              </h2>
            </Card.Header>
            <Card.Body className=" mb-3 mt-3">
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      size="md"
                      name="firstName"
                      value={firstName}
                      onChange={this.userChange}
                      className={"bg-white text-dark"}
                      placeholder="Enter First Name"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      autoComplete="off"
                      type="text"
                      name="lastName"
                      size="md"
                      value={lastName}
                      onChange={this.userChange}
                      className={"bg-white text-dark"}
                      placeholder="Enter Last Name"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup className="mb-3 ">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      autoComplete="off"
                      type="email"
                      name="email"
                      value={email}
                      size="md"
                      onChange={this.userChange}
                      className={"bg-white text-dark"}
                      placeholder="Enter Email Address"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      autoComplete="off"
                      type="password"
                      name="password"
                      size="md"
                      value={password}
                      onChange={this.userChange}
                      className={"bg-white text-dark"}
                      placeholder="Enter Password"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button
                size="md"
                type="button"
                variant="success"
                onClick={this.submitUser}
                disabled={
                  this.state.email.length === 0 ||
                  this.state.password.length === 0
                }
              >
                <FontAwesomeIcon icon={faUserPlus} /> Register
              </Button>{" "}
              <Button
                size="md"
                type="button"
                variant="info"
                onClick={this.resetRegisterForm}
              >
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Register;
