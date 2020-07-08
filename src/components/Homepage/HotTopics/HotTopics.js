import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import axios from "../../../axios-scholarsheep";

import classes from "./HotTopic.module.css";
import Topics from "../../Topics/Topics2";
import Spinner from "../../UI/Spinner/Spinner";

import SheepRankings from "../SheepRankings/SheepRankings";

class hotTopics extends Component {
  state = {
    loading: false,
    topicsLoading: false,
    userDataArray: [],
    quizzes: [],
    error: "",
    topicsError: "",
  };
  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      () => {
        axios
          .get("/userdata.json")
          .then((res) => {
            this.setState({
              loading: false,
              userDataArray: Object.values(res.data),
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
    this.setState(
      {
        topicsLoading: true,
      },
      () => {
        axios
          .get("/quizzes.json")
          .then((res) => {
            this.setState({
              topicsLoading: false,
              quizzes: Object.values(res.data),
            });
          })
          .catch((err) => {
            this.setState({
              topicsLoading: false,
              topicsError: err.message,
            });
          });
      }
    );
  }
  render() {
    //DATA ANALYTICS PART FOR GLOBAL HOT TOPICS
    let counts = {};
    let topics = ["Technology", "Math", "Sports", "Movies", "Food", "History"];

    const allQuizzes = [...this.state.quizzes];
    if (allQuizzes !== 0) {
      for (var i = 0; i < allQuizzes.length; i++) {
        const topic = allQuizzes[i].category;
        if (counts[topic] === undefined) {
          counts[topic] = parseInt(allQuizzes[i].popularity);
        } else {
          counts[topic] = counts[topic] + parseInt(allQuizzes[i].popularity);
        }
      }
      const entries = Object.entries(counts);
      //ONLY GIVE HOT TOPICS IF GOT MORE THAN OR EQUAL TO 6 DIFFERENT QUIZ TOPICS
      if (entries.length >= 6) {
        topics = entries
          .sort((a, b) => (a[1] > b[1] ? -1 : 1))
          .slice(0, 6)
          .map((x) => x[0]);
        // topics1 = topics.slice(0, 3);
        // topics2 = topics.slice(3, 6);
      }
    }
    return (
      <div>
        <h4 className={classes.Title}>Hot topics of the week!</h4>
        <Container>
          <Row>
            {this.state.topicsLoading ? (
              <Spinner />
            ) : (
              topics.map((topic) => {
                return (
                  <Col className="col-md-4 col-sm-4 col-6">
                    <Topics topic={topic} />
                  </Col>
                );
              })
            )}
          </Row>
        </Container>
        <Container fluid>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <SheepRankings array={this.state.userDataArray} />
          )}
        </Container>
      </div>
    );
  }
}

export default hotTopics;
