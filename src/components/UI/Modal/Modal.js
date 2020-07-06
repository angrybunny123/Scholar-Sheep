import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

const modal = (props) => {
  return (
    <div>
      <Modal
        aria-labelledby="example-custom-modal-styling-title"
        show={props.show}
        onHide={props.handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Title: {props.quizName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Quiz Description</h5>
          <p>{props.description}</p>
          <br />
          <h5>Additional info</h5>
          <p>
            Author: <strong>{props.author}</strong>
          </p>
          <p>
            Category: <strong>{props.category}</strong>
          </p>
          <p>
            Total attempts: <strong>{props.popularity}</strong>
          </p>
          <p>
            Date Created: <strong>{props.date}</strong>
          </p>
          <p>
            Number of Questions: <strong>{props.numberOfQuestions}</strong>
          </p>
          <p>
            Time Limit: <strong>{props.duration}</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>

          <Link to="/quizStart" onClick={props.click}>
            <Button variant="success">Start Quiz</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default modal;
