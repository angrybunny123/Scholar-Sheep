import React, { Component } from "react";
import classes from "./Homepage.module.css";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import * as actions from "../../store/actions/index";
import DailyQuiz from "../../components/Homepage/DailyQuiz/DailyQuiz";
import HotTopics from "../../components/Homepage/HotTopics/HotTopics";
import FunFact from "../../components/Homepage/FunFact/FunFact";
import Ranking from "../../components/Homepage/Rankings/Rankings";
import Footer from "../../components/footer/footer";

import cutesheep1 from "../../assets/cutesheep1.jpg";

class Homepage extends Component {
  componentDidMount() {
    this.props.onFetchUserData(
      localStorage.getItem("token"),
      localStorage.getItem("userId")
    );
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
          <Row className={classes.BottomRow}>
            <Col className="col-md-4 col-xs-12 col-12">
              <Ranking rankingtitle="DailyQuiz" />
            </Col>
            <Col
              style={{ textAlign: "center" }}
              className="col-md-4 col-xs-12 col-12"
            >
              <img
                src={cutesheep1}
                alt="scholarsheep"
                className={classes.ImageStyle}
              />
            </Col>
            <Col className="col-md-4 col-xs-12 col-12">
              <Ranking rankingtitle="All Time Quiz" />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
