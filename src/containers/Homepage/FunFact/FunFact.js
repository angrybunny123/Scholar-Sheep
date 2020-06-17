import React from "react";

import Card from "react-bootstrap/Card";

import PennHan from "../../../assets/pennhan.jpg";
import cutesheep1 from "../../../assets/cutesheep1.jpg";

const funFact = () => {
  return (
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <h3>
        <i>Fun fact of the day~</i>
      </h3>
      <Card
        style={{
          width: "auto",
          margin: "2rem",
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
      <img src={cutesheep1} alt="scholarsheep" style={{ width: "20rem" }} />
    </div>
  );
};

export default funFact;
