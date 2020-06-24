import React from "react";

import { Table } from "react-bootstrap";
import classes from "./accountTable.module.css";

const quizHistoryTable = (props) => {
  let table = (
    <div className={classes.noQuizzes}>
      No quizzes attempted yet :( go attempt a quiz now!
    </div>
  );
  if (props.quizzes !== undefined) {
    table = (
      <Table responsive variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Quiz Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {props.quizzes.map((quiz, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{quiz.category}</td>
              <td>{quiz.name}</td>
              <td>
                {quiz.score}/{quiz.questionNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  return table;
};

export default quizHistoryTable;
