import React, { Component } from "react";

import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./QuizList.module.css";

import QuizModal from "../../../components/UI/Modal/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";

class QuizList extends Component {
  state = {
    booleanArray: [],
  };

  handleClose = (index) => {
    const newArr = [...this.state.booleanArray];
    newArr[index] = false;
    this.setState({
      booleanArray: newArr,
    });
  };

  handleShow = (index) => {
    const newArr = [...this.state.booleanArray];
    newArr[index] = true;
    this.setState({
      booleanArray: newArr,
    });
  };

  componentDidMount() {
    this.props.onFetchQuizzes(this.props.token, this.props.userId);
    const len = this.props.quizzes.length;
    const boolArr = new Array(len);
    for (var i = 0; i < len; ++i) {
      boolArr[i] = false;
    }
    this.setState({
      booleanArray: boolArr,
    });
  }

  render() {
    let quizzes = <Spinner />;
    if (this.props.error !== "") {
      quizzes = <div className={classes.Error}>{this.props.error} :(</div>;
    } else if (!this.props.loading) {
      quizzes = (
        <div>
          <div className={classes.Heading}>Quiz List</div>
          <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title="Sort By"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item>Date Created</Dropdown.Item>

              <DropdownButton
                style={{ marginLeft: "0.6rem" }}
                drop={"right"}
                variant="light"
                title="Categories"
                block
              >
                <Dropdown.Item eventKey="1">Animals</Dropdown.Item>
                <Dropdown.Item eventKey="2">Math</Dropdown.Item>
                <Dropdown.Item eventKey="3">Sports</Dropdown.Item>
              </DropdownButton>

              <Dropdown.Item>No. Attempts</Dropdown.Item>
            </DropdownButton>
            <FormControl
              placeholder="Search..."
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Quiz Name</th>
                <th>Attempts</th>
                <th>Author</th>
                <th>Attempt Quiz</th>
              </tr>
            </thead>
            <tbody>
              {this.props.quizzes.map((quiz, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{quiz.category}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.popularity}</td>
                  <td>{quiz.name}</td> {/*should be username*/}
                  <td>
                    <Button
                      onClick={() => this.handleShow(index)}
                      variant="outline-success"
                    >
                      Attempt
                    </Button>
                    <QuizModal
                      show={this.state.booleanArray[index]}
                      handleClose={() => this.handleClose(index)}
                      quizName={quiz.name}
                      description={quiz.description}
                      popularity={quiz.popularity}
                      click={() => this.props.onStartQuiz(quiz)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
    return <div>{quizzes}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    quizzes: state.quizzes.quizzes,
    loading: state.quizzes.loading,
    error: state.quizzes.error,
    currentQuiz: state.quizzes.currentQuiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //action must be executed ()!
    onStartQuiz: (quiz) => dispatch(actions.quizStart(quiz)),
    onFetchQuizzes: () => dispatch(actions.fetchQuizzes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
