import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, ProgressBar, OverlayTrigger, Tooltip } from "react-bootstrap";

import BroadHorizonsBronze from "../../../../assets/Awards/BroadHorizon_Bronze.png";
import BroadHorizonsSilver from "../../../../assets/Awards/BroadHorizon_Silver.png";
import BroadHorizonsGold from "../../../../assets/Awards/BroadHorizon_Gold.png";
import BroadHorizonsExpert from "../../../../assets/Awards/BroadHorizon_Expert.png";
import NoAward from "../../../../assets/Awards/NoAward.png";

import classes from "../Award.module.css";

class broadHorizonsAward extends Component {
  state = {
    awardName: "",
    awardImage: "",
    awardDescription: "",
    awardProgress: "",
    awardProgressFraction: "",
    limitOne: 25,
    limitTwo: 100,
    limitThree: 250,
    limitFour: 500,
  };
  componentDidMount() {
    if (this.props.userData.quizHistory === undefined) {
      this.initialiseState(0);
    } else {
      this.initialiseState(this.props.userData.quizHistory.length);
    }
  }
  renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {this.state.awardProgressFraction}
      </Tooltip>
    );
  };

  initialiseState = (quizzesAttempted) => {
    if (quizzesAttempted < this.state.limitOne) {
      this.setState({
        awardName: "Broad Horizons 0",
        awardImage: NoAward,
        awardDescription: "Attempt 25 quizzes",
        awardProgress: (quizzesAttempted / this.state.limitOne) * 100,
        awardProgressFraction: quizzesAttempted + "/" + this.state.limitOne,
      });
    } else if (quizzesAttempted < this.state.limitTwo) {
      this.setState({
        awardName: "Broad Horizons I",
        awardImage: BroadHorizonsBronze,
        awardDescription: "Attempt 100 quizzes",
        awardProgress: (quizzesAttempted / this.state.limitTwo) * 100,
        awardProgressFraction: quizzesAttempted + "/" + this.state.limitTwo,
      });
    } else if (quizzesAttempted < this.state.limitThree) {
      this.setState({
        awardName: "Broad Horizons II",
        awardImage: BroadHorizonsSilver,
        awardDescription: "Attempt 250 quizzes",
        awardProgress: (quizzesAttempted / this.state.limitThree) * 100,
        awardProgressFraction: quizzesAttempted + "/" + this.state.limitThree,
      });
    } else if (quizzesAttempted < this.state.limitFour) {
      this.setState({
        awardName: "Broad Horizons III",
        awardImage: BroadHorizonsGold,
        awardDescription: "Attempt 500 quizzes",
        awardProgress: (quizzesAttempted / this.state.limitFour) * 100,
        awardProgressFraction: quizzesAttempted + "/" + this.state.limitFour,
      });
    } else {
      this.setState({
        awardName: "Broad Horizons IV",
        awardImage: BroadHorizonsExpert,
        awardDescription: "Maximum tier attained!",
        awardProgress: 100,
        awardProgressFraction: quizzesAttempted + "/" + this.state.limitFour,
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

export default connect(mapStateToProps)(broadHorizonsAward);
