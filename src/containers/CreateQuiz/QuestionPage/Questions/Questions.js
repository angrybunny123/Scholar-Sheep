import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import classes from "./Questions.module.css";

class Questions extends Component {
  render() {
    const ans = this.props.answer;
    return (
      <div>
        <div className={classes.QuestionContainer}>
          <Form.Control
            value={this.props.question}
            placeholder="Enter your question here!"
            style={{ border: "none" }}
            onChange={(event) => this.props.questionChanged(event)}
          />
        </div>

        <div className={ans === 1 ? classes.OCS : classes.OptionContainer}>
          <button onClick={() => this.props.answerChanged(1)}>
            <Form.Control
              value={this.props.option1}
              placeholder="Question 1"
              style={{ border: "none", backgroundColor: "inherit" }}
              onChange={(event) => this.props.option1Changed(event)}
            />
          </button>
        </div>
        <div className={ans === 2 ? classes.OCS : classes.OptionContainer}>
          <button onClick={() => this.props.answerChanged(2)}>
            <Form.Control
              value={this.props.option2}
              placeholder="Question 2"
              style={{ border: "none", backgroundColor: "inherit" }}
              onChange={(event) => this.props.option2Changed(event)}
            />
          </button>
        </div>
        <div className={ans === 3 ? classes.OCS : classes.OptionContainer}>
          <button onClick={() => this.props.answerChanged(3)}>
            <Form.Control
              value={this.props.option3}
              placeholder="Question 3"
              style={{ border: "none", backgroundColor: "inherit" }}
              onChange={(event) => this.props.option3Changed(event)}
            />
          </button>
        </div>
        <div className={ans === 4 ? classes.OCS : classes.OptionContainer}>
          <button onClick={() => this.props.answerChanged(4)}>
            <Form.Control
              value={this.props.option4}
              placeholder="Question 4"
              style={{ border: "none", backgroundColor: "inherit" }}
              onChange={(event) => this.props.option4Changed(event)}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default Questions;
