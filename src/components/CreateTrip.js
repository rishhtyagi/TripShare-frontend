import React, { Component } from "react";
import { Form, Col, Row, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import TripServices from "../services/TripServices";

class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: "",
      landscape: "",
      tripDate: "",
      tripLength: "",
      tripBudget: "",
      groupSize: "",
      expectedAgeGroup: "",
      expectedGender: "",
      description: "",
    };
    this.userChange = this.userChange.bind(this);
    this.submitTrip = this.submitTrip.bind(this);
    this.test = this.test.bind(this);
    localStorage.removeItem("newtripId");
  }
  userChange = (event) => {
    console.log(event.target.name + " => " + event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitTrip = (e) => {
    e.preventDefault();
    let trip = {
      destination: this.state.destination,
      landscape: this.state.landscape,
      tripDate: this.state.tripDate,
      tripLength: this.state.tripLength,
      tripBudget: this.state.tripBudget,
      groupSize: this.state.groupSize,
      expectedAgeGroup: this.state.expectedAgeGroup,
      expectedGender: this.state.expectedGender,
      description: this.state.description,
    };
    console.log(trip);
    TripServices.saveTrip(trip).then((res) => {
      console.log(res.data.tripId);
      var newtripId = res.data.tripId;
      localStorage.setItem("tripId", newtripId);
      this.props.history.push("/newMatch/");
    });
  };

  test() {
    this.props.history.push("/newmatch");
  }

  render() {
    const {
      destination,
      landscape,
      tripDate,
      tripLength,
      tripBudget,
      groupSize,
      expectedAgeGroup,
      expectedGender,
      description,
    } = this.state;
    return (
      <div>
        <Form>
          <Row className="justify-content-md-center">
            <Col xs={7}>
              <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                  <FontAwesomeIcon icon={faUserPlus} /> Create a trip
                </Card.Header>
                <Card.Body>
                  <Form.Group controlId="formGridDestination">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Destination"
                      name="destination"
                      value={destination}
                      onChange={this.userChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridLandscape">
                    <Form.Label>Landscape</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue="Choose Landsape..."
                      name="landscape"
                      //   value={landscape}
                      onChange={this.userChange}
                    >
                      <option value="-1">Choose Landscape...</option>
                      <option value="0">Any</option>
                      <option value="1">Mountain/Hilly</option>
                      <option value="2">Beach</option>
                      <option value="3">Snowy</option>
                      <option value="4">Other</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formGridDate">
                    <Form.Label>Travel Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="tripDate"
                      value={tripDate}
                      onChange={this.userChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridTripLength">
                    <Form.Label>Trip Length</Form.Label>
                    <Form.Control
                      placeholder="Enter no. of days"
                      name="tripLength"
                      value={tripLength}
                      onChange={this.userChange}
                    />
                  </Form.Group>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridBudget">
                      <Form.Label>Trip Budget</Form.Label>
                      <Form.Control
                        placeholder="Enter your budget"
                        name="tripBudget"
                        value={tripBudget}
                        onChange={this.userChange}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridGroup">
                      <Form.Label>Group Size</Form.Label>
                      <Form.Control
                        placeholder="Your group size"
                        name="groupSize"
                        value={groupSize}
                        onChange={this.userChange}
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Col xs={6}>
                      <Form.Group controlId="formGridAge">
                        <Form.Label>Preferred Age Group</Form.Label>
                        <Form.Control
                          as="select"
                          defaultValue="Choose..."
                          name="expectedAgeGroup"
                          //   value={expectedAgeGroup}
                          onChange={this.userChange}
                        >
                          <option value="-1">Choose...</option>
                          <option value="0">Upto 20 years</option>
                          <option value="1">20-30</option>
                          <option value="3">30-40</option>
                          <option value="4">40-50</option>
                          <option value="5">50+</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Form.Group as={Col}>
                      <Form.Label>Preferred Gender</Form.Label>
                      <Col sm={10}>
                        <Form.Check
                          type="radio"
                          label="Any"
                          name="expectedGender"
                          id="anyradio"
                          value="0"
                          onChange={this.userChange}
                        />
                        <Form.Check
                          type="radio"
                          label="Male"
                          name="expectedGender"
                          id="maleradio"
                          value="1"
                          onChange={this.userChange}
                        />
                        <Form.Check
                          type="radio"
                          label="Female"
                          name="expectedGender"
                          id="femaleradio"
                          value="2"
                          onChange={this.userChange}
                        />
                      </Col>
                    </Form.Group>
                  </Form.Row>

                  <Form.Group controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="textarea"
                      rows="9"
                      placeholder="Your expectations here..."
                      name="description"
                      value={description}
                      onChange={this.userChange}
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Footer style={{ textAlign: "left" }}>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.submitTrip}
                  >
                    Find Me Some Fellow Travellers
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default CreateTrip;
