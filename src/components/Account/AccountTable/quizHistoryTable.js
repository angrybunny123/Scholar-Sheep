import React from "react";

import { Table } from "react-bootstrap";

const quizHistoryTable = (props) => {
  let table = <div>No quizzes attempted yet :( go attempt a quiz now!</div>;
  if (props.quizzes !== undefined) {
    table = (
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
    );
  }
  return (
    <Table responsive variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Quiz Name</th>
          <th>Score</th>
        </tr>
      </thead>
      {table}
    </Table>
  );
};

export default quizHistoryTable;
