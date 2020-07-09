import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap";

import ScholarSheepBronze from "../../../../assets/Awards/Scholarsheep_Bronze.png";
import ScholarSheepSilver from "../../../../assets/Awards/Scholarsheep_Silver.png";
import ScholarSheepGold from "../../../../assets/Awards/Scholarsheep_Gold.png";
import ScholarSheepExpert from "../../../../assets/Awards/Scholarsheep_Expert.png";
import NoAward from "../../../../assets/Awards/NoAward.png";

import classes from "../Award.module.css";

class scholarSheepAward extends Component {
  state = {
    awardName: "",
    awardImage: "",
    awardDescription: "",
    awardProgress: "",
    awardProgressFraction: "",
    limitOne: 4,
    limitTwo: 8,
    limitThree: 12,
    limitFour: 16,
  };
  componentDidMount() {
    if (this.props.userData.quizHistory === undefined) {
      this.initialiseState(0);
    } else {
      let fullMarkQuizzesCount = 0;
      for (let i = 0; i < this.props.userData.quizHistory.length; i++) {
        if (
          this.props.userData.quizHistory[i].questionNumber ===
          this.props.userData.quizHistory[i].score
        ) {
          fullMarkQuizzesCount += 1;
        }
      }
      this.initialiseState(fullMarkQuizzesCount);
    }
  }

  renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {this.state.awardProgressFraction}
      </Tooltip>
    );
  };

  initialiseState = (fullMarkQuizzes) => {
    if (fullMarkQuizzes < this.state.limitOne) {
      this.setState({
        awardName: "Scholar Sheep 0",
        awardImage: NoAward,
        awardDescription: "Get full marks for 4 quizzes",
        awardProgress: (fullMarkQuizzes / this.state.limitOne) * 100,
        awardProgressFraction: fullMarkQuizzes + "/" + this.state.limitOne,
      });
    } else if (fullMarkQuizzes < this.state.limitTwo) {
      this.setState({
        awardName: "Scholar Sheep I",
        awardImage: ScholarSheepBronze,
        awardDescription: "Get full marks for 8 quizzes",
        awardProgress: (fullMarkQuizzes / this.state.limitTwo) * 100,
        awardProgressFraction: fullMarkQuizzes + "/" + this.state.limitTwo,
      });
    } else if (fullMarkQuizzes < this.state.limitThree) {
      this.setState({
        awardName: "Scholar Sheep II",
        awardImage: ScholarSheepSilver,
        awardDescription: "Get full marks for 12 quizzes",
        awardProgress: (fullMarkQuizzes / this.state.limitThree) * 100,
        awardProgressFraction: fullMarkQuizzes + "/" + this.state.limitThree,
      });
    } else if (fullMarkQuizzes < this.state.limitFour) {
      this.setState({
        awardName: "Scholar Sheep III",
        awardImage: ScholarSheepGold,
        awardDescription: "Get full marks for 16 quizzes",
        awardProgress: (fullMarkQuizzes / this.state.limitFour) * 100,
        awardProgressFraction: fullMarkQuizzes + "/" + this.state.limitFour,
      });
    } else {
      this.setState({
        awardName: "Scholar Sheep IV",
        awardImage: ScholarSheepExpert,
        awardDescription: "Maximum tier attained!",
        awardProgress: 100,
        awardProgressFraction: fullMarkQuizzes + "/" + this.state.limitFour,
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

const mapStateToProps = (state) => {
  return {
    userData: state.account.userData,
  };
};

export default connect(mapStateToProps)(scholarSheepAward);
