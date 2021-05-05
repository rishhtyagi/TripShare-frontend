import axios from "axios";

class RegisterServices {
  createUser(user) {
    console.log("service " + user.firstName);
    return axios.post("http://localhost:8085/registration", user);
  }

  deleteUser() {
    console.log(localStorage.getItem("jwtToken"));
    return axios.post("http://localhost:8085/user/delete", {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    });
  }
}

export default new RegisterServices();
