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
import Pagination from "react-bootstrap/Pagination";

import categories from "../../../components/Topics/TopicsList";

class QuizList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booleanArray: [],
      categories: categories,
      currentPage: 1,
      quizzesPerPage: 10,
    };
  }

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

  handlePageClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  componentDidMount() {
    this.props.onFetchQuizzes();

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
    let quizzes = (
      <div className={classes.Loading}>
        <Spinner />
        <section>Loading quizzes...</section>
      </div>
    );

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

    const { currentPage, quizzesPerPage } = this.state;

    const indexofLastQuiz = currentPage * quizzesPerPage;
    const indexofFirstQuiz = indexofLastQuiz - quizzesPerPage;
    const currentQuizzes = this.props.quizzesDisplayed.slice(
      indexofFirstQuiz,
      indexofLastQuiz
    );

    if (this.props.error !== "") {
      quizzes = <div className={classes.Error}>{this.props.error} :(</div>;
    } else if (!this.props.loading && !this.props.filterLoading) {
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
                const quizzesCopy = [...this.props.quizzesCopy];
                const newQuizzes = quizzesCopy.filter((quiz) =>
                  quiz.name.toLowerCase().includes(input)
                );
                this.props.onSearchBar(newQuizzes);
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
              {currentQuizzes.map((quiz, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{quiz.category}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.popularity}</td>
                  <td>{quiz.author}</td>
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
                      category={quiz.category}
                      author={quiz.author}
                      date={quiz.dateShown}
                      numberOfQuestions={quiz.questions.length}
                      duration={quiz.quizDuration}
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

    let pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.quizzesCopy.length / quizzesPerPage);
      i++
    ) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === this.state.currentPage}
          id={i}
          onClick={this.handlePageClick}
        >
          {i}
        </Pagination.Item>
      );
    }
    return (
      <div>
        {quizzes}
        <Pagination>{pageNumbers}</Pagination>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizzes: state.quizzes.quizzes,
    quizzesCopy: state.quizzes.quizzesCopy,
    quizzesDisplayed: state.quizzes.quizzesDisplayed,
    loading: state.quizzes.loading,
    filterLoading: state.quizzes.filterLoading,
    error: state.quizzes.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //action must be executed ()!
    onSearch: (quizzes) => dispatch(actions.quizFilter(quizzes)),
    onSearchBar: (quizzes) => dispatch(actions.quizSearch(quizzes)),
    onStartQuiz: (quiz) => dispatch(actions.quizStart(quiz)),
    onFetchQuizzes: (pageOffSet, perPage) =>
      dispatch(actions.fetchQuizzes(pageOffSet, perPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
