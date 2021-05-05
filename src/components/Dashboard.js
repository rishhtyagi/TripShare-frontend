import React, { Component } from "react";
import { Button } from "react-bootstrap";
//import * from "../assets/css/"

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      description: "",
      gender: "",
      photoPath: "https://bootdey.com/img/Content/avatar/avatar7.png",
    };
    this.editProfile = this.editProfile.bind(this);
    this.createTrip = this.createTrip.bind(this);
    this.deleteProfile = this.deleteProfile.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
    localStorage.removeItem("newtripId");
  }

  componentDidMount() {
    this.findUserByUser();
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
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          gender: user.gender,
          dob: user.dob,
          description: user.description,
        });
        if (user.photoPath !== "")
          this.setState({
            photoPath: user.photoPath,
          });
      });
    return this.props.history.push("/dashboard");
  };

  createTrip() {
    return this.props.history.push("/createtrip");
  }

  deleteProfile() {
    return this.props.history.push("/deleteProfile");
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
    } = this.state;

    return (
      <div className="container">
        <div className="main-body">
          {/* <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">User</li>
              <li className="breadcrumb-item active" aria-current="page">
                User Profile
              </li>
            </ol>
          </nav> */}

          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={photoPath}
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    ></img>
                    <div className="mt-3">
                      <h4>{firstName}</h4>
                      <p className="text-secondary mb-1">{description}</p>
                      <p className="text-muted font-size-sm">Indore</p>
                      <button
                        className="btn btn-primary"
                        onClick={this.changePhoto}
                      >
                        Change Photo
                      </button>
                      {/* <button className="btn btn-outline-primary">
                        Message
                      </button> */}
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
                      .btn-flat {
                        background-color: black;
                        color: white;
                      }

                      .btn-xxl {
                        left: 1rem;
                        font-size: 1rem;
                      }
                      `}
                      </style>
                      <Button
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
                        variant="flat"
                        size="xxl1"
                        onClick={this.createTrip}
                      >
                        Create Trip
                      </Button>
                    </>
                  </li>
                  <li className="list-group-item text-center">
                    <>
                      <style type="text/css">
                        {`
                      .btn-flat1 {
                        background-color: red;
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
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">Indore, M.P.</div>
                  </div>
                </div>
              </div>
              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3">
                        <i className="material-icons text-info mr-2">
                          Feedback
                        </i>
                        Rating
                      </h6>
                      <small>Behaviour</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow="80"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <small>Friendly Nature</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow="72"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <small>Coopretative</small>
                      <div className="progress mb-3" style={{ height: "5px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow="89"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
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
                      <small>List of Trips</small>
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
