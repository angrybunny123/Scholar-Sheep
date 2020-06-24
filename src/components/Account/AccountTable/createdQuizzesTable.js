import React from "react";

import { Table } from "react-bootstrap";

const createdQuizzesTable = (props) => {
  let table = <div>No quizzes created yet :( go create a quiz now!</div>;
  if (props.quizzes !== undefined) {
    table = (
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
    );
  }
  return (
    <Table responsive variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Quiz Name</th>
          <th>Attempts</th>
        </tr>
      </thead>
      {table}
    </Table>
  );
};

export default createdQuizzesTable;
