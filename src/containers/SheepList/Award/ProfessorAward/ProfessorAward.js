import React, { Component } from "react";

import { Card, ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap";

import ProfessorBronze from "../../../../assets/Awards/Professor_Bronze.png";
import ProfessorSilver from "../../../../assets/Awards/Professor_Silver.png";
import ProfessorGold from "../../../../assets/Awards/Professor_Gold.png";
import ProfessorExpert from "../../../../assets/Awards/Professor_Expert.png";
import NoAward from "../../../../assets/Awards/NoAward.png";

import classes from "../Award.module.css";

class professorAward extends Component {
  state = {
    awardName: "",
    awardImage: "",
    awardDescription: "",
    awardProgress: "",
    awardProgressFraction: "",
    limitOne: 2,
    limitTwo: 4,
    limitThree: 6,
    limitFour: 8,
  };
  componentDidMount() {
    this.initialiseState(this.props.createdQuizzes.length);
  }

  renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {this.state.awardProgressFraction}
      </Tooltip>
    );
  };

  initialiseState = (quizzesCreated) => {
    if (quizzesCreated < this.state.limitOne) {
      this.setState({
        awardName: "Professor Sheep 0",
        awardImage: NoAward,
        awardDescription: "Create 2 quizzes",
        awardProgress: (quizzesCreated / this.state.limitOne) * 100,
        awardProgressFraction: quizzesCreated + "/" + this.state.limitOne,
      });
    } else if (quizzesCreated < this.state.limitTwo) {
      this.setState({
        awardName: "Professor Sheep I",
        awardImage: ProfessorBronze,
        awardDescription: "Create 4 quizzes",
        awardProgress: (quizzesCreated / this.state.limitTwo) * 100,
        awardProgressFraction: quizzesCreated + "/" + this.state.limitTwo,
      });
    } else if (quizzesCreated < this.state.limitThree) {
      this.setState({
        awardName: "Professor Sheep II",
        awardImage: ProfessorSilver,
        awardDescription: "Create 6 quizzes",
        awardProgress: (quizzesCreated / this.state.limitThree) * 100,
        awardProgressFraction: quizzesCreated + "/" + this.state.limitThree,
      });
    } else if (quizzesCreated < this.state.limitFour) {
      this.setState({
        awardName: "Professor Sheep III",
        awardImage: ProfessorGold,
        awardDescription: "Create 8 quizzes",
        awardProgress: (quizzesCreated / this.state.limitFour) * 100,
        awardProgressFraction: quizzesCreated + "/" + this.state.limitFour,
      });
    } else {
      this.setState({
        awardName: "Professor IV",
        awardImage: ProfessorExpert,
        awardDescription: "Maximum tier attained!",
        awardProgress: 100,
        awardProgressFraction: quizzesCreated + "/" + this.state.limitFour,
      });
    }
  };
  render() {
    return (
      <div className={classes.Award}>
        <Card style={{ marginTop: "1rem" }}>
          <Card.Img variant="top" src={this.state.awardImage} />
          <Card.Body>
            <OverlayTrigger
              placement="top"
              delay={{ show: 100, hide: 100 }}
              overlay={this.renderTooltip}
            >
              <ProgressBar
                striped
                variant="success"
                now={+this.state.awardProgress}
              />
            </OverlayTrigger>
            <Card.Title style={{ textAlign: "center", marginTop: "0.5rem" }}>
              {this.state.awardName}
            </Card.Title>
            <Card.Text style={{ textAlign: "center", marginTop: "0.5rem" }}>
              {this.state.awardDescription}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default professorAward;
