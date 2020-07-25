import React, { Component } from "react";
import {
  Container,
  Row,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import classes from "./Profile.module.css";
import cuteSheep from "../../../assets/cutesheep1.jpg";

class Profile extends Component {
  render() {
    const renderTooltip = (props) => {
      return (
        <Tooltip id="button-tooltip" {...props}>
          Sheep points can be earned through attempting and creating quizzes.
          They can also be earned through attaining awards!
        </Tooltip>
      );
    };

    let profilePicURL = cuteSheep;

    if (this.props.userData.url != null) {
      profilePicURL = this.props.userData.url;
    }

    let attempted = (
      <Row className={classes.profileDescription}>Attempted: 0</Row>
    );
    if (this.props.userData.quizHistory) {
      attempted = (
        <Row className={classes.profileDescription}>
          Attempted: {this.props.userData.quizHistory.length}
        </Row>
      );
    }
    let created = <Row className={classes.profileDescription}>Created: 0</Row>;
    if (this.props.createdQuizzes) {
      created = (
        <Row className={classes.profileDescription}>
          Created: {this.props.createdQuizzes.length}
        </Row>
      );
    }

    return (
      <div className={classes.Profile}>
        <Container>
          <Row className="justify-content-center">
            <Image
              src={profilePicURL}
              roundedCircle
              className={classes.displaypic}
            />
          </Row>
          <br />
          <Row className={classes.username}>
            @{this.props.userData.username}
          </Row>
          <Row className={classes.profileDescription}>
            Sheep Points: {Math.round(this.props.userData.sheepPoints)}
            <OverlayTrigger
              placement="right"
              delay={{ show: 100, hide: 100 }}
              overlay={renderTooltip}
            >
              <div className={classes.questionMark}>?</div>
            </OverlayTrigger>
          </Row>
          {attempted}
          {created}

          <Row className={classes.profileDescription}>
            Joined: {this.props.userData.dateJoined}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Profile;
