import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Kenneth from "../../../assets/kenneth.jpg";
import Pennhan from "../../../assets/pennhan.jpg";

import HotTopicCard from "./HotTopicCard/HotTopicCard";
import classes from "./HotTopic.module.css";

const hotTopics = () => {
  return (
    <div>
      <h4 className={classes.Title}>Hot topics of the week!</h4>
      <Container>
        <Row>
          <Col>
            <HotTopicCard image={Kenneth} topic="Water" />
          </Col>
          <Col>
            <HotTopicCard image={Pennhan} topic="Earth" />
          </Col>
          <Col>
            <HotTopicCard image={Kenneth} topic="Fire" />
          </Col>
        </Row>
        <Row>
          <Col>
            <HotTopicCard image={Pennhan} topic="Air" />
          </Col>
          <Col>
            <HotTopicCard image={Kenneth} topic="Metal" />
          </Col>
          <Col>
            <HotTopicCard image={Pennhan} topic="Blood" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default hotTopics;
