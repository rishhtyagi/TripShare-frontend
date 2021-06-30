import React, { Component } from "react";
import { Button } from "react-bootstrap";

//import * from "../assets/css/"

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      description: "",
      gender: "",
      photoPath: null,
      trip: null,
      test: "",
      firstChatUser: null,
    };
    this.editProfile = this.editProfile.bind(this);
    this.createTrip = this.createTrip.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
    this.myTrips = this.myTrips.bind(this);
    this.myChats = this.myChats.bind(this);
    localStorage.removeItem("newtripId");
  }

  componentDidMount() {
    this.findUserByUser();
    this.findTripsByUser();
    this.getChatUsers();
  }

  editProfile() {
    return this.props.history.push("/editProfile");
  }

  findUserByUser = () => {
    fetch("http://localhost:8085/user/getdetails", {
      method: "get",
      headers: new Headers({
        Authorization: localStorage.jwtToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        console.log(user);
        this.setState({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,

          dob: user.dob,
          description: user.description,
          photoPath: user.photoPath,
        });

        if (user.gender === 1) {
          this.setState({ gender: "Male" });
        } else if (user.gender === 0) {
          this.setState({ gender: "Other" });
        } else if (user.gender === 2) {
          this.setState({ gender: "Female" });
        }
      });
  };

  findTripsByUser = () => {
    fetch("http://localhost:8085/user/gettrips", {
      method: "get",
      headers: new Headers({
        Authorization: localStorage.jwtToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((trips) => {
        console.log(trips[0]);
        this.setState({
          trip: trips[0],
          test: trips.length,
        });
        console.log(this.state.test);
      });
  };

  getChatUsers = () => {
    fetch("http://localhost:8085/user/getchatslist", {
      method: "get",
      headers: new Headers({
        Authorization: localStorage.jwtToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((chatUsers) => {
        console.log(chatUsers);
        this.setState({
          firstChatUser: chatUsers[0],
        });
      });
  };

  createTrip() {
    return this.props.history.push("/createtrip");
  }

  deleteProfile() {
    return this.props.history.push("/deleteProfile");
  }
  myTrips() {
    return this.props.history.push("/myTrips");
  }
  myChats() {
    return this.props.history.push("/chatUi/" + this.state.id);
  }
  changePhoto() {
    localStorage.setItem("photoPath", this.state.photoPath);
    return this.props.history.push("/changePhoto");
  }
  render() {
    const {
      firstName,
      lastName,
      email,
      gender,
      description,
      dob,
      photoPath,
      trip,
      firstChatUser,
      test,
    } = this.state;

    const isPhoto = photoPath === null;
    let yaar;

    if (!test) {
      yaar = (
        <div className="text-white text-center bg-info block-example border border-danger w-100 p-2">
          There are no previous trips to display.
          <br /> Click on Create Trip Button to create new. trips.
        </div>
      );
    } else {
      yaar = (
        <div>
          <i>Latest Trip</i>
          <div className="text-dark block-example border border-info w-100 p-2">
            <small>
              Description:{trip.description}
              <br />
              Location: {trip.destination}
              {" | "}
              Budget: {trip.tripBudget}
              <br />
              Group Size: {trip.groupSize}
              {" | "}
              Date: {trip.tripDate}
            </small>
          </div>
          <small>To see all the information click on button below...</small>
          <br />
          <Button className="text-center" onClick={this.myTrips}>
            {" "}
            view all
          </Button>
        </div>
      );
    }

    let chatUserDisplay;
    if (!firstChatUser) {
      chatUserDisplay = (
        <div className="text-white text-center bg-info block-example border border-danger w-100 p-2">
          There are no messages.
        </div>
      );
    } else {
      chatUserDisplay = (
        <div>
          <i>You have a message from:</i>
          <br></br>
          <div className="text-dark block-example border border-info w-100 p-2">
            <small>
              <li>
                {firstChatUser.firstName} {firstChatUser.lastName}
              </li>
            </small>
          </div>
          <br />
          <Button size="sm" className="text-center" onClick={this.myChats}>
            {" "}
            View other messages
          </Button>
        </div>
      );
    }

    return (
      <div className="container mt-5">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    {isPhoto ? (
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="No path"
                        className="rounded-circle"
                        width="150"
                      ></img>
                    ) : (
                      <img
                        src={`http://localhost:8085/userphotos/` + photoPath}
                        alt="No preview"
                        className="rounded-circle"
                        width="150"
                      ></img>
                    )}

                    <div className="mt-3">
                      <h4>{firstName + " " + lastName}</h4>
                      <p className="text-secondary mb-3">{description}</p>

                      <button
                        className="btn btn-primary"
                        onClick={this.changePhoto}
                      >
                        Change Photo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-center">
                    <>
                      <style type="text/css">
                        {`
                      .editProfile {
                        background-color: #1E90FF ;
                        color: white;
                      }
                      .createTrip {
                        background-color: grey;
                        color: white;
                      }
                      .btn-xxl {
                        left: 1rem;
                        font-size: 1rem;
                      }
                      `}
                      </style>
                      <Button
                        className="editProfile"
                        variant="flat"
                        size="xxl1"
                        onClick={this.editProfile}
                      >
                        Edit Profile
                      </Button>
                    </>
                  </li>
                  <li className="list-group-item text-center">
                    <>
                      <Button
                        className="createTrip"
                        variant="flat"
                        size="xxl1"
                        onClick={this.createTrip}
                      >
                        Trip Preferences
                      </Button>
                    </>
                  </li>
                  <li className="list-group-item text-center">
                    <>
                      <style type="text/css">
                        {`
                      .btn-flat1 {
                        background-color: #B22222;
                        color: white;
                      }
                      .btn-xxl1 {
                        left: 1rem;
                        font-size: 1rem;
                      }
                      `}
                      </style>
                      <Button
                        variant="flat1"
                        size="xxl1"
                        onClick={this.deleteProfile}
                      >
                        Delete Account
                      </Button>
                    </>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {firstName + " " + lastName}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{email}</div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{gender}</div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date of Birth</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{dob}</div>
                  </div>
                  <hr></hr>
                  {/* <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">Indore, M.P.</div>
                  </div> */}
                </div>
              </div>
              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3">
                        <i className="material-icons text-info mr-2">
                          Chat Messages
                        </i>
                      </h6>
                      {chatUserDisplay}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3">
                        <i className="material-icons text-info mr-2">
                          My Trips
                        </i>
                      </h6>
                      {yaar}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
