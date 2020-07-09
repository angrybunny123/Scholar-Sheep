import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

// import Sidebar from "./Sidebar/Sidebar"; doesn't look nice
import QuizList from "./QuizList/QuizList";

class Quizzes extends Component {
  state = {
    loading: false,
  };
  componentDidMount() {
    if (this.props.location.category) {
      this.props.quizFilterStart();
      this.props.onFetchQuizzes();
      console.log(this.props.location.category);
      const quizzesCopy = [...this.props.quizzes];
      const newQuizzes = quizzesCopy.filter(
        (quiz) => quiz.category === this.props.location.category
      );
      this.props.onSearch(newQuizzes);
    }
    // This is to route to the quiz list with the chosen category preselected Had a problem here because of call back.
    // Solved it in quite a bad way, used axios just to do an async function in actions under quiz filter start.
  }
  render() {
    let page = (
      <Container fluid>
        <Row>
          <Col
            className="col-md-12"
            style={{
              marginTop: "2rem",
            }}
          >
            <QuizList />
          </Col>
        </Row>
      </Container>
    );
    return page;
  }
}

const mapStateToProps = (state) => {
  return {
    quizzes: state.quizzes.quizzes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (quizzes) => dispatch(actions.quizFilter(quizzes)),
    quizFilterStart: () => dispatch(actions.quizFilterStart()),
    onFetchQuizzes: (pageOffSet, perPage) =>
      dispatch(actions.fetchQuizzes(pageOffSet, perPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quizzes);
