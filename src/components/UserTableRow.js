import React from "react";
import { slideDown, slideUp } from "./Anime";
import "../assets/css/Style.css";
import { Container, Col, Row } from "react-bootstrap";

class UserTableRow extends React.Component {
  state = { expanded: false };

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

  render() {
    const { trip } = this.props;
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
