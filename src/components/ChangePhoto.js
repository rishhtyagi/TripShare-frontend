import React, { Component } from "react";
import EditServices from "../services/EditServices";

class ChangePhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file:
        `http://localhost:8085/userphotos/` + localStorage.getItem("photoPath"),
      data: "",
    };
    localStorage.removeItem("photoPath");

    this.handleChange = this.handleChange.bind(this);
    this.backtoDashboardService = this.backtoDashboardService.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
  }

  handleChange(event) {
    var fileList = document.getElementById("image").files;
    var data = new FormData();
    data.append("image", fileList[0]);

    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      data: fileList[0],
    });
  }

  changePhoto() {
    EditServices.savePhoto(this.state.data).then((res) => {
      console.log(res.data);
      return this.props.history.push("/dashboard");
    });
  }

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
            <input
              type="file"
              name="image"
              accept=".jpg"
              id="image"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <img
              src={this.state.file}
              className="rounded-circle"
              width="150"
              alt="No Preview"
            />
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
