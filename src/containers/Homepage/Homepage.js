import React, { Component } from "react";
import classes from "./Homepage.module.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import DailyQuiz from "./DailyQuiz/DailyQuiz";
import HotTopics from "./HotTopics/HotTopics";
import FunFact from "./FunFact/FunFact";

class Homepage extends Component {
  render() {
    return (
      <Container fluid className={classes.Homepage}>
        <Row>
          <Col className="col-md-4 col-12">
            <DailyQuiz />
          </Col>
          <Col className="col-md-4 col-12">
            <FunFact />
          </Col>
          <Col className="col-md-4 col-12">
            <HotTopics />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Homepage;
