import React, { Component } from "react";

import CoverPage from "./CoverPage/CoverPage";
import QuestionPage from "./QuestionPage/QuestionPage";

import { connect } from "react-redux";
import axios from "../../axios-scholarsheep";
import classes from "./CreateQuiz.module.css";

import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "react-bootstrap/Button";

class CreateQuiz extends Component {
  state = {
    name: "",
    description: "",
    category: "",
    date: "",
    popularity: 0,
    userId: "",
    questions: [],
    questionNumber: 1,
    coverPage: true,
    loading: false,
    quizSent: false,
    error: null,
  };

  switchToQuestions = (data) => {
    this.setState({
      name: data.name,
      description: data.description,
      category: data.category,
      coverPage: false,
    });
  };

  nextQuestion = (data) => {
    const newQuestions = this.state.questions.concat(data);
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      questions: newQuestions,
    });
  };

  submitHandler = (data) => {
    let newQuestions = this.state.questions;
    if (data !== null) {
      newQuestions = this.state.questions.concat(data);
    }
    this.setState(
      {
        questionNumber: this.state.questionNumber,
        questions: newQuestions,
        loading: true,
      },
      () => {
        const quiz = {
          ...this.state,
          userId: this.props.userId,
          date: new Date().getTime(),
        };
        delete quiz.loading;
        delete quiz.coverPage;
        delete quiz.questionNumber;
        delete quiz.quizSent;
        delete quiz.error;
        axios
          .post("/quizzes.json", quiz)
          .then((response) => {
            this.setState({
              loading: false,
              quizSent: true,
            });

            // this.props.history.push("/");
          })
          .catch((error) => {
            this.setState({
              loading: false,
              quizSent: true,
              error: error.message,
            });
            // this.props.history.push("/");
          });
      }
    );
  };

  render() {
    let page = (
      <CoverPage
        name={this.state.name}
        description={this.state.description}
        category={this.state.category}
        click={(data) => this.switchToQuestions(data)}
      />
    );
    if (!this.state.coverPage) {
      page = (
        <QuestionPage
          questionNumber={+this.state.questionNumber}
          clickNext={(data) => this.nextQuestion(data)}
          clickSubmit={(data) => this.submitHandler(data)}
        />
      );
    }
    if (this.state.loading === true) {
      page = (
        <div className={classes.Sending}>
          <Spinner />
          <p>Sending your quiz...</p>
        </div>
      );
    } else if (this.state.quizSent === true) {
      if (this.state.error) {
        page = (
          <div className={classes.Error}>
            <p>Something went wrong! :(</p>
            <section>Error: {this.state.error}</section>
            <Button
              variant="secondary"
              onClick={() => this.props.history.push("/")}
            >
              Go back to home page
            </Button>
            <Button variant="success" onClick={() => this.submitHandler(null)}>
              Try Again
            </Button>
          </div>
        );
      } else {
        page = (
          <div className={classes.Success}>
            <p>Your quiz has been submitted successfully :)</p>

            <Button
              variant="secondary"
              onClick={() => this.props.history.push("/")}
            >
              Go back to home page
            </Button>
            <Button variant="success" onClick={() => this.props.history.go(0)}>
              Create another quiz
            </Button>
          </div>
        );
      }
    }

    return <div>{page}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(CreateQuiz);
