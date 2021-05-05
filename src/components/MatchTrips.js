import React, { Component } from "react";
import TripServices from "../services/TripServices";
import "./../assets/css/Style.css";
import { Card, Table, ButtonGroup, Button, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTrash } from "@fortawesome/free-solid-svg-icons";

class MatchTrips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //tripId: this.props.match.params.tripId,
      tripId: "6",
      // trips: [
      //   {
      //     trip: {
      //       firstName: "Ram",
      //       tripDate: "2021/05/21",
      //       destination: "Shimla",
      //       tripId: 1,
      //     },
      //   },
      //   {
      //     trip: {
      //       firstName: "shyam",
      //       tripDate: "2021/05/21",
      //       destination: "Mathura",
      //       tripId: 2,
      //     },
      //   },
      // ],
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
  }
  render() {
    const { trips } = this.state;
    return (
      // <div>
      //   <Card className={"border border-dark bg-dark text-white"}>
      //     <Card.Header>
      //       <div style={{ float: "left" }}>
      //         <FontAwesomeIcon icon={faList} /> Trip List
      //       </div>
      //     </Card.Header>
      //     <Card.Body>
      //       <Table bordered hover striped variant="dark">
      //         <Accordion defaultActiveKey="0">
      //           <thead>
      //             <tr>
      //               <th>Name</th>
      //               <th>Travel Date</th>
      //               <th>Destination</th>
      //               <th>Actions</th>
      //             </tr>
      //           </thead>

      //           <tbody>
      //             {trips.length === 0 ? (
      //               <tr align="center">
      //                 <td colSpan="7">No Trips Available.</td>
      //               </tr>
      //             ) : (
      //               trips.map((mtrip) => (
      //                 <Card className={"border border-dark bg-dark text-white"}>
      //                   <Card.Header>
      //                     <tr key={mtrip.trip.tripId}>
      //                       <td>{mtrip.trip.firstName}</td>
      //                       <td>{mtrip.trip.tripDate}</td>
      //                       <td>{mtrip.trip.destination}</td>

      //                       <td>
      //                         {/* <ButtonGroup>
      //                           <Button
      //                             size="sm"
      //                             variant="outline-danger"
      //                             //onClick={this.deleteBook.bind(this, book.id)}
      //                           >
      //                             <FontAwesomeIcon icon={faTrash} />
      //                             Delete
      //                           </Button>
      //                         </ButtonGroup> */}
      //                         <Accordion.Toggle
      //                           as={Button}
      //                           variant="link"
      //                           eventKey={mtrip.trip.tripId}
      //                         >
      //                           View
      //                         </Accordion.Toggle>
      //                       </td>
      //                     </tr>
      //                   </Card.Header>

      //                   <Accordion.Collapse eventKey={mtrip.trip.tripId}>
      //                     <Card.Body>Hello! I'm the body</Card.Body>
      //                   </Accordion.Collapse>
      //                 </Card>
      //               ))
      //             )}
      //           </tbody>
      //         </Accordion>
      //       </Table>
      //     </Card.Body>
      //   </Card>
      // </div>

      <div>
        <h2 className="text-center text-white">Employees List</h2>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered text-white border border-dark bg-dark">
            <thead>
              <tr>
                <th> Employee First Name</th>
                <th> Employee Last Name</th>
                <th> Employee Email Id</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((mtrip) => (
                <tr key={mtrip.trip.tripId}>
                  <td> {mtrip.trip.firstName} </td>
                  <td> {mtrip.trip.tripDate}</td>
                  <td> {mtrip.trip.destination}</td>
                  <td>
                    <button
                      //onClick={() => this.editEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      Update{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      //onClick={() => this.deleteEmployee(employee.id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      // onClick={() => this.viewEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      View{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MatchTrips;
