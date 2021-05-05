import React, { Component } from "react";

class ChangePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: localStorage.getItem("photoPath"),
    };
    localStorage.removeItem("photoPath");

    this.handleChange = this.handleChange.bind(this);
    this.backtoDashboardService = this.backtoDashboardService.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
  }

  handleChange(event) {
    console.log(event.target.files[0]);
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
    console.log(this.state.file);
  }

  changePhoto() {}
  backtoDashboardService() {
    return this.props.history.push("/dashboard");
  }
  render() {
    return (
      <div>
        {" "}
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <br />
          <br />
          <h3 className="text-center text-dark"> Change Your Profile Photo</h3>
          <div className="card-body text-center">
            <input type="file" onChange={this.handleChange} />
            <br />
            <br />
            <img src={this.state.file} className="rounded-circle" width="150" />
            <br />
            <br />
            <button
              style={{ marginLeft: "10px" }}
              onClick={this.changePhoto}
              className="btn btn-info"
            >
              Change Photo{" "}
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={this.backtoDashboardService}
              className="btn btn-danger"
            >
              Cancel{" "}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePhoto;
