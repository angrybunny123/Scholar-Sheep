import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, Col, Row } from "react-bootstrap";

import classes from "./Account.module.css";
// import QuickLinks from "../../components/Account/QuickLinks/QuickLinks";

import CreatedQuizzesTable from "../../components/Account/AccountTable/createdQuizzesTable";
import QuizHistoryTable from "../../components/Account/AccountTable/quizHistoryTable";
import Award from "../../components/Account/Award/Award";
import * as actions from "../../store/actions/index";

import Topics from "../../components/Topics/Topics";

import Profile from "../../components/Account/Profile/Profile";
import Spinner from "../../components/UI/Spinner/Spinner";
import categories from "../../components/Topics/TopicsList";

import Kenneth from "../../assets/kenneth.jpg";

class Account extends Component {
  state = {
    showAllQuizzes: false,
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

  changeTopics = (topics) => {
    this.setState({
      topics: topics,
    });
  };

  render() {
    let url = (
      <div className="sticky-top">
        <Profile />
      </div>
    );
    if (this.props.loading) {
      url = (
        <div className={classes.Profile}>
          <Spinner />
          <p style={{ textAlign: "center" }}>Uploading image...</p>
        </div>
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
                <Container>
                  <div className={classes.header}>Awards</div>
                  <Row>
                    <Col className="col-md-3 col-sm-6 col-6">
                      <Award
                        awardimage={Kenneth}
                        awardname="kenneth"
                        awarddesc="hello"
                      />
                    </Col>
                    <Col className="col-md-3 col-sm-6 col-6">
                      <Award
                        awardimage={Kenneth}
                        awardname="kenneth"
                        awarddesc="hello"
                      />
                    </Col>
                    <Col className="col-md-3 col-sm-6 col-6">
                      <Award
                        awardimage={Kenneth}
                        awardname="kenneth"
                        awarddesc="hello"
                      />
                    </Col>
                    <Col className="col-md-3 col-sm-6 col-6">
                      <Award
                        awardimage={Kenneth}
                        awardname="kenneth"
                        awarddesc="hello"
                      />
                    </Col>
                  </Row>
                  <div className="text-right">
                    <button className={classes.buttons}>
                      >>View all achievements
                    </button>
                  </div>
                </Container>
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
    loading: state.account.loading,
    error: state.account.error,
    createdQuizzes: state.account.createdQuizzes,
    // quizzesLoading: state.account.quizzesLoading, can be used to indicate loading when quizzes are being loaded.
    // quizzesError: state.account.quizzesError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserData: (token, userId) =>
      dispatch(actions.fetchUserData(token, userId)),
    onUpdateUserData: (userData) => dispatch(actions.updateUserData(userData)),
    onFetchUserQuizzes: (token, userId) =>
      dispatch(actions.fetchUserQuizzes(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
