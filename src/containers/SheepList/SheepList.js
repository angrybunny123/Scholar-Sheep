import React, { Component } from "react";
import axios from "../../axios-scholarsheep";

import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./SheepList.module.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import AccountView from "./AccountView/AccountView";

class SheepList extends Component {
  state = {
    loading: false,
    userDataArray: "",
    quizzes: [],
    error: "",
  };
  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      () => {
        axios
          .get("/userdata.json")
          .then((res) => {
            this.setState({
              loading: false,
              userDataArray: Object.values(res.data),
            });
          })
          .catch((err) => {
            this.setState({
              loading: false,
              error: err.message,
            });
          });
      }
    );
  }

  render() {
    let table = <p className={classes.Unattempted}>No sheeps were found.</p>;
    if (
      this.state.userDataArray !== undefined &&
      this.state.userDataArray !== ""
    ) {
      let sortedArray = this.state.userDataArray.sort((a, b) =>
        a.sheepPoints > b.sheepPoints ? -1 : 1
      );
      table = (
        <Container fluid>
          <p className={classes.Title}>Scholar Sheep Hall Of Fame</p>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Scholar Sheep</th>
                <th>Sheep Points</th>
                <th>Date Joined</th>
                <th>View Profile</th>
              </tr>
            </thead>
            <tbody>
              {sortedArray.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>@{item.username}</td>
                  <td>{Math.round(item.sheepPoints)}</td>
                  <td>{item.dateJoined}</td>
                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={{
                        pathname: "/sheeplist/" + item.id,
                      }}
                    >
                      <Button variant="outline-info">View Profile</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      );
    }
    if (this.state.loading === true) {
      table = (
        <div style={{ textAlign: "center", fontSize: "1.3rem" }}>
          <Spinner />
          Loading User Data...
        </div>
      );
    }
    if (this.props.match.params.uid !== "home") {
      table = <AccountView userId={this.props.match.params.uid} />;
    }
    return table;
  }
}

export default SheepList;
