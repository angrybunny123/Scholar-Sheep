import React, { Component } from "react";

import classes from "./QuestionPage.module.css";
import Questions from "./Questions/Questions";

import Button from "react-bootstrap/Button";

class QuestionPage extends Component {
  state = {
    question: this.props.currentQuestion.question,
    option1: this.props.currentQuestion.option1,
    option2: this.props.currentQuestion.option2,
    option3: this.props.currentQuestion.option3,
    option4: this.props.currentQuestion.option4,
    answer: this.props.currentQuestion.answer,
  };

  questionChangedHandler = (event) => {
    this.setState({
      question: event.target.value,
    });
  };
  option1ChangedHandler = (event) => {
    this.setState({
      option1: event.target.value,
    });
  };
  option2ChangedHandler = (event) => {
    this.setState({
      option2: event.target.value,
    });
  };
  option3ChangedHandler = (event) => {
    this.setState({
      option3: event.target.value,
    });
  };
  option4ChangedHandler = (event) => {
    this.setState({
      option4: event.target.value,
    });
  };
  answerChangedHandler = (number) => {
    this.setState({
      answer: number,
    });
  };
  clickNext = () => {
    if (
      this.state.question === "" ||
      this.state.option1 === "" ||
      this.state.option2 === "" ||
      this.state.option3 === "" ||
      this.state.option4 === ""
    ) {
      alert("please fill in all input fields!");
    } else if (this.state.answer === "") {
      alert("please select an answer for your question!");
    } else {
      this.props.clickNext(this.state);
    }
  };
  clickSubmit = () => {
    if (
      this.state.question === "" ||
      this.state.option1 === "" ||
      this.state.option2 === "" ||
      this.state.option3 === "" ||
      this.state.option4 === ""
    ) {
      alert("please fill in all input fields!");
    } else if (this.state.answer === "") {
      alert("please select an answer for your question!");
    } else {
      this.props.clickSubmit(this.state);
    }
  };

  render() {
    let buttons = (
      <div className={classes.questionButtons}>
        <Button
          variant="secondary"
          className="float-right"
          onClick={this.clickNext}
        >
          Next
        </Button>
        <Button
          variant="danger"
          className="float-left"
          onClick={this.props.backToCoverPage}
        >
          Back
        </Button>
      </div>
    );
    if (this.props.questionNumber >= 1) {
      buttons = (
        <div className={classes.questionButtons}>
          <Button
            variant="danger"
            className="float-left"
            onClick={this.props.backToPreviousQuestion}
          >
            Back
          </Button>
          <Button
            variant="secondary"
            className="float-right"
            onClick={this.clickNext}
          >
            Next
          </Button>
        </div>
      );
    }
    if (this.props.questionNumber === this.props.numberOfQuestions - 1) {
      buttons = (
        <div className={classes.questionButtons}>
          <Button
            variant="danger"
            className="float-left"
            onClick={this.props.backToPreviousQuestion}
          >
            Back
          </Button>
          <Button
            variant="success"
            className="float-right"
            onClick={this.clickSubmit}
          >
            Submit
          </Button>
        </div>
      );
    }
    return (
      <div className={classes.QuestionPage}>
        <p style={{ textAlign: "center", margin: "2rem", fontSize: "2rem" }}>
          Question {this.props.questionNumber + 1}
        </p>
        <section>Please select the correct answer for your question!</section>
        <section>Selected answer: {this.state.answer}</section>
        <Questions
          question={this.state.question}
          option1={this.state.option1}
          option2={this.state.option2}
          option3={this.state.option3}
          option4={this.state.option4}
          questionChanged={this.questionChangedHandler}
          option1Changed={this.option1ChangedHandler}
          option2Changed={this.option2ChangedHandler}
          option3Changed={this.option3ChangedHandler}
          option4Changed={this.option4ChangedHandler}
          answerChanged={this.answerChangedHandler}
        />

        {buttons}
      </div>
    );
  }
}

export default QuestionPage;
