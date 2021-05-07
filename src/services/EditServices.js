import axios from "axios";

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

  savePhoto(newphoto) {
    return axios.post("http://localhost:8085/user/savephoto", newphoto, {
      headers: {
        Authorization: localStorage.jwtToken,
        "Content-Type": "application/json",
      },
    });
  }
}

export default new EditServices();
