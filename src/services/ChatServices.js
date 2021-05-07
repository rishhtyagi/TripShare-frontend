import axios from "axios";

class ChatServices {
  sendMessage(messageobj) {
    return axios.post("http://localhost:8085/user/savemessage", messageobj, {
      headers: {
        Authorization: localStorage.jwtToken,
        "Content-Type": "application/json",
      },
    });
  }

  getChatUsers() {
    return axios.get("http://localhost:8085/user/getchatslist", {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    });
  }

  getChats(userId) {
    return axios.get("http://localhost:8085/user/getchats/" + userId, {
      headers: {
        Authorization: localStorage.jwtToken,
      },
    });
  }
}
export default new ChatServices();
