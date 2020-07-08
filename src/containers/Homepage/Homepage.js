import React, { Component } from "react";
import classes from "./Homepage.module.css";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import * as actions from "../../store/actions/index";
import DailyQuiz from "../../components/Homepage/DailyQuiz/DailyQuiz";
import HotTopics from "../../components/Homepage/HotTopics/HotTopics";
import FunFact from "../../components/Homepage/FunFact/FunFact";
import Footer from "../../components/footer/footer";

class Homepage extends Component {
  componentDidMount() {
    this.props.onFetchUserData(
      localStorage.getItem("token"),
      localStorage.getItem("userId")
    );
    this.props.onFetchQuizzes();
  }
  render() {
    let userHeader = null;
    if (this.props.token !== null) {
      userHeader = <h1>Welcome Back, {this.props.userData.username}</h1>;
    }

    return (
      <div>
        {userHeader}
        <Container fluid className={classes.Homepage}>
          <Row>
            <Col className="col-xl-4 col-lg-6 col-md-12 col-xs-12 col-12">
              <DailyQuiz />
            </Col>
            <Col className="col-xl-4 col-lg-6 col-md-12 col-xs-12 col-12">
              <FunFact />
            </Col>
            <Col className="col-xl-4 col-lg-12 col-md-12 col-xs-12 col-12">
              <HotTopics />
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.account.userData,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserData: (token, userId) =>
      dispatch(actions.fetchUserData(token, userId)),
    onFetchQuizzes: (pageOffSet, perPage) =>
      dispatch(actions.fetchQuizzes(pageOffSet, perPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
