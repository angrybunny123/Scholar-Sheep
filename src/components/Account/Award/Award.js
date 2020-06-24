import React from "react";

import { Card } from "react-bootstrap";
import classes from "./Award.module.css";

const award = (props) => {
  return (
    <div className={classes.award}>
      <Card style={{ marginTop: "1rem" }}>
        <Card.Img variant="top" src={props.awardimage} />
        <Card.Body>
          <Card.Title> {props.awardname} </Card.Title>
          <Card.Text> {props.awarddesc} </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default award;
