import React from "react";

import { Card } from "react-bootstrap";
import classes from "./TopicCard2.module.css";

import { Link } from "react-router-dom";

const topicCard2 = (props) => {
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
            style={{ height: "10rem" }}
          />
          <Card.Body>
            <Card.Title>
              <div className={classes.cardTitle}>{props.topicname}</div>
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
    </Link>
  );
};

export default topicCard2;
