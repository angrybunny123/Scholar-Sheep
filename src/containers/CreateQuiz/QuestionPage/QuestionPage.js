import React, { Component } from "react";

import classes from "./QuestionPage.module.css";
import Questions from "./Questions/Questions";

import Button from "react-bootstrap/Button";

class QuestionPage extends Component {
  state = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
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
    let buttons = (
      <div>
        <Button
          variant="secondary"
          className="float-right"
          style={{ padding: "0.5rem 2rem" }}
          onClick={() =>
            this.setState(
              {
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                answer: "",
              },
              this.props.clickNext(this.state)
            )
          }
        >
          Next
        </Button>
      </div>
    );
    if (this.props.questionNumber === 5) {
      buttons = (
        <Button
          variant="success"
          className="float-right"
          style={{ padding: "0.5rem 2rem" }}
          onClick={() => this.props.clickSubmit(this.state)}
        >
          Submit
        </Button>
      );
    }
    return (
      <div className={classes.QuestionPage}>
        <p style={{ textAlign: "center", margin: "2rem", fontSize: "2rem" }}>
          Question {this.props.questionNumber}
        </p>
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
