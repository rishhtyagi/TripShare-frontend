import React, { Component } from "react";
import RegisterServices from "../services/RegisterServices";

class DeleteProfile extends Component {
  constructor(props, context) {
    super(props, context);
    this.deleteaccount = this.deleteaccount.bind(this);
    this.backtoDashboardService = this.backtoDashboardService.bind(this);
  }

  deleteaccount = () => {
    RegisterServices.deleteUser().then((response) => {
      console.log(response.data);
    });
    localStorage.removeItem("jwtToken");
    return this.props.history.push("/");
  };

  backtoDashboardService() {
    return this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div>
        {" "}
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center text-danger">
            {" "}
            Delete Account Permanently!!!
          </h3>
          <div className="card-body text-center">
            <p>
              Deleting this account will remove all your personal information,
              your trips information and chats permanently.
            </p>
            <br />
            <p>Are you sure you want to continue??</p>

            <button
              style={{ marginLeft: "10px" }}
              onClick={this.backtoDashboardService}
              className="btn btn-info"
            >
              No, take me back{" "}
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={this.deleteaccount}
              className="btn btn-danger"
            >
              Yes, delete my account{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteProfile;
