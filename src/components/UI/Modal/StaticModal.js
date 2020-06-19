import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

class staticModal extends Component {
  render() {
    return (
      <div>
        <Modal
          aria-labelledby="example-custom-modal-styling-title"
          show={this.props.show}
          centered
          static
        >
          <Modal.Header>
            <Modal.Title>{this.props.message}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{this.props.description}</div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.click}>
              Go back to home page
            </Button>

            <Button variant="success" onClick={this.props.click2}>
              Try another quiz
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default staticModal;
