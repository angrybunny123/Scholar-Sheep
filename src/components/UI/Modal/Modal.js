import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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
          <Modal.Title>{props.quizName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{props.description}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>

          <Button variant="success">Start Quiz</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default modal;
