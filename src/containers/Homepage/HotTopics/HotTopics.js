import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import Kenneth from "../../../assets/kenneth.jpg";
import Pennhan from "../../../assets/pennhan.jpg";

import HotTopicCard from "./HotTopicCard/HotTopicCard";

const hotTopics = () => {
  return (
    <div style={{ marginRight: "3rem", marginTop: "2rem" }}>
      <h4 style={{ textAlign: "center" }}>Hot topics of the week!</h4>
      <Container>
        <Row>
          <Col className="col-md-4 col-sm-4 col-6">
            <HotTopicCard image={Kenneth} topic="Water" />
          </Col>
          <Col className="col-md-4 col-sm-4 col-6">
            <HotTopicCard image={Pennhan} topic="Earth" />
          </Col>
          <Col className="col-md-4 col-sm-4 col-6">
            <HotTopicCard image={Kenneth} topic="Fire" />
          </Col>

          <Col className="col-md-4 col-sm-4 col-6">
            <HotTopicCard image={Pennhan} topic="Air" />
          </Col>
          <Col className="col-md-4 col-sm-4 col-6">
            <HotTopicCard image={Kenneth} topic="Metal" />
          </Col>
          <Col className="col-md-4 col-sm-4 col-6">
            <HotTopicCard image={Pennhan} topic="Blood" />
          </Col>
        </Row>
      </Container>
      <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
        All Time Sheep Rankings:
      </p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Scholar Sheep</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>10/10</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Kenneth</td>
            <td>8/10</td>
          </tr>
          <tr>
            <td>3</td>
            {/* <td colSpan="2">Penn Han</td> */}
            <td>Penn Han</td>
            <td>7/10</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default hotTopics;
