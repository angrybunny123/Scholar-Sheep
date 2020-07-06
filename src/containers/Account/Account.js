import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Col, Row } from "react-bootstrap";

import classes from "./Account.module.css";
// import QuickLinks from "../../components/Account/QuickLinks/QuickLinks";

import CreatedQuizzesTable from "../../components/Account/AccountTable/createdQuizzesTable";
import QuizHistoryTable from "../../components/Account/AccountTable/quizHistoryTable";
import BroadHorizonsAward from "../../components/Account/Award/BroadHorizonsAward/BroadHorizonsAward";
import HardWorkerAward from "../../components/Account/Award/HardWorkerAward/HardWorkerAward";
import ProfessorAward from "../../components/Account/Award/ProfessorAward/ProfessorAward";
import ScholarSheepAward from "../../components/Account/Award/ScholarSheepAward/ScholarSheepAward";
import AwardInfo from "../../components/Account/Award/AwardInfo/AwardInfo";
import * as actions from "../../store/actions/index";

import Topics from "../../components/Topics/Topics";

import Profile from "../../components/Account/Profile/Profile";
import Spinner from "../../components/UI/Spinner/Spinner";
import categories from "../../components/Topics/TopicsList";

class Account extends Component {
  state = {
    showAllQuizzes: false,
    showAwardInfo: false,
    quizHistoryLength: 0,
  };
  componentDidMount() {
    this.props.onFetchUserData(
      localStorage.getItem("token"),
      localStorage.getItem("userId")
    );
    this.props.onFetchUserQuizzes(
      localStorage.getItem("token"),
      localStorage.getItem("userId")
    );
  }

  render() {
    let url = (
      <div className="sticky-top">
        <Profile />
      </div>
    );
    let awards = (
      <div className={classes.Profile}>
        <Spinner />
        <p style={{ textAlign: "center" }}>Loading Awards...</p>
      </div>
    );
    let showAwardInfoToggleButton = (
      <div className="text-right">
        <button
          className={classes.buttons}
          onClick={() => {
            this.setState({
              showAwardInfo: true,
            });
          }}
        >
          >>More about awards
        </button>
      </div>
    );
    let awardInfo = null;
    if (this.state.showAwardInfo === true) {
      showAwardInfoToggleButton = (
        <div className="text-right">
          <button
            className={classes.buttons}
            onClick={() => {
              this.setState({
                showAwardInfo: false,
              });
            }}
          >
            >>Show less
          </button>
        </div>
      );
      awardInfo = <AwardInfo />;
    }
    if (this.props.loading) {
      url = (
        <div className={classes.Profile}>
          <Spinner />
          <p style={{ textAlign: "center" }}>Uploading image...</p>
        </div>
      );
    }

    if (!this.props.fetchDataLoading && !this.props.fetchQuizzesLoading) {
      awards = (
        <Container>
          <div className={classes.header}>Awards</div>
          <Row>
            <Col className="col-md-3 col-sm-6 col-6">
              <BroadHorizonsAward />
            </Col>
            <Col className="col-md-3 col-sm-6 col-6">
              <HardWorkerAward />
            </Col>
            <Col className="col-md-3 col-sm-6 col-6">
              <ProfessorAward />
            </Col>
            <Col className="col-md-3 col-sm-6 col-6">
              <ScholarSheepAward />
            </Col>
          </Row>
          {awardInfo}
          {showAwardInfoToggleButton}
        </Container>
      );
    }

    if (this.props.userData.url != null) {
      url = (
        <div className="sticky-top">
          <Profile />
        </div>
      );
    }

    if (this.props.error !== "") {
      url = (
        <div className="sticky-top">
          Sorry, {this.props.error} :(
          <p>Refresh the page and try again!</p>
        </div>
      );
    }

    // DATA ANALYTICS PART
    let counts = {};
    let topics = ["Animals", "Math", "Sports", "Movies"];
    const quizHistory = this.props.userData.quizHistory;

    if (quizHistory !== undefined) {
      for (var i = 0; i < quizHistory.length; i++) {
        const topic = quizHistory[i].category;
        if (counts[topic] === undefined) {
          counts[topic] = 1;
        } else {
          counts[topic] = counts[topic] + 1;
        }
      }
      const entries = Object.entries(counts);
      //ONLY GIVE RECOMMENDED QUIZZES IF GOT MORE THAN OR EQUAL TO 4 DIFFERENT TOPICS ATTEMPTED
      if (entries.length >= 4) {
        topics = entries
          .sort((a, b) => (a[1] > b[1] ? -1 : 1))
          .slice(0, 4)
          .map((x) => x[0]);
      }
    }
    // END OF DATA ANALYTICS PART
    let showAllQuizzesToggleButton = (
      <button
        className={classes.buttons}
        onClick={() => {
          this.setState({
            showAllQuizzes: true,
          });
        }}
      >
        >>View all available quiz topics
      </button>
    );

    if (this.state.showAllQuizzes === true) {
      topics = categories;

      showAllQuizzesToggleButton = (
        <button
          className={classes.buttons}
          onClick={() => {
            this.setState({
              showAllQuizzes: false,
            });
          }}
        >
          >>View recommended topics
        </button>
      );
    }

    return (
      <div>
        <Container fluid>
          <Row>
            {/* profile sidebar */}
            <Col
              className="col-md-3 col-sm-4 col-12"
              style={{ backgroundColor: "lightblue" }}
            >
              {url}
            </Col>
            {/* everything else */}
            <Col className="col-md-9 col-sm-8 col-12">
              <div className={classes.Account}>
                {awards}
                <Container>
                  <div className={classes.header}>Quiz topics for you!</div>
                  <Row>
                    {topics.map((topic) => {
                      return (
                        <Col className="col-md-3 col-sm-6 col-6">
                          <Topics topic={topic} />
                        </Col>
                      );
                    })}
                  </Row>
                  <div className="text-right">{showAllQuizzesToggleButton}</div>
                </Container>
                <Container>
                  <div className={classes.header}>Quiz History</div>
                  <QuizHistoryTable quizzes={this.props.userData.quizHistory} />
                </Container>
                <Container>
                  <div className={classes.header}>Quizzes Created</div>
                  <CreatedQuizzesTable quizzes={this.props.createdQuizzes} />
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.account.userData,
    quizzes: state.quizzes.quizzes,
    loading: state.account.loading,
    fetchDataLoading: state.account.fetchDataLoading,
    fetchQuizzesLoading: state.account.quizzesLoading,
    error: state.account.error,
    createdQuizzes: state.account.createdQuizzes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserData: (token, userId) =>
      dispatch(actions.fetchUserData(token, userId)),
    onFetchUserQuizzes: (token, userId) =>
      dispatch(actions.fetchUserQuizzes(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
