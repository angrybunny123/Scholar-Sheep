import React, { Component } from "react";
import classes from "./Questions.module.css";

class Questions extends Component {
  state = {
    myAnswer: "",
  };

  someFn = () => {
    this.props.click(this.state.myAnswer);
  };

  render() {
    const ans = this.props.inputAnswer;
    let page = (
      <div className={classes.Container}>
        <div className={classes.QuestionNumber}>
          Question {this.props.questionNumber + 1}
        </div>
        <section>Click on the correct answer!</section>
        <section>Selected answer: {ans} </section>
        <div className={classes.QuestionContainer}>
          <div>{this.props.Question}</div>
        </div>
        <div className={ans === 1 ? classes.OCS : classes.OptionContainer}>
          <button
            onClick={() =>
              this.setState(
                {
                  myAnswer: 1,
                },
                this.someFn
              )
            }
          >
            {this.props.Answer1}
          </button>
        </div>
        <div className={ans === 2 ? classes.OCS : classes.OptionContainer}>
          <button
            onClick={() =>
              this.setState(
                {
                  myAnswer: 2,
                },
                this.someFn
              )
            }
          >
            {this.props.Answer2}
          </button>
        </div>
        <div className={ans === 3 ? classes.OCS : classes.OptionContainer}>
          <button
            onClick={() =>
              this.setState(
                {
                  myAnswer: 3,
                },
                this.someFn
              )
            }
          >
            {this.props.Answer3}
          </button>
        </div>
        <div className={ans === 4 ? classes.OCS : classes.OptionContainer}>
          <button
            onClick={() =>
              this.setState(
                {
                  myAnswer: 4,
                },
                this.someFn
              )
            }
          >
            {this.props.Answer4}
          </button>
        </div>
      </div>
    );

    if (
      this.props.questionSubmitted &&
      this.props.currentQuestionStatus === "Incorrect!"
    ) {
      page = (
        <div className={classes.Container}>
          <div className={classes.QuestionNumber}>
            Question {this.props.questionNumber + 1}
          </div>
          <section>Click on the correct answer!</section>
          <section>Selected answer: {ans} </section>
          <div className={classes.QuestionContainer}>
            <div>{this.props.Question}</div>
          </div>
          <div
            className={
              this.props.correctAnswer === 1
                ? classes.CorrectAnswer
                : this.props.inputAnswer === 1
                ? classes.WrongAnswer
                : classes.OptionContainer
            }
          >
            <button>{this.props.Answer1}</button>
          </div>
          <div
            className={
              this.props.correctAnswer === 2
                ? classes.CorrectAnswer
                : this.props.inputAnswer === 2
                ? classes.WrongAnswer
                : classes.OptionContainer
            }
          >
            <button>{this.props.Answer2}</button>
          </div>
          <div
            className={
              this.props.correctAnswer === 3
                ? classes.CorrectAnswer
                : this.props.inputAnswer === 3
                ? classes.WrongAnswer
                : classes.OptionContainer
            }
          >
            <button>{this.props.Answer3}</button>
          </div>
          <div
            className={
              this.props.correctAnswer === 4
                ? classes.CorrectAnswer
                : this.props.inputAnswer === 4
                ? classes.WrongAnswer
                : classes.OptionContainer
            }
          >
            <button>{this.props.Answer4}</button>
          </div>
        </div>
      );
    } else if (
      this.props.questionSubmitted &&
      this.props.currentQuestionStatus === "Correct!"
    ) {
      page = (
        <div className={classes.Container}>
          <div className={classes.QuestionNumber}>
            Question {this.props.questionNumber + 1}
          </div>
          <section>Click on the correct answer!</section>
          <section>Selected answer: {ans} </section>
          <div className={classes.QuestionContainer}>
            <div>{this.props.Question}</div>
          </div>
          <div
            className={
              this.props.correctAnswer === 1
                ? classes.CorrectAnswer
                : classes.OptionContainer
            }
          >
            <button>{this.props.Answer1}</button>
          </div>
          <div
            className={
              this.props.correctAnswer === 2
                ? classes.CorrectAnswer
                : classes.OptionContainer
            }
          >
            <button>{this.props.Answer2}</button>
          </div>
          <div
            className={
              this.props.correctAnswer === 3
                ? classes.CorrectAnswer
                : classes.OptionContainer
            }
          >
            <button>{this.props.Answer3}</button>
          </div>
          <div
            className={
              this.props.correctAnswer === 4
                ? classes.CorrectAnswer
                : classes.OptionContainer
            }
          >
            <button>{this.props.Answer4}</button>
          </div>
        </div>
      );
    }

    return <div>{page}</div>;
  }
}

export default Questions;
