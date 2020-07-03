import React from "react";
import { Table } from "react-bootstrap";

import classes from "./Rankings.module.css";

const rankings = (props) => {
  let table = (
    <p className={classes.Unattempted}>
      No one has attempted the daily quiz yet. Be the first to take on the
      challenge!
    </p>
  );
  if (props.array !== undefined && props.array !== "") {
    const sortedArray = props.array
      .sort((a, b) => (a.score > b.score ? -1 : 1))
      .slice(0, 3);
    table = (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Scholar Sheep</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedArray.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>@{item.username}</td>
              <td>
                {item.score}/{props.numberOfQuestions}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  return (
    <div>
      <p className={classes.Title}>{props.rankingTitle}</p>
      {table}
    </div>
  );
};

export default rankings;
