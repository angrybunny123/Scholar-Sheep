import React, { Component } from "react";

import CoverPage from "./CoverPage/CoverPage";
import QuestionPage from "./QuestionPage/QuestionPage";

import { connect } from "react-redux";
import axios from "../../axios-scholarsheep";

import Spinner from "../../components/UI/Spinner/Spinner";

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
    const newQuestions = this.state.questions.concat(data);
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
        axios
          .post("/quizzes.json", quiz)
          .then((response) => {
            console.log(response);
            this.setState({
              loading: false,
            });

            this.props.history.push("/");
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              loading: false,
            });
            this.props.history.push("/");
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
        <div>
          <Spinner />;
          <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
            Sending your quiz...
          </p>
        </div>
      );
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
