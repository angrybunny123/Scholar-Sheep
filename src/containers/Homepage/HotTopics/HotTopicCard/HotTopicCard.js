import React from "react";
import Card from "react-bootstrap/Card";
import classes from "./HotTopicCard.module.css";

const hotTopicCard = (props) => {
  return (
    <Card className={classes.Card}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.topic}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default hotTopicCard;
