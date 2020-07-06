import React, { Component } from "react";

import Card from "react-bootstrap/Card";

import classes from "./FunFact.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

import axios from "../../../axios-scholarsheep";

class funFact extends Component {
  state = {
    url: "",
    funfact: "",
    error: "",
    loading: false,
  };

  componentDidMount() {
    axios
      .get("/funfact.json")
      .then((res) => {
        this.setState({
          url: res.data.url,
          funfact: res.data.funfact,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: err.message,
        });
      });
  }
  render() {
    let funfact = (
      <div>
        <Spinner />
        <section>Loading funfact...</section>
      </div>
    );
    if (!this.state.loading) {
      funfact = (
        <div>
          <h4 className={classes.Title}>Fact of the day</h4>
          <Card
            style={{
              width: "100%",
              margin: "auto",
              minHeight: "500px",
              height: "auto",
              //   border: "2px solid #627dc2",
              borderRadius: "15px",
            }}
          >
            <Card.Img
              src={this.state.url}
              style={{
                width: "80%",
                display: "block",
                margin: "30px auto",
                borderRadius: "10px",
                objectFit: "contain",
              }}
            />
            <Card.Body>
              <Card.Title>Did you know?</Card.Title>
              <Card.Text>{this.state.funfact}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }

    if (this.state.error !== "") {
      funfact = <div style={{ padding: "2rem" }}>{this.state.error} :(</div>;
    }
    return funfact;
  }
}

export default funFact;
