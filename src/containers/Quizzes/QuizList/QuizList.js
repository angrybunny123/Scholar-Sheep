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
    categories: ["Animals", "Math", "Sports", "Emotions"],
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
    const dropDown = this.state.categories.map((category) => {
      return (
        <Dropdown.Item
          onClick={() => {
            const quizzesCopy = [...this.props.quizzes];
            const newQuizzes = quizzesCopy.filter(
              (quiz) => quiz.category === category
            );
            this.props.onSearch(newQuizzes);
          }}
        >
          {category}
        </Dropdown.Item>
      );
    });
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
              <Dropdown.Item
                onClick={() => {
                  const quizzesCopy = [...this.props.quizzes];
                  const newQuizzes = quizzesCopy.reverse();
                  this.props.onSearch(newQuizzes);
                }}
              >
                Date Created
              </Dropdown.Item>
              <DropdownButton
                style={{ marginLeft: "0.6rem" }}
                drop={"right"}
                variant="light"
                title="Categories"
                block
              >
                {dropDown}
              </DropdownButton>
              <Dropdown.Item
                onClick={() => {
                  const quizzesCopy = [...this.props.quizzes];
                  const newQuizzes = quizzesCopy.sort((a, b) =>
                    a.popularity > b.popularity ? -1 : 1
                  );
                  this.props.onSearch(newQuizzes);
                }}
              >
                No. Attempts
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  const quizzesCopy = [...this.props.quizzes];
                  this.props.onSearch(quizzesCopy);
                }}
              >
                View All Quizzes
              </Dropdown.Item>
            </DropdownButton>
            <FormControl
              onChange={(event) => {
                const input = event.target.value.toLowerCase();
                const quizzesCopy = [...this.props.quizzes];
                const newQuizzes = quizzesCopy.filter((quiz) =>
                  quiz.name.toLowerCase().includes(input)
                );
                this.props.onSearch(newQuizzes);
              }}
              placeholder="Search quiz..."
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
              {this.props.quizzesDisplayed.map((quiz, index) => (
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
    quizzesDisplayed: state.quizzes.quizzesDisplayed,
    loading: state.quizzes.loading,
    error: state.quizzes.error,
    currentQuiz: state.quizzes.currentQuiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //action must be executed ()!
    onSearch: (quizzes) => dispatch(actions.quizFilter(quizzes)),
    onStartQuiz: (quiz) => dispatch(actions.quizStart(quiz)),
    onFetchQuizzes: () => dispatch(actions.fetchQuizzes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
