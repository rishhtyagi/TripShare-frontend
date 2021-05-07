import React, { Component } from "react";
import axios from "axios";

class MyTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: null,
    };

    this.deleteTrip = this.deleteTrip.bind(this);
    this.myMatches = this.myMatches.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8085/user/gettrips", {
      method: "get",
      headers: new Headers({
        Authorization: localStorage.jwtToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((mytrips) => {
        console.log(mytrips);
        this.setState({
          trips: mytrips,
        });
      });
  }

  myMatches(tripId) {
    console.log(tripId);
    localStorage.setItem("tripId", tripId);
    this.props.history.push("/newMatch");
  }

  deleteTrip(tripId) {
    console.log(tripId);
    axios.post("http://localhost:8085/user/deletetrip/" + tripId, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    });
  }
  render() {
    const { trips } = this.state;
    const isLoading = trips === null;

    return (
      <div>
        <h2 className="text-center text-white">My Trip's List</h2>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered text-white text-center border border-dark bg-dark">
            <thead>
              <tr>
                <th> Description</th>
                <th> Destination</th>
                <th> Budget</th>
                <th> Group Size</th>
                <th> Date</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="uk-text-center text-white">
                    <em className="uk-text-muted text-white">
                      No trips to display
                    </em>
                  </td>
                </tr>
              ) : (
                this.state.trips.map((mtrip) => (
                  <tr key={mtrip.tripId}>
                    <td> {mtrip.description} </td>
                    <td> {mtrip.destination}</td>
                    <td> {mtrip.tripBudget}</td>
                    <td> {mtrip.groupSize}</td>
                    <td> {mtrip.tripDate} </td>
                    <td>
                      <button
                        onClick={() => this.myMatches(mtrip.tripId)}
                        className="btn btn-info"
                      >
                        View Matches{" "}
                      </button>
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.deleteTrip(mtrip.tripId)}
                        className="btn btn-danger"
                      >
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MyTrips;
