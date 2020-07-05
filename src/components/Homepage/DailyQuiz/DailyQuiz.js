import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import classes from "./DailyQuiz.module.css";

import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

import QuizModal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Rankings from "../Rankings/Rankings";

class dailyQuiz extends Component {
  state = {
    show: false,
  };

  componentDidMount() {
    this.props.onFetchUserData(
      localStorage.getItem("token"),
      localStorage.getItem("userId")
    );
    this.props.onFetchDailyQuiz();
  }

  handleShow = () => {
    if (this.props.userData.quizHistory) {
      for (let i = 0; i < this.props.userData.quizHistory.length; i++) {
        if (this.props.userData.quizHistory[i].id === this.props.dailyQuiz.id) {
          alert("You have already attempted the daily quiz today.");
          return null;
        }
      }
    }
    this.setState((prevState) => {
      return {
        ...prevState,
        show: !prevState.show,
      };
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    let dailyQuiz = (
      <div>
        <Spinner />
        <section>Loading daily quiz...</section>
      </div>
    );

    if (!this.props.loading) {
      dailyQuiz = (
        <div>
          <h4 className={classes.Title}>Try a Quiz now!</h4>
          <Card
            style={{
              width: "100%",
              margin: "auto",
              minHeight: "500px",
              height: "auto",
              // border: "5px solid #627dc2",
              borderRadius: "15px",
            }}
          >
            <Card.Img
              className={classes.picture}
              src={this.props.dailyQuiz.url}
              style={{
                width: "80%",
                display: "block",
                margin: "30px auto",
                borderRadius: "10px",
                objectFit: "contain",
              }}
            />
            <Card.Body>
              <Card.Title>Daily Quiz: {this.props.dailyQuiz.name}</Card.Title>
              <Card.Text>{this.props.dailyQuiz.description}</Card.Text>
              <Button
                onClick={() => this.handleShow()}
                variant="outline-success"
              >
                Attempt
              </Button>
            </Card.Body>
            <QuizModal
              show={this.state.show}
              handleClose={() => this.handleClose()}
              quizName={this.props.dailyQuiz.name}
              description={this.props.dailyQuiz.description}
              popularity={this.props.dailyQuiz.popularity}
              category={this.props.dailyQuiz.category}
              author={this.props.dailyQuiz.author}
              date={this.props.dailyQuiz.dateShown}
              numberOfQuestions={this.props.dailyQuiz.numberOfQuestions}
              duration={this.props.dailyQuiz.quizDuration}
              click={() => this.props.onStartQuiz(this.props.dailyQuiz)}
            />
          </Card>
          <Rankings
            rankingTitle="Top 3 Daily Quiz Rankings"
            array={this.props.dailyQuiz.history}
            numberOfQuestions={this.props.dailyQuiz.numberOfQuestions}
          />
        </div>
      );
    }

    if (this.props.error !== "") {
      dailyQuiz = <div style={{ padding: "2rem" }}>{this.props.error} :(</div>;
    }

    return <div>{dailyQuiz}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.quizzes.loading,
    error: state.quizzes.error,
    dailyQuiz: state.quizzes.dailyQuiz,
    userData: state.account.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //action must be executed ()!
    onStartQuiz: (quiz) => dispatch(actions.quizStart(quiz)),
    onFetchDailyQuiz: () => dispatch(actions.fetchDailyQuiz()),
    onFetchUserData: (token, userId) =>
      dispatch(actions.fetchUserData(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(dailyQuiz);
