import React from "react";

import { Card } from "react-bootstrap";
import classes from "./TopicCard.module.css";

import { Link } from "react-router-dom";

const topicCard = (props) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={{
        pathname: "/quizzes",
        category: props.topicname,
      }}
    >
      <div className={classes.award}>
        <Card style={{ marginTop: "1rem" }}>
          <Card.Img
            variant="top"
            src={props.topicimage}
            style={{ height: "12.5rem" }}
          />
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontSize: "1.1rem" }}>
              {props.topicname}
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
    </Link>
  );
};

export default topicCard;
