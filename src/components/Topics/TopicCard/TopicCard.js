import React from "react";

import { Card } from "react-bootstrap";
import classes from "./TopicCard.module.css";

const topicCard = (props) => {
  return (
    <div className={classes.award}>
      <Card style={{ marginTop: "1rem" }}>
        <Card.Img
          variant="top"
          src={props.topicimage}
          style={{ height: "12.5rem" }}
        />
        <Card.Body>
          <Card.Title> {props.topicname} </Card.Title>
          <Card.Text> {props.topicdesc} </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default topicCard;
