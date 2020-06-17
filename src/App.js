import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import NavBarNoAuth from "./components/NavBar/NavBarNoAuth";
import Footer from "./components/footer/footer";

import Homepage from "./containers/Homepage/Homepage";
import Auth from "./containers/Auth/Auth";
import Account from "./containers/Account/Account";
import Logout from "./containers/Auth/Logout/Logout";
import CreateQuiz from "./containers/CreateQuiz/CreateQuiz";

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
    let footer = <Footer />;
    if (this.props.loading) {
      footer = null;
    }
    return (
      <Router >
        {navBar}
        <div className="NavigationBar">
          <Route path="/" exact component={Homepage} />
          <Route path="/account" component={Account}/>
          <Route path="/quizzes" />
          <Route path="/createQuiz" component={CreateQuiz} />
          <Route path="/about" />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          {footer}
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
