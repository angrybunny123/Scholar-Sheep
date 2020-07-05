import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap";

import HardWorkerBronze from "../../../../assets/Awards/Hardworker_Bronze.png";
import HardWorkerSilver from "../../../../assets/Awards/Hardworker_Silver.png";
import HardWorkerGold from "../../../../assets/Awards/Hardworker_Gold.png";
import HardWorkerExpert from "../../../../assets/Awards/Hardworker_Expert.png";

class hardWorkerAward extends Component {
  state = {
    awardName: "",
    awardImage: "",
    awardDescription: "",
    awardProgress: "",
    awardProgressFraction: "",
    limitOne: 10,
    limitTwo: 30,
    limitThree: 60,
    limitFour: 100,
  };
  componentDidMount() {
    if (this.props.userData.quizHistory === undefined) {
      this.initialiseState(0);
    } else {
      let dailyQuizCount = 0;
      for (let i = 0; i < this.props.userData.quizHistory.length; i++) {
        if (this.props.userData.quizHistory[i].dailyQuiz) {
          dailyQuizCount += 1;
        }
      }
      this.initialiseState(dailyQuizCount);
    }
  }
  renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {this.state.awardProgressFraction}
      </Tooltip>
    );
  };

  initialiseState = (dailyQuizzesAttempted) => {
    if (dailyQuizzesAttempted < this.state.limitOne) {
      this.setState({
        awardName: "Hard Worker I",
        awardImage: HardWorkerBronze,
        awardDescription: "Do 10 Daily Quizzes",
        awardProgress: (dailyQuizzesAttempted / this.state.limitOne) * 100,
        awardProgressFraction:
          dailyQuizzesAttempted + "/" + this.state.limitOne,
      });
    } else if (dailyQuizzesAttempted < this.state.limitTwo) {
      this.setState({
        awardName: "Hard Worker II",
        awardImage: HardWorkerSilver,
        awardDescription: "Do 30 Daily Quizzes",
        awardProgress: (dailyQuizzesAttempted / this.state.limitTwo) * 100,
        awardProgressFraction:
          dailyQuizzesAttempted + "/" + this.state.limitTwo,
      });
    } else if (dailyQuizzesAttempted < this.state.limitThree) {
      this.setState({
        awardName: "Hard Worker III",
        awardImage: HardWorkerGold,
        awardDescription: "Do 60 Daily Quizzes",
        awardProgress: (dailyQuizzesAttempted / this.state.limitThree) * 100,
        awardProgressFraction:
          dailyQuizzesAttempted + "/" + this.state.limitThree,
      });
    } else if (dailyQuizzesAttempted < this.state.limitFour) {
      this.setState({
        awardName: "Hard Worker IV",
        awardImage: HardWorkerExpert,
        awardDescription: "Do 100 Daily Quizzes",
        awardProgress: (dailyQuizzesAttempted / this.state.limitFour) * 100,
        awardProgressFraction:
          dailyQuizzesAttempted + "/" + this.state.limitFour,
      });
    } else {
      this.setState({
        awardName: "Hard Worker IV",
        awardImage: HardWorkerExpert,
        awardDescription: "Do 100 Daily Quizzes",
        awardProgress: 100,
        awardProgressFraction:
          dailyQuizzesAttempted + "/" + this.state.limitFour,
      });
    }
  };
  render() {
    return (
      <div>
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

export default connect(mapStateToProps)(hardWorkerAward);
