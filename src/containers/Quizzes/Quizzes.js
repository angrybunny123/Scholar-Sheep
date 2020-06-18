import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import Sidebar from "./Sidebar/Sidebar"; doesn't look nice
import QuizList from "./QuizList/QuizList";

class Quizzes extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col
            className="col-md-12"
            style={{
              marginTop: "2rem",
            }}
          >
            <QuizList />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Quizzes;
