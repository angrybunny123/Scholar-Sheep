import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import classes from "./CoverPage.module.css";

class CoverPage extends Component {
  state = {
    name: this.props.name,
    category: this.props.category,
    description: this.props.description,
    numberOfQuestions: +this.props.numberOfQuestions,
    quizDuration: +this.props.quizDuration,
    categories: [
      "Animals",
      "Math",
      "Sports",
      "Movies",
      "Food",
      "Singapore History",
      "Technology",
      "Science",
      "Celebrities",
      "Fun Facts",
      "General Knowledge",
      "Music",
    ],
  };
  quizNameChangedHandler = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  categoryChangedHandler = (event) => {
    this.setState({
      category: event.target.value,
    });
  };
  descriptionChangedHandler = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  questionNumberChangedHandler = (event) => {
    this.setState({
      numberOfQuestions: event.target.value,
    });
  };
  quizDurationChangedHandler = (event) => {
    this.setState({
      quizDuration: event.target.value,
    });
  };

  render() {
    let button = (
      <Button variant="success" disabled className="btn-block">
        Next
      </Button>
    );
    if (
      this.state.name !== "" &&
      this.state.description !== "" &&
      this.state.numberOfQuestions >= 5 &&
      this.state.numberOfQuestions <= 10 &&
      this.state.quizDuration >= 30
    ) {
      button = (
        <Button
          variant="success"
          className="btn-block float-right"
          onClick={() => this.props.click(this.state)}
        >
          Next
        </Button>
      );
    }
    const dropDown = this.state.categories.map((category) => {
      return <option>{category}</option>;
    });
    return (
      <div className={classes.coverPage}>
        <p style={{ textAlign: "center", margin: "2rem", fontSize: "1.8rem" }}>
          Create a quiz!
        </p>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Quiz name:</Form.Label>
            <Form.Control
              onChange={(event) => this.quizNameChangedHandler(event)}
              type="text"
              value={this.state.name}
              placeholder="Enter the name of your quiz"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select a category:</Form.Label>
            <Form.Control
              as="select"
              value={this.state.category}
              onChange={(event) => this.categoryChangedHandler(event)}
            >
              {dropDown}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Quiz description:</Form.Label>
            <Form.Control
              value={this.state.description}
              onChange={(event) => this.descriptionChangedHandler(event)}
              as="textarea"
              rows="3"
              placeholder="Enter a description for your quiz!"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Number of questions (5 - 10):</Form.Label>
            <Form.Control
              onChange={(event) => this.questionNumberChangedHandler(event)}
              type="number"
              value={this.state.numberOfQuestions}
              placeholder="Enter a number from 5 - 10!"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput3">
            <Form.Label>Duration of quiz (in seconds, at least 30):</Form.Label>

            <Form.Control
              onChange={(event) => this.quizDurationChangedHandler(event)}
              type="number"
              value={this.state.quizDuration}
              placeholder="Enter a timer for your quiz (in seconds)!"
            />
          </Form.Group>
        </Form>
        {button}
      </div>
    );
  }
}

export default CoverPage;
