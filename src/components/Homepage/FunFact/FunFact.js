import React from "react";

import Card from "react-bootstrap/Card";

import PennHan from "../../../assets/pennhan.jpg";
import cutesheep1 from "../../../assets/cutesheep1.jpg";
import classes from "./FunFact.module.css";

const funFact = () => {
  return (
    <div>
      <h4 className={classes.Title}>
        Fun fact of the day~
      </h4>
      <Card
        style={{
          width: "100%",
          margin: "auto",
          minHeight: "500px",
          height: "auto",
          //   border: "2px solid #627dc2",
          borderRadius: "15px",
        }}
      >
        <Card.Img
          src={PennHan}
          style={{
            width: "60%",
            display: "block",
            margin: "30px auto",
            borderRadius: "10px",
            objectFit: "contain",
          }}
        />
        <Card.Body>
          <Card.Title>Did you know?</Card.Title>
          <Card.Text>Penn Hans were first discovered in 1998</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default funFact;
