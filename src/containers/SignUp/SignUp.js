import React, { Component } from 'react';
import { Container, Row, Col, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './SignUp.module.css';
import * as actions from '../../store/actions/index';

class SignUp extends Component {
    state = {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
      };

    firstNameChangedHandler = (event) => {
        this.setState({firstname: event.target.value});
    };

    lastNameChangedHandler = (event) => {
        this.setState({lastname: event.target.value});
    };

    userNameChangedHandler = (event) => {
        this.setState({username: event.target.value});
    };

    emailChangedHandler = (event) => {
        this.setState({email: event.target.value});
    };

    passwordChangedHandler = (event) => {
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
                    "WEAK_PASSWORD : Password should be at least 6 characters"
                    ? "Password should be at least 6 characters!"
                    : this.props.error.message === "INVALID_PASSWORD"
                    ? "Invalid Password!"
                    : this.props.error.message === "EMAIL_NOT_FOUND"
                    ? "Email not found!"
                    : this.props.error.message}
                </p>
            );
        }

        let signUpRedirect = null;
        if (this.props.isSignUp) {
            signUpRedirect = <Redirect to={this.props.onSetSignUpRedirectPath} />;
        }

        return (
            <div style={{minHeight: "700px"}}>
                {signUpRedirect}
                <p>{errorMessage}</p>
                <Form className={classes.FormStyle}>
                    <Form.Group controlId="formBasicName" className={classes.InputStyle}>
                        <Row>
                            <Col>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control 
                                    placeholder="Enter First Name"
                                    onChange={(event) => this.firstNameChangedHandler(event)} />
                            </Col>
                            <Col>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control 
                                    placeholder="Enter Last Name"
                                    onChange={(event) => this.lastNameChangedHandler(event)} />
                            </Col>
                        </Row>
                    </Form.Group>
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
                            <button
                                onClick={this.submitHandler}>Create!</button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.signup.error,
        isSignedUp: state.signup.token !== null,
        signUpRedirectPath: state.signup.signUpRedirectPath,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (firstname, lastname, username, email, password) => 
            dispatch(actions.signUp(firstname, lastname, username, email, password)),
        onSetSignUpRedirectPath: () => dispatch(actions.setSignUpRedirectPath("/"))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);