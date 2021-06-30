import axios from "axios";
//var FormData = require("form-data");
import FormData from "form-data";

class EditServices {
  saveUser(updateUser) {
    console.log(updateUser);
    return axios.post("http://localhost:8085/user/updatedetails", updateUser, {
      headers: {
        Authorization: localStorage.jwtToken,
        "Content-Type": "application/json",
      },
    });
  }

  // savePhoto(newphoto) {
  //   return axios.post("http://localhost:8085/user/savephoto", newphoto, {
  //     headers: {
  //       Authorization: localStorage.jwtToken,
  //       //"Content-Type": "application/json",
  //     },
  //   });
  // }

  savePhoto(newphoto) {
    var data = new FormData();
    data.append("image", newphoto);
    var config = {
      method: "post",
      url: "http://localhost:8085/user/savephoto",
      headers: {
        Authorization: localStorage.jwtToken,
      },
      data: data,
    };

    return axios(config);
  }
}

export default new EditServices();
