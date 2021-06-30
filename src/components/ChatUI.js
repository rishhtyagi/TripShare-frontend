import { Button, Card } from "react-bootstrap";
import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import ChatServices from "../services/ChatServices";
import "../assets/css/Style.css";
// import { Card } from "material-ui";

class ChatUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currUserId: this.props.match.params.id,
      currChatUser: {
        id: "",
        name: "",
      },
      messageobj: {
        toUserId: "",
        message: "",
      },
      chatUsers: [
        // {
        //   id: "1",
        //   firstName: "Johnny",
        //   lastName: "Depp",
        //   email: "j@d.com",
        //   password: "123",
        //   gender: "male",
        //   dob: "22/11/1997",
        //   description: "iiitb",
        //   // photoPath: "",
        // },
        // {
        //   id: "2",
        //   firstName: "Leonardo",
        //   lastName: "Dicaprio",
        //   email: "l@d.com",
        //   password: "123",
        //   gender: "male",
        //   dob: "12/34/1975",
        //   description: "iiitb",
        //   // photoPath: "",
        // },
        // {
        //   id: "4",
        //   firstName: "Dwight",
        //   lastName: "Shrute",
        //   email: "j@d.com",
        //   password: "123",
        //   gender: "male",
        //   dob: "22/11/1997",
        //   description: "iiitb",
        //   // photoPath: "",
        // },
      ],
      chatMessages: [],
      // chatMessages: [
      //   {
      //     fromUser: {
      //       id: "4",
      //     },
      //     toUser: {
      //       id: "3",
      //     },
      //     message: "Hey!",
      //     msgTimestamp: "1",
      //   },
      //   {
      //     fromUser: {
      //       id: "3",
      //     },
      //     toUser: {
      //       id: "4",
      //     },
      //     message: "Hi!",
      //     msgTimestamp: "2",
      //   },
      // ],
    };
    this.showUserChat = this.showUserChat.bind(this);
  }

  componentDidMount() {
    ChatServices.getChatUsers().then((res) => {
      console.log(res.data);
      this.setState({
        chatUsers: res.data,
        isDemoChat: false,
      });
    });
  }

  refreshChat = () => {
    ChatServices.getChats(this.state.currChatUser.id).then((res) => {
      this.setState(
        {
          chatMessages: res.data,
        },
        console.log(res.data[0].fromUser.id)
      );
    });
    console.log("curr user -> " + this.state.currUserId);
  };

  showUserChat = (chatUser) => {
    var name = chatUser.firstName + " " + chatUser.lastName;
    var id = chatUser.id;
    // show name on chat panel
    document.getElementById("otherUserName").innerHTML = name;

    // set msgtosend object user id
    this.setState(
      {
        messageobj: {
          toUserId: id,
          message: "",
        },
        currChatUser: {
          id: id,
          name: name,
        },
      },
      () => {
        console.log(this.state.messageobj);
        console.log(this.state.currChatUser);
      },
      // send get
      ChatServices.getChats(chatUser.id)
        .then((res) => {
          this.setState(
            {
              chatMessages: res.data,
            },
            console.log(res.data[0].fromUser.id)
          );
        })
        .then(() => {
          console.log(this.state.chatMessages);
          console.log(this.state.chatMessages[0].fromUser.id);
        })
    );
    console.log("curr user -> " + this.state.currUserId);
  };

  handleChange = (value) => {
    this.setState(() => ({
      messageobj: {
        toUserId: this.state.messageobj.toUserId,
        message: value,
      },
    }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  sendMsg = (e) => {
    e.preventDefault();
    if (this.state.messageobj.message == "") {
      return;
    }
    let messageobj = {
      toUserId: this.state.messageobj.toUserId,
      message: this.state.messageobj.message,
    };
    console.log(this.state.messageobj);
    ChatServices.sendMessage(this.state.messageobj).then((res) => {
      console.log(res);
      document.getElementById("chatBox").value = "";
      this.refreshChat();
    });
  };

  render() {
    const { chatUsers, chatMessages } = this.state;
    return (
      <div>
        <div className="container">
          <div className="main-body">
            <div className="row gutters-sm">
              <div className="col-md-5 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="mt-3">
                        <h4 className="mb-4">My Messages</h4>
                        <p className="text-secondary mb-4 ">
                          People who tried to contact you-{" "}
                        </p>
                      </div>
                    </div>
                    {chatUsers.map((chatUser) => (
                      <div key={chatUser.id}>
                        <div className="row">
                          <div className="col-sm-8">
                            <h6 className="mb-0">
                              <i className="material-icons text-info mr-2">
                                {chatUser.firstName} {chatUser.lastName}
                              </i>
                            </h6>
                          </div>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => {
                              this.showUserChat(chatUser);
                            }}
                          >
                            Messages
                          </Button>
                        </div>
                        <hr></hr>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="chat col-md-7">
                <div className="card mb-6">
                  <div className="card-body" id="chatsdisplay">
                    <div className="row">
                      <div className="col-lg-8">
                        <h5 className="mb-4">
                          <i
                            className="material-icons text-info mr-2"
                            id="otherUserName"
                          >
                            Please select a user to see messages.
                          </i>
                        </h5>
                      </div>
                    </div>
                    {chatMessages.map((chatMessage) => (
                      <div key={chatMessage.msgTimestamp}>
                        {this.state.currUserId == chatMessage.fromUser.id ? (
                          <div className="row">
                            {" "}
                            <div className="col-6"> </div>
                            <div className="col-6 text-right">
                              <Card bg="info" text="light">
                                <Card.Body>{chatMessage.message}</Card.Body>
                              </Card>
                              <h6 className="mb-0 col-sm text-secondary">
                                You{" "}
                              </h6>
                            </div>
                          </div>
                        ) : (
                          <div className="row">
                            {" "}
                            <div className="col-6 text-left">
                              <Card bg="primary" text="light">
                                <Card.Body>{chatMessage.message}</Card.Body>
                              </Card>
                              <h6 className="mb-0 col-sm text-secondary">
                                User{" "}
                              </h6>
                            </div>
                            <div className="col-6 text-right"></div>
                          </div>
                        )}
                      </div>
                    ))}
                    <hr></hr>
                    <div className="row">
                      <div className="col">
                        <TextField
                          autoFocus
                          margin="dense"
                          id="chatBox"
                          placeholder="Message "
                          label="Write a message here"
                          multiline
                          rows={1}
                          variant="outlined"
                          fullWidth
                          onChange={(event) =>
                            this.handleChange(event.target.value)
                          }
                          name="message"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={this.sendMsg}
                      >
                        Send
                      </Button>
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

export default ChatUI;
