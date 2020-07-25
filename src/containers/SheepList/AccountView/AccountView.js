import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../../axios-scholarsheep";

import { Container, Col, Row } from "react-bootstrap";

import classes from "./AccountView.module.css";
// import QuickLinks from "../../components/Account/QuickLinks/QuickLinks";

import BroadHorizonsAward from "../Award/BroadHorizonsAward/BroadHorizonsAward";
import HardWorkerAward from "../Award/HardWorkerAward/HardWorkerAward";
import ProfessorAward from "../Award/ProfessorAward/ProfessorAward";
import ScholarSheepAward from "../Award/ScholarSheepAward/ScholarSheepAward";
import AwardInfo from "../Award/AwardInfo/AwardInfo";

import Profile from "../Profile/Profile";
import Spinner from "../../../components/UI/Spinner/Spinner";

class Account extends Component {
  state = {
    userData: "",
    loading: false,
    quizzesLoading: false,
    quizzes: [],
    showAwardInfo: false,
  };
  componentDidMount() {
    this.setState(
      {
        loading: true,
        quizzesLoading: true,
      },
      () => {
        axios
          .get("/userdata/" + this.props.userId + ".json")
          .then((res) => {
            this.setState({
              loading: false,
              userData: res.data,
            });
          })
          .catch((err) => {
            this.setState({
              loading: false,
              error: err.message,
            });
          });
      }
    );
    axios
      .get("/quizzes.json")
      .then((res) => {
        this.setState({
          quizzesLoading: false,
          quizzes: Object.values(res.data),
        });
      })
      .catch((err) => {
        this.setState({
          quizzesLoading: false,
          error: err.message,
        });
      });
  }

  render() {
    console.log(this.state.quizzes);
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
    let profile = <Spinner />;

    if (!this.state.loading && !this.state.quizzesLoading) {
      const quizzes = this.state.quizzes.filter(
        (quiz) => quiz.userId === this.state.userData.userId
      );
      console.log(quizzes);
      awards = (
        <Container>
          <div className={classes.header}>Awards</div>
          <Row>
            <Col className="col-md-3 col-sm-6 col-6">
              <BroadHorizonsAward userData={this.state.userData} />
            </Col>
            <Col className="col-md-3 col-sm-6 col-6">
              <HardWorkerAward userData={this.state.userData} />
            </Col>
            <Col className="col-md-3 col-sm-6 col-6">
              <ProfessorAward createdQuizzes={quizzes} />
            </Col>
            <Col className="col-md-3 col-sm-6 col-6">
              <ScholarSheepAward userData={this.state.userData} />
            </Col>
          </Row>
          {awardInfo}
          {showAwardInfoToggleButton}
        </Container>
      );
      profile = (
        <Profile userData={this.state.userData} createdQuizzes={quizzes} />
      );
    }

    let page = (
      <div>
        <Container fluid>
          <Row>
            <Col
              className="col-md-3 col-sm-4 col-12"
              style={{ backgroundColor: "lightblue", paddingBottom: "15rem" }}
            >
              {profile}
            </Col>
            <Col className="col-md-9 col-sm-8 col-12">
              <div className={classes.Account}>{awards}</div>
            </Col>
          </Row>
        </Container>
      </div>
    );

    if (this.state.loading || this.state.quizzesLoading) {
      page = <Spinner />;
    }

    return page;
  }
}

export default Account;
