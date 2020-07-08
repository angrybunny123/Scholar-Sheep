import React, { Component } from "react";
import { Table } from "react-bootstrap";

import classes from "./SheepRankings.module.css";

class SheepRankings extends Component {
  render() {
    let table = (
      <p className={classes.Unattempted}>NO SHEEPS IN THIS APP? WTF</p>
    );
    if (this.props.array !== undefined && this.props.array !== "") {
      const sortedArray = this.props.array
        .sort((a, b) => (a.sheepPoints > b.sheepPoints ? -1 : 1))
        .slice(0, 3);
      table = (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Scholar Sheep</th>
              <th>Sheep Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedArray.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>@{item.username}</td>
                <td>{item.sheepPoints}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
    return (
      <div>
        <p className={classes.Title}>All Time Scholar Sheeps</p>
        {table}
      </div>
    );
  }
}

export default SheepRankings;
