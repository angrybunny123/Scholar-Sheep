import React, { Component } from "react";
import classes from "./Homepage.module.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import DailyQuiz from "./DailyQuiz/DailyQuiz";
import HotTopics from "./HotTopics/HotTopics";
import FunFact from "./FunFact/FunFact";
import Footer from "../../components/footer/footer";

class Homepage extends Component {
  render() {
    return (
      <div>
        <Container fluid className={classes.Homepage}>
          <Row>
            <Col className="col-xl-4 col-lg-6 col-md-12 col-xs-12 col-12">
              <DailyQuiz />
            </Col>
            <Col className="col-xl-4 col-lg-6 col-md-12 col-xs-12 col-12">
              <FunFact />
            </Col>
            <Col className="col-xl-4 col-lg-12 col-md-12 col-xs-12 col-12">
              <HotTopics />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Homepage;
