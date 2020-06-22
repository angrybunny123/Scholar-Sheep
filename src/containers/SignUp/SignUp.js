import React, { Component } from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './SignUp.module.css';
import * as actions from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";

class SignUp extends Component {
    state = {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
      };

    firstNameChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        this.setState({firstname: event.target.value});
    };

    lastNameChangedHandler = (event) => {
        console.log(event.target.value);
        this.setState({lastname: event.target.value});
    };

    userNameChangedHandler = (event) => {
        console.log(event.target.value);
        this.setState({username: event.target.value});
    };

    emailChangedHandler = (event) => {
        console.log(event.target.value);
        this.setState({email: event.target.value});
    };

    passwordChangedHandler = (event) => {
        console.log(event.target.value);
        this.setState({ password: event.target.value});
    };

    submitHandler = (event) => {
        event.preventDefault(); //prevents the reloading of page to keep the state
        this.props.onSignUp(
            this.state.firstname,
            this.state.lastname,
            this.state.username,
            this.state.email,
            this.state.password,
        );
        this.props.onSetSignUpRedirectPath();
    };

    render () {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>
                    {this.props.error.message === "EMAIL_EXISTS"
                    ? "The email address already exists!"
                    : this.props.error.message === "INVALID_EMAIL"
                    ? "Please enter a valid email address!"
                    : this.props.error.message ===
                    "WEAK_PASSWORD : Password should be at least 6 characters, Password should be at least 6 characters!" }
                   
                </p>
            );
        }

        let form = (
            <div style={{minHeight: "700px"}}>
                <p className={classes.ErrorMessage}>{errorMessage}</p>
                <Form className={classes.FormStyle}>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicFirstName" className={classes.InputStyle}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    placeholder="Enter First Name"
                                    onChange={(event) => this.firstNameChangedHandler(event)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicLastName" className={classes.InputStyle}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    placeholder="Enter Last Name"
                                    onChange={(event) => this.lastNameChangedHandler(event)} />
                            </Form.Group>        
                        </Col>
                    </Row>
                    <Form.Group controlId ="formBasicUsername" className={classes.InputStyle}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            placeholder="Enter Username"
                            onChange={(event) => this.userNameChangedHandler(event)} />
                    </Form.Group>
                    <Form.Group controlId ="formBasicEmail" className={classes.InputStyle}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter E-mail"
                            onChange={(event) => this.emailChangedHandler(event)} />
                    </Form.Group>
                    <Form.Group controlId ="formBasicPassword" className={classes.InputStyle}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder="Enter Password"
                            onChange={(event) => this.passwordChangedHandler(event)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicButton" className={classes.SubmitButton}>
                        <Col sm={4} >
                            <Button variant="outline-success"
                                onClick={this.submitHandler}>Create!</Button>
                        </Col>
                    </Form.Group>
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
                <Spinner/>
                Verifying data...
              </div>
            );
        }

        let signUpRedirect = null;
        if (this.props.isSignUp) {
            signUpRedirect = <Redirect to={this.props.signUpRedirectPath} />;
        }

        return (
            <div style={{minHeight: "700px"}}>
                {signUpRedirect}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.signup.loading,
        error: state.signup.error,
        isSignUp: state.signup.token !== null,
        signUpRedirectPath: state.signup.path,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (firstname, lastname, username, email, password) => 
            dispatch(actions.signUp(firstname, lastname, username, email, password)),
        onSetSignUpRedirectPath: () => dispatch(actions.setSignUpRedirectPath("/signupcomplete")),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);