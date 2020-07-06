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

  render() {
    let nextButton = (
      <Button
        variant="secondary"
        className="float-right"
        disabled
        onClick={() => this.props.clickNext(this.state)}
      >
        Next
      </Button>
    );
    let submitButton = (
      <Button
        variant="success"
        className="float-right"
        disabled
        onClick={() => this.props.clickSubmit(this.state)}
      >
        Submit
      </Button>
    );

    if (
      this.state.question !== "" &&
      this.state.option1 !== "" &&
      this.state.option2 !== "" &&
      this.state.option3 !== "" &&
      this.state.option4 !== "" &&
      this.state.answer !== ""
    ) {
      nextButton = (
        <Button
          variant="secondary"
          className="float-right"
          onClick={() => this.props.clickNext(this.state)}
        >
          Next
        </Button>
      );
      submitButton = (
        <Button
          variant="success"
          className="float-right"
          onClick={() => this.props.clickSubmit(this.state)}
        >
          Submit
        </Button>
      );
    }

    let buttons = (
      <div className={classes.questionButtons}>
        {nextButton}
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
          {nextButton}
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
          {submitButton}
        </div>
      );
    }
    return (
      <div className={classes.QuestionPage}>
        <p style={{ textAlign: "center", margin: "2rem", fontSize: "2rem" }}>
          Question {this.props.questionNumber + 1}
        </p>
        <section>
          Please select the correct answer for your question! (The option
          highlighted in green is the selected correct answer! )
        </section>
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
          answer={this.state.answer}
        />

        {buttons}
      </div>
    );
  }
}

export default QuestionPage;
