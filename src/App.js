import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import NavBarNoAuth from "./components/NavBar/NavBarNoAuth";

import Homepage from "./containers/Homepage/Homepage";
import Auth from "./containers/Auth/Auth";
import Account from "./containers/Account/Account";
import About from "./containers/About/About";
import Logout from "./containers/Auth/Logout/Logout";
import CreateQuiz from "./containers/CreateQuiz/CreateQuiz";
import Quizzes from "./containers/Quizzes/Quizzes";
import QuizStart from "./containers/QuizStart/QuizStart";
import SignUp from "./containers/SignUp/SignUp";
import SignUpComplete from "./containers/SignUp/SignUpComplete/SignUpComplete";

import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let navBar = <NavBarNoAuth />;
    if (this.props.isAuthenticated) {
      navBar = <NavBar />;
    }

    return (
      <Router>
        {navBar}
        <div className="NavigationBar">
          <Route path="/" exact component={Homepage} />
          <Route path="/account" component={Account} />
          <Route path="/quizzes" component={Quizzes} />
          <Route path="/createQuiz" component={CreateQuiz} />
          <Route path="/about" component={About} />
          <Route path="/auth" component={Auth} />
          <Route path="/quizStart" component={QuizStart} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signupcomplete" component={SignUpComplete} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
