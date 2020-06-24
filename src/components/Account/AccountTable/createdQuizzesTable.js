import React from "react";

import classes from "./accountTable.module.css";
import { Table } from "react-bootstrap";

const createdQuizzesTable = (props) => {
  let table = (
    <div className={classes.noQuizzes}>
      No quizzes created yet :( go create a quiz now!
    </div>
  );
  if (props.quizzes.length !== 0) {
    table = (
      <Table responsive variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Quiz Name</th>
            <th>Attempts</th>
          </tr>
        </thead>
        <tbody>
          {props.quizzes.map((quiz, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{quiz.category}</td>
              <td>{quiz.name}</td>
              <td>{quiz.popularity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  return table;
};

export default createdQuizzesTable;
