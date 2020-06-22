import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    isSignup: false,
    email: "",
    password: "",
  };

  onCreateAccount = () => {
    //switch the values
    this.props.history.push('/signup');
  };

  emailChangedHandler = (event) => {
    console.log(event.target.value);
    this.setState({
      email: event.target.value,
    });
  };

  passwordChangedHandler = (event) => {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
  };

  submitHandler = (event) => {
    event.preventDefault(); //prevents reloading of the page!
    this.props.onAuth(
      this.state.email,
      this.state.password,
      this.state.isSignup
    );
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        //the message property is from firebase!
        <p>
          {this.props.error.message === "INVALID_PASSWORD"
            ? "Invalid Password!"
            : this.props.error.message === "EMAIL_NOT_FOUND"
            ? "Email not found!"
            : this.props.error.message}
        </p>
      );
    }
    let form = (
      <div className={classes.Auth}>
        <p style={{ textAlign: "center", margin: "2rem", fontSize: "2rem" }}>
          Login with your email and password!
        </p>
        <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
        <Form style={{ margin: "2rem" }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => this.emailChangedHandler(event)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => this.passwordChangedHandler(event)}
            />
          </Form.Group>
          <div style={{ textAlign: "center" }}>
            <Button variant="outline-success" onClick={this.submitHandler}>
              Login
            </Button>
            <p>
              <button
                type="button"
                className={classes.secondaryButton}
                onClick={this.onCreateAccount}
              >Don't have an account? Create one now!
              </button>
            </p>
          </div>
        </Form>
      </div>
    );
    if (this.props.loading) {
      form = (
        <div
          style={{
            margin: "5rem 2rem 2rem 2rem",
            textAlign: "center",
            fontSize: "1.3rem",
          }}
        >
          <Spinner />
          Verifying data...
        </div>
      );
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div>
        {authRedirect}
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
