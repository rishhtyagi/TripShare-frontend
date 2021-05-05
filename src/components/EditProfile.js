import React, { Component } from "react";
import EditServices from "../services/EditServices";

//https://www.bootdey.com/snippets/view/account-setting-or-edit-profile#html

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.userChange = this.userChange.bind(this);
    this.updteProfile = this.updteProfile.bind(this);
    this.cancle = this.cancle.bind(this);
    localStorage.removeItem("newtripId");
  }

  initialState = {
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    description: "",
    gender: "",
    password: "",
  };

  componentDidMount() {
    this.findUserByUser();
  }

  findUserByUser = () => {
    fetch("http://localhost:8085/user/getdetails", {
      method: "get",
      headers: new Headers({
        Authorization: localStorage.jwtToken,
        "Content-Type": "application / json",
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
          password: user.password,
        });
      });
  };

  userChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  cancle() {
    return this.props.history.push("/dashboard");
  }

  updteProfile(e) {
    e.preventDefault();

    let updateUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      gender: this.state.gender,
      dob: this.state.dob,
      description: this.state.description,
      password: this.state.password,
    };
    console.log("updated user => " + JSON.stringify(updateUser));

    EditServices.saveUser(updateUser).then((response) => {
      console.log(response.data);
      this.setState({
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        email: updateUser.email,
        gender: updateUser.gender,
        dob: updateUser.dob,
        description: updateUser.description,
        password: updateUser.password,
      });
    });
  }

  render() {
    const {
      firstName,
      email,
      lastName,
      description,
      dob,
      gender,
      password,
    } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row gutters">
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="account-settings">
                    <div className="user-profile">
                      <h5 className="user-name">Update Profile</h5>
                      {/* <h6 className="user-email">yuki@Maxwell.com</h6> */}
                    </div>
                    {/* <div className="about">
                      <h5>About</h5>
                      <p>
                        I'm Yuki. Full Stack Designer I enjoy creating
                        user-centric, delightful and human experiences.
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
              <div className="card h-100">
                <div className="card-body">
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h6 className="mb-2 text-primary">Personal Details</h6>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="firstName"
                          value={firstName}
                          onChange={this.userChange}
                          placeholder="Enter first name"
                        ></input>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          name="lastName"
                          id="lastName"
                          value={lastName}
                          onChange={this.userChange}
                          placeholder="Enter last name"
                        ></input>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Email</label>
                        <input
                          autoComplete="off"
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          value={email}
                          // onChange={this.userChange}
                          //placeholder="Enter email ID"
                          disabled
                        ></input>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          name="description"
                          id="description"
                          value={description}
                          onChange={this.userChange}
                          placeholder="Enter Description"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      {/* <h6 className="mt-3 mb-2 text-primary">Address</h6> */}
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          autoComplete="off"
                          type="name"
                          className="form-control"
                          name="gender"
                          id="gender"
                          value={gender}
                          onChange={this.userChange}
                          placeholder="Enter Gender"
                        >
                          <option value="" defaultValue disabled hidden>
                            Choose Gender
                          </option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                          <option value="0">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          autoComplete="off"
                          type="date"
                          className="form-control"
                          name="dob"
                          id="dob"
                          value={dob}
                          onChange={this.userChange}
                          placeholder="Enter Date of Birth"
                        ></input>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          id="address"
                          placeholder="Enter Address"
                        ></input>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          autoComplete="off"
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          value={password}
                          onChange={this.userChange}
                          placeholder="Password"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="text-right">
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          onClick={this.cancle}
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>{" "}
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          onClick={this.updteProfile}
                          className="btn btn-primary"
                        >
                          Update
                        </button>
                      </div>
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

export default EditProfile;
