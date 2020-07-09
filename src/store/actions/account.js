import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as actions from "./index";

export const fetchUserDataSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_USER_DATA_SUCCESS,
    userData: userData[0],
  };
};

export const fetchUserDataFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_DATA_FAIL,
    error: error,
  };
};

export const fetchUserDataStart = () => {
  return {
    type: actionTypes.FETCH_USER_DATA_START,
  };
};

export const fetchUserData = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchUserDataStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("https://scholar-sheep.firebaseio.com/userdata.json" + queryParams)
      .then((response) => {
        const fetchedData = [];
        for (let key in response.data) {
          fetchedData.push({
            ...response.data[key],
            id: key,
          });
        }
        localStorage.setItem("username", fetchedData[0].username);
        dispatch(fetchUserDataSuccess(fetchedData));
      })
      .catch((error) => {
        dispatch(fetchUserDataFail(error));
      });
  };
};

export const fetchUserQuizzes = (token, userId) => {
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  return (dispatch) => {
    dispatch(fetchUserQuizzesStart());
    axios
      .get("https://scholar-sheep.firebaseio.com/quizzes.json" + queryParams)
      .then((response) => {
        const fetchedData = [];
        for (let key in response.data) {
          fetchedData.push({
            ...response.data[key],
            id: key,
          });
        }
        dispatch(fetchUserQuizzesSuccess(fetchedData));
        dispatch(actions.fetchQuizzes());
        //a very bad fix but it works lol how do i do this asynchronously?
      })
      .catch((error) => {
        dispatch(fetchUserQuizzesFail(error));
      });
  };
};

export const updateUserDataSuccess = (userData) => {
  return {
    type: actionTypes.UPDATE_USER_DATA_SUCCESS,
    userData: userData,
  };
};

export const updateUserDataFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_DATA_FAIL,
    error: error,
  };
};

export const updateUserDataStart = () => {
  return {
    type: actionTypes.UPDATE_USER_DATA_START,
  };
};

export const updateUserData = (userData) => {
  return (dispatch) => {
    dispatch(updateUserDataStart());
    axios
      .put(
        "https://scholar-sheep.firebaseio.com/userdata/" +
          userData.id +
          ".json",
        userData
      )
      .then((response) => {
        dispatch(updateUserDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(updateUserDataFail(error));
      });
  };
};

export const fetchUserQuizzesSuccess = (quizzes) => {
  return {
    type: actionTypes.FETCH_USER_QUIZZES_SUCCESS,
    quizzes: quizzes,
  };
};

export const fetchUserQuizzesFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_QUIZZES_FAIL,
    error: error,
  };
};

export const fetchUserQuizzesStart = () => {
  return {
    type: actionTypes.FETCH_USER_QUIZZES_START,
  };
};

export const updateProfessorAwardString = (award) => {
  return {
    type: actionTypes.UPDATE_PROFESSOR_AWARD_STRING,
    award: award,
  };
};

export const updateQuizAwardsString = (awards) => {
  return {
    type: actionTypes.UPDATE_QUIZ_AWARDS_STRING,
    awards: awards,
  };
};

//THIS IS HARDCODED BUT I AM TOO LAZY TO CARE!!! THE POINTS TO BE ADDED ARE HARD CODED
// AND THE LIMITS ARE ALSO HARDOCDED IN ACCORDANCE TO THE LIMITS DEFINED IN THE PROFESSOR AWARD COMPONENT
export const updateProfessorAwardData = (createdQuizzesLength, userData) => {
  let sheepPointsToAdd = 0;
  let awardAttained = "";
  if (createdQuizzesLength + 1 === 2) {
    sheepPointsToAdd += 300;
    awardAttained = "Professor Sheep Award (Bronze) +300 Sheep Points";
  } else if (createdQuizzesLength + 1 === 4) {
    sheepPointsToAdd = 750;
    awardAttained = "Professor Sheep Award (Silver) +750 Sheep Points";
  } else if (createdQuizzesLength + 1 === 6) {
    sheepPointsToAdd = 1200;
    awardAttained = "Professor Sheep Award (Gold) +1200 Sheep Points";
  } else if (createdQuizzesLength + 1 === 8) {
    sheepPointsToAdd = 2000;
    awardAttained = "Professor Sheep Award (Expert) +2000 Sheep Points";
  }
  const newData = {
    ...userData,
    sheepPoints: userData.sheepPoints + sheepPointsToAdd,
  };
  return (dispatch) => {
    dispatch(updateProfessorAwardString(awardAttained));
    dispatch(updateUserData(newData));
  };
};

export const updateQuizAwardsData = (
  attemptedQuizzes,
  userData,
  fullMarksBoolean,
  dailyQuizBoolean
) => {
  let awardsAttained = [];
  let sheepPointsToAdd = 0;
  if (attemptedQuizzes.length === 5) {
    sheepPointsToAdd += 300;
    awardsAttained = awardsAttained.concat(
      "Broad Horizons Sheep Award (Bronze) +300 Sheep Points"
    );
  } else if (attemptedQuizzes.length === 10) {
    sheepPointsToAdd += 750;
    awardsAttained = awardsAttained.concat(
      "Broad Horizons Sheep Award (Silver) +750 Sheep Points"
    );
  } else if (attemptedQuizzes.length === 15) {
    sheepPointsToAdd += 1200;
    awardsAttained = awardsAttained.concat(
      "Broad Horizons Sheep Award (Gold) +1200 Sheep Points"
    );
  } else if (attemptedQuizzes.length === 20) {
    sheepPointsToAdd += 2000;
    awardsAttained = awardsAttained.concat(
      "Broad Horizons Sheep Award (Expert) +2000 Sheep Points"
    );
  }
  if (fullMarksBoolean === true) {
    let fullMarkQuizzesLength = 0;
    for (let i = 0; i < attemptedQuizzes.length; i++) {
      if (attemptedQuizzes[i].questionNumber === attemptedQuizzes[i].score) {
        fullMarkQuizzesLength += 1;
      }
    }
    if (fullMarkQuizzesLength === 4) {
      sheepPointsToAdd += 300;
      awardsAttained = awardsAttained.concat(
        "Scholar Sheep Award (Bronze) +300 Sheep Points"
      );
    } else if (fullMarkQuizzesLength === 8) {
      sheepPointsToAdd += 750;
      awardsAttained = awardsAttained.concat(
        "Scholar Sheep Award (Silver) +750 Sheep Points"
      );
    } else if (fullMarkQuizzesLength === 12) {
      sheepPointsToAdd += 1200;
      awardsAttained = awardsAttained.concat(
        "Scholar Sheep Award (Gold) +1200 Sheep Points"
      );
    } else if (fullMarkQuizzesLength === 16) {
      sheepPointsToAdd += 2000;
      awardsAttained = awardsAttained.concat(
        "Scholar Sheep Award (Silver) +2000 Sheep Points"
      );
    }
  }
  if (dailyQuizBoolean === true) {
    let dailyQuizzesLength = 0;
    for (let i = 0; i < attemptedQuizzes.length; i++) {
      if (attemptedQuizzes[i].dailyQuiz) {
        dailyQuizzesLength += 1;
      }
    }
    if (dailyQuizzesLength === 1) {
      sheepPointsToAdd += 300;
      awardsAttained = awardsAttained.concat(
        "Hard Worker Award (Bronze) +300 Sheep Points"
      );
    } else if (dailyQuizzesLength === 2) {
      sheepPointsToAdd += 750;
      awardsAttained = awardsAttained.concat(
        "Hard Worker Award (Silver) +750 Sheep Points"
      );
    } else if (dailyQuizzesLength === 3) {
      sheepPointsToAdd += 1200;
      awardsAttained = awardsAttained.concat(
        "Hard Worker Award (Gold) +1200 Sheep Points"
      );
    } else if (dailyQuizzesLength === 4) {
      sheepPointsToAdd += 2000;
      awardsAttained = awardsAttained.concat(
        "Hard Worker Award (Expert) +2000 Sheep Points"
      );
    }
  }
  const newData = {
    ...userData,
    sheepPoints: userData.sheepPoints + sheepPointsToAdd,
  };
  return (dispatch) => {
    dispatch(updateQuizAwardsString(awardsAttained));
    dispatch(updateUserData(newData));
  };
};
