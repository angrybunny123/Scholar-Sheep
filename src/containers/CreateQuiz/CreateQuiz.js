import React, { Component } from "react";

import CoverPage from "./CoverPage/CoverPage";
import QuestionPage from "./QuestionPage/QuestionPage";

import { connect } from "react-redux";
import axios from "../../axios-scholarsheep";
import classes from "./CreateQuiz.module.css";
import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";
import Button from "react-bootstrap/Button";

class CreateQuiz extends Component {
  state = {
    name: "",
    description: "",
    category: "Animals",
    date: "",
    popularity: 0,
    userId: "",
    quizDuration: 0,
    questions: [
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
    ],
    questionNumber: 0,
    currentQuestion: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    },
    coverPage: true,
    loading: false,
    quizSent: false,
    error: null,
    numberOfQuestions: 5,
  };

  componentDidMount() {
    this.props.onFetchUserData(
      localStorage.getItem("token"),
      localStorage.getItem("userId")
    );
  }

  switchToQuestions = (data) => {
    this.setState({
      name: data.name,
      description: data.description,
      category: data.category,
      numberOfQuestions: +data.numberOfQuestions,
      quizDuration: +data.quizDuration,
      coverPage: false,
    });
  };

  backToCoverPage = () => {
    this.setState({
      coverPage: true,
    });
  };

  nextQuestion = (data) => {
    const newQuestions = [...this.state.questions];
    newQuestions[this.state.questionNumber] = data;
    this.setState(
      {
        loading: true,
        questionNumber: this.state.questionNumber + 1,
        questions: newQuestions,
        currentQuestion: this.state.questions[this.state.questionNumber + 1],
      },
      () =>
        this.setState({
          loading: false,
        })
    );
  };

  backToPreviousQuestion = () => {
    this.setState(
      {
        loading: true,
        currentQuestion: this.state.questions[this.state.questionNumber - 1],
        questionNumber: this.state.questionNumber - 1,
      },
      () =>
        this.setState({
          loading: false,
        })
    );
  };

  submitHandler = (data) => {
    let newQuestions = [...this.state.questions];
    if (data !== null) {
      newQuestions[this.state.numberOfQuestions - 1] = data;
    }
    const newerQuestions = newQuestions.filter(
      (question) => question.question !== ""
    );
    this.setState(
      {
        questions: newerQuestions,
        loading: true,
      },
      () => {
        const quiz = {
          ...this.state,
          userId: this.props.userId,
          date: new Date().getTime(),
          dateShown: new Date().toString().substring(4, 15),
          author: "@" + this.props.username,
        };
        delete quiz.loading;
        delete quiz.coverPage;
        delete quiz.questionNumber;
        delete quiz.quizSent;
        delete quiz.error;
        delete quiz.numberOfQuestions;
        delete quiz.currentQuestion;
        axios
          .post("/quizzes.json", quiz)
          .then((response) => {
            this.setState({
              loading: false,
              quizSent: true,
            });
          })
          .catch((error) => {
            this.setState({
              loading: false,
              quizSent: true,
              error: error.message,
            });
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
        numberOfQuestions={this.state.numberOfQuestions}
        quizDuration={this.state.quizDuration}
        click={(data) => this.switchToQuestions(data)}
      />
    );
    if (!this.state.coverPage) {
      page = (
        <QuestionPage
          questionNumber={+this.state.questionNumber}
          clickNext={(data) => this.nextQuestion(data)}
          clickSubmit={(data) => this.submitHandler(data)}
          backToCoverPage={this.backToCoverPage}
          backToPreviousQuestion={this.backToPreviousQuestion}
          numberOfQuestions={this.state.numberOfQuestions}
          currentQuestion={this.state.currentQuestion}
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
    username: state.account.userData.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserData: (token, userId) =>
      dispatch(actions.fetchUserData(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);
