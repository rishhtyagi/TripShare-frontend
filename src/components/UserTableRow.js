import React from "react";
import { slideDown, slideUp } from "./Anime";
import "../assets/css/Style.css";
import { Container, Col, Row } from "react-bootstrap";
import "../services/ChatServices";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ChatServices from "../services/ChatServices";
class UserTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      open: false,
      messageobj: {
        toUserId: "",
        message: "",
      },
    };
  }
  toggleExpander = (e) => {
    if (e.target.type === "checkbox") return;

    if (!this.state.expanded) {
      this.setState({ expanded: true }, () => {
        if (this.refs.expanderBody) {
          slideDown(this.refs.expanderBody);
        }
      });
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => {
          this.setState({ expanded: false });
        },
      });
    }
  };
  handleChange = (value) => {
    this.setState(() => ({
      messageobj: {
        toUserId: this.props.trip.user.id,
        message: value,
      },
    }));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  sendMsg = (e) => {
    e.preventDefault();
    if (this.state.messageobj.message == "") {
      return;
    }
    let newmessage = {
      toUserId: this.state.messageobj.toUserId,
      message: this.state.messageobj.message,
    };
    console.log(this.state.messageobj);
    console.log(newmessage);
    ChatServices.sendMessage(newmessage).then((res) => {
      console.log(res.data);
      return this.props.history.push("/");
    });
    this.handleClose();
  };
  render() {
    const { trip } = this.props;
    const { open } = this.state;

    return [
      <tr key="main" onClick={this.toggleExpander}>
        {/* <td className="uk-text-nowrap text-white">{this.props.index}.</td> */}
        {/* <td>
          <img
            className="uk-preserve-width uk-border-circle text-white"
            src={user.picture.thumbnail}
            width={48}
            alt="avatar"
          />
        </td> */}
        <td>
          {trip.destination}
          <br />
          <small>{trip.landscape}</small>
        </td>
        <td>{trip.tripDate}</td>
        <td>
          {trip.user.firstName} {trip.user.lastName}
        </td>
      </tr>,
      this.state.expanded && (
        <tr className="expandable bg-dark" key="tr-expander">
          <td className="uk-background-muted text-white" colSpan={6}>
            <div ref="expanderBody" className="inner uk-grid text-white">
              <div className="uk-width-1-4 uk-text-center text-white">
                {/* <img
                  className="uk-preserve-width uk-border-circle text-white"
                  src={user.picture.large}
                  alt="avatar"
                /> */}
              </div>
              <Container>
                <Row>
                  <Col>
                    <h3>Trip Details:</h3>

                    <div className="text-white block-example border border-secondary w-50 p-2">
                      <p>
                        Description:
                        <br />
                        <i> {trip.description}</i>
                      </p>
                    </div>

                    <p>
                      Travel Budget: {trip.tripBudget}
                      <br />
                      Trip Length: {trip.tripLength}
                      <br />
                      Group Size: {trip.groupSize}
                    </p>
                  </Col>
                  <Col>
                    <h3>Host Details:</h3>

                    <p>
                      Host name:{" "}
                      <i>
                        {trip.user.firstName} {trip.user.lastName}
                      </i>
                      <br />
                      Host Age: <i>{trip.user.age}</i> <br />
                      Host gender:<i> {trip.user.gender}</i>
                    </p>
                    <div>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.handleClickOpen}
                      >
                        Have a conversation{" "}
                      </Button>
                      <Dialog
                        open={open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                      >
                        <DialogTitle id="form-dialog-title">
                          Message box
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Write a message to <i>{trip.user.firstName}</i>.
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="outlined-multiline-static"
                            placeholder="Hey There!"
                            label="Message"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            onChange={(event) =>
                              this.handleChange(event.target.value)
                            }
                            name="message"
                          />

                          {/* <Form.Group controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="textarea"
                      rows="9"
                      placeholder="Your expectations here..."
                      name="description"
                      value={description}
                      onChange={this.userChange}
                    />
                  </Form.Group> */}
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={this.handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={this.sendMsg} color="primary">
                            Send
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </td>
        </tr>
      ),
    ];
  }
}

export default UserTableRow;
