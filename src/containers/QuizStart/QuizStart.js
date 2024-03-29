import React, { Component } from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

import Questions from "./Questions/Questions";
import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StaticModal from "../../components/UI/Modal/StaticModal";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./QuizStart.module.css";

class QuizStart extends Component {
  state = {
    score: 0,
    questions: [],
    currentQuestion: "",
    questionNumber: 0,
    currentAnswer: "",
    inputAnswer: "",
    submitted: false,
    quizLoaded: false,
    minutes: 0,
    seconds: 20,
    questionSubmitted: false,
    currentQuestionStatus: null,
  };
  componentDidMount() {
    this.props.onFetchUserData(
      localStorage.getItem("token"),
      localStorage.getItem("userId")
    );
    if (this.props.currentQuiz !== null) {
      const newQuestions = [...this.props.currentQuiz.questions];
      this.setState({
        quizLoaded: true,
        questions: newQuestions,
        currentQuestion: newQuestions[0],
        currentAnswer: newQuestions[0].answer,
        seconds: this.props.currentQuiz.quizDuration,
      });
    }
    this.myInterval = setInterval(() => {
      const { seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1,
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(this.myInterval);
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
  quizList = () => {
    this.props.history.push("/quizzes");
  };
  homePage = () => {
    this.props.history.push("/");
  };

  answerHandler = (answer) => {
    this.setState({
      inputAnswer: answer,
    });
  };
  submitCurrentAnswer = (answer) => {
    if (this.state.inputAnswer === this.state.currentAnswer) {
      this.setState({
        currentQuestionStatus: "Correct!",
        questionSubmitted: true,
        questionNumber: this.state.questionNumber,
      });
    } else {
      this.setState({
        currentQuestionStatus: "Incorrect!",
        questionSubmitted: true,
        questionNumber: this.state.questionNumber,
      });
    }
  };

  nextQuestionHandler = (answer) => {
    let index = this.state.questionNumber;
    index = index + 1;
    const newQuestion = this.state.questions[index];
    let marks = this.state.score;
    if (this.state.inputAnswer === this.state.currentAnswer) {
      marks = marks + 1;
    }
    this.setState({
      inputAnswer: "",
      currentQuestion: newQuestion,
      questionNumber: index,
      currentAnswer: newQuestion.answer,
      score: marks,
      questionSubmitted: false,
      currentQuestionStatus: null,
    });
  };
  submitHandler = () => {
    let marks = this.state.score;
    if (this.state.inputAnswer === this.state.currentAnswer) {
      marks = marks + 1;
    }

    this.setState(
      {
        submitted: true,
        score: marks,
      },
      () => {
        const updatedQuiz = {
          ...this.props.currentQuiz,
          popularity: this.props.currentQuiz.popularity + 1,
        };
        let attemptedQuiz = {
          category: updatedQuiz.category,
          name: updatedQuiz.name,
          score: marks,
          id: updatedQuiz.id,
          questionNumber: updatedQuiz.questions.length,
        };
        //THIS IS WHERE WE CAN DO ALOT OF THINGS!
        //WHEN A QUIZ IS SUBMITTED, A LOT OF STATES CAN BE UPDATED TOO!
        if (updatedQuiz.dailyQuiz) {
          const userAttempt = {
            score: marks,
            username: localStorage.getItem("username"),
          };
          const dailyQuizAttemptHistory = updatedQuiz.history;
          let updatedDailyQuiz = [];
          if (dailyQuizAttemptHistory === "") {
            updatedDailyQuiz = {
              ...updatedQuiz,
              history: [userAttempt],
            };
          } else {
            updatedDailyQuiz = {
              ...updatedQuiz,
              history: dailyQuizAttemptHistory.concat(userAttempt),
            };
          }
          attemptedQuiz = {
            ...attemptedQuiz,
            dailyQuiz: true,
          };
          this.props.onSubmitQuiz(updatedDailyQuiz, null);
        } else {
          this.props.onSubmitQuiz(updatedQuiz, updatedQuiz.id);
        }
        let newData = [];
        const sheepPointsToAdd =
          (+this.state.score / +this.state.questions.length) * 20;
        if (this.props.userData.quizHistory) {
          newData = {
            ...this.props.userData,
            quizHistory: this.props.userData.quizHistory.concat(attemptedQuiz),
            sheepPoints: this.props.userData.sheepPoints + sheepPointsToAdd,
          };
        } else {
          newData = {
            ...this.props.userData,
            quizHistory: [attemptedQuiz],
            sheepPoints: this.props.userData.sheepPoints + sheepPointsToAdd,
          };
        }
        const dailyQuizBoolean = updatedQuiz.dailyQuiz ? true : false;
        const fullMarksBoolean =
          marks === this.state.questions.length ? true : false;

        this.props.updateQuizAwardsData(
          newData.quizHistory,
          newData,
          fullMarksBoolean,
          dailyQuizBoolean
        );
      }
    );
  };

  render() {
    const { minutes, seconds } = this.state;
    let buttons = (
      <div>
        <Button
          className="float-right"
          variant="outline-secondary"
          onClick={this.submitCurrentAnswer}
        >
          Submit Answer
        </Button>
      </div>
    );
    if (this.state.questionSubmitted) {
      buttons = (
        <div>
          <Button
            className="float-right"
            variant="outline-secondary"
            onClick={this.nextQuestionHandler}
          >
            Next question
          </Button>
        </div>
      );
    }
    if (this.state.inputAnswer === "") {
      buttons = (
        <div>
          <Button disabled className="float-right" variant="outline-secondary">
            Submit Answer
          </Button>
        </div>
      );
    }

    if (
      this.state.questionNumber + 1 === this.state.questions.length &&
      !this.state.questionSubmitted
    ) {
      buttons = (
        <div>
          <Button
            className="float-right"
            variant="outline-secondary"
            onClick={this.submitCurrentAnswer}
          >
            Submit Answer
          </Button>
        </div>
      );
    } else if (
      this.state.questionNumber + 1 === this.state.questions.length &&
      this.state.questionSubmitted
    ) {
      buttons = (
        <div>
          <Button
            className="float-right"
            variant="outline-success"
            onClick={this.submitHandler}
          >
            Submit Quiz
          </Button>
        </div>
      );
    }

    let timer = (
      <div className={classes.Clock}>
        <div className={classes.questionStatus}>
          {this.state.currentQuestionStatus}
        </div>
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
    );

    if (`${minutes}` <= 0 && `${seconds}` < 10) {
      timer = (
        <div className={classes.ClockFinishing}>
          <div className={classes.questionStatus}>
            {this.state.currentQuestionStatus}
          </div>
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
      );
    }

    let page = (
      <Container fluid>
        <Row>
          <Col className="col-md-9 col-9">
            <Questions
              Question={this.state.currentQuestion.question}
              Answer1={this.state.currentQuestion.option1}
              Answer2={this.state.currentQuestion.option2}
              Answer3={this.state.currentQuestion.option3}
              Answer4={this.state.currentQuestion.option4}
              click={this.answerHandler}
              inputAnswer={this.state.inputAnswer}
              correctAnswer={this.state.currentAnswer}
              questionNumber={+this.state.questionNumber}
              questionSubmitted={this.state.questionSubmitted}
              currentQuestionStatus={this.state.currentQuestionStatus}
            />
            {buttons}
            {/* //incorrect or correct */}
          </Col>
          <Col className="col-md-3 col-3">
            <div>
              {minutes === 0 && seconds === 0 ? (
                <div>
                  <StaticModal
                    show={true}
                    message="Time's up!"
                    description="Aww, that's too bad :("
                    click={this.homePage}
                    click2={this.quizList}
                  />
                </div>
              ) : (
                timer
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );

    if (this.state.submitted === true) {
      let message = (
        <p className={classes.Message}>Hooray! You passed the quiz! :D</p>
      );
      if (this.state.score < this.state.questions.length / 2) {
        message = (
          <p className={classes.Message}>:( Aw... better luck next time!</p>
        );
      }
      page = (
        <div className={classes.FinalScore}>
          <p>
            Your score is: {this.state.score}/ {this.state.questions.length}
          </p>
          <p className={classes.pointsEarned}>
            Sheep Points earned:
            {(+this.state.score / +this.state.questions.length) * 20}
          </p>
          {message}
          <p className={classes.award}>
            {this.props.quizAwardsAttained.length === 0
              ? null
              : "Congratulations! You have attained the following award(s):" +
                this.props.quizAwardsAttained.map((award) => {
                  return award;
                })}
          </p>
          <Button
            variant="outline-success"
            onClick={() => this.props.history.push("/quizzes")}
          >
            Try another quiz!
          </Button>
        </div>
      );
    }

    if (this.state.quizLoaded === false) {
      page = (
        <div className={classes.UnselectedQuiz}>
          <p>Please go and select a quiz first!</p>
          <Button
            variant="outline-success"
            onClick={() => this.props.history.push("/quizzes")}
          >
            Select a quiz
          </Button>
        </div>
      );
    }

    if (this.props.loading === true) {
      page = (
        <div className={classes.Processing}>
          <Spinner />
          <p>Processing your quiz attempt...</p>
        </div>
      );
    }

    if (this.props.error !== "") {
      page = (
        <div className={classes.FinalScore}>
          <p>Sorry, an error has occured: {this.props.error}</p>
          <Button
            variant="outline-success"
            onClick={() => this.props.history.push("/quizzes")}
          >
            Try another quiz!
          </Button>
        </div>
      );
    }

    return <div>{page}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    currentQuiz: state.quizzes.currentQuiz,
    loading: state.quizzes.loading,
    error: state.quizzes.error,
    userData: state.account.userData,
    quizAwardsAttained: state.account.quizAwardsEarned,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserData: (token, userId) =>
      dispatch(actions.fetchUserData(token, userId)),
    onSubmitQuiz: (quiz, id) => dispatch(actions.submitQuiz(quiz, id)),
    updateQuizAwardsData: (
      attemptedQuizzes,
      userData,
      fullMarksBoolean,
      dailyQuizBoolean
    ) =>
      dispatch(
        actions.updateQuizAwardsData(
          attemptedQuizzes,
          userData,
          fullMarksBoolean,
          dailyQuizBoolean
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizStart);
