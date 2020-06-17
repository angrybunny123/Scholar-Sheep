import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import Kenneth from "../../../assets/kenneth.jpg";

const dailyQuiz = () => {
  return (
    <div>
      <Card
        style={{
          width: "auto",
          margin: "2rem",
          height: "auto",
          // border: "5px solid #627dc2",
          borderRadius: "15px",
        }}
      >
        <Card.Img
          src={Kenneth}
          style={{
            width: "60%",
            display: "block",
            margin: "30px auto",
            borderRadius: "10px",
            objectFit: "contain",
          }}
        />
        <Card.Body>
          <Card.Title>Daily Quiz</Card.Title>
          <Card.Text>Tell me how handsome I am</Card.Text>
          <Button variant="outline-success">Attempt Quiz</Button>
        </Card.Body>
      </Card>
      <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
        Daily Quiz Rankings:
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

export default dailyQuiz;
