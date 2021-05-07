import React, { Component } from "react";
import UserTableRow from "./UserTableRow";
import { Table, Card } from "react-bootstrap";
import "../assets/css/Style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import TripServices from "../services/TripServices";

class NewMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripId: localStorage.getItem("tripId"),
      trips: null,
    };
  }

  componentDidMount() {
    console.log(this.state.tripId);
    TripServices.GetmatchTrip(this.state.tripId).then((res) => {
      console.log(res.data);
      this.setState({
        trips: res.data,
      });
      console.log(this.state.trips[0].trip.tripId);
    });
    localStorage.removeItem("tripId");
  }

  render() {
    const { trips } = this.state;

    const isLoading = trips === null;
    return (
      <div>
        <Card className={"border border-dark bg-secondary text-white"}>
          <Card.Header>
            <div style={{ float: "left" }}>
              <FontAwesomeIcon icon={faList} /> Trip List
            </div>
          </Card.Header>
          <div className="uk-overflow-auto">
            <Card.Body>
              <Table bordered hover striped variant="dark">
                <thead>
                  <tr>
                    <th>Destination</th>
                    <th>Date</th>
                    <th>"Trip Host</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="uk-text-center text-white">
                        <em className="uk-text-muted text-white">
                          No Matches Available
                        </em>
                      </td>
                    </tr>
                  ) : (
                    this.state.trips.map((mtrip) => (
                      <UserTableRow key={mtrip.trip.tripId} trip={mtrip.trip} />
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </div>
        </Card>
      </div>
    );
  }
}

export default NewMatch;
