import React, { Component } from "react";
import { Container } from "react-bootstrap";

import classes from "./SignUpComplete.module.css";

class SignUpComplete extends Component {
  routeToLogin = () => {
    this.props.history.push("/auth");
  };

  render() {
    return (
      <div>
        <Container>
          <div className={classes.SignUpCompleteContainer}>
            <h4>Sign Up Complete!</h4>
            <p>Click Here to Log In</p>
            <button onClick={this.routeToLogin}>Log In</button>
          </div>
        </Container>
      </div>
    );
  }
}

export default SignUpComplete;
