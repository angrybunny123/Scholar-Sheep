import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Kenneth from "../../../assets/kenneth.jpg";
import classes from "./DailyQuiz.module.css";

const dailyQuiz = () => {
  return (
    <div>
      <h4 className={classes.Title}>Try a Quiz now!</h4>
      <Card
        style={{
          width: "100%",
          margin: "auto",
          minHeight: "500px",
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
    </div>
  );
};

export default dailyQuiz;
