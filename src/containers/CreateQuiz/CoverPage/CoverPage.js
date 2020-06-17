import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import classes from "./CoverPage.module.css";

class CoverPage extends Component {
  state = {
    name: "",
    category: "",
    description: "",
    // file
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
  render() {
    return (
      <div className={classes.coverPage}>
        <p style={{ textAlign: "center", margin: "2rem", fontSize: "2rem" }}>
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
              <option>Animals</option>
              <option>Science</option>
              <option>Cooking</option>
              <option>Math</option>
              <option>Sports</option>
              <option>SuperHeroes</option>
              <option>Astronomy</option>
              <option>Emotions</option>
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

          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Upload a picture for your quiz! (this is not working yet)"
            />
          </Form.Group>
        </Form>
        <Button
          variant="success"
          className="btn-block float-right"
          onClick={() => this.props.click(this.state)}
        >
          Next
        </Button>
      </div>
    );
  }
}

export default CoverPage;
