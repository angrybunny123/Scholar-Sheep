import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import {
  Container,
  Row,
  Image,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import classes from "./Profile.module.css";
import { storage } from "../../../firebase";
import cuteSheep from "../../../assets/cutesheep1.jpg";

const ImageUpload = (props) => {
  const [image, setImage] = useState(null);
  const [upload, setUpload] = useState(false);
  // const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Sheep points can be earned through attempting and creating quizzes. They
        can also be earned through attaining awards!
      </Tooltip>
    );
  };

  const handleUpload = () => {
    //upload the image to firebase, image is the actual file.
    if (image === null) {
      alert("Please upload a valid image!");
      //lazy fix LAWL
    } else {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              const newData = {
                ...props.userData,
                url: url,
              };
              props.onUpdateUserData(newData);
            });
        }
      );
    }
  };

  let button = (
    <button
      className={classes.buttons}
      onClick={() => {
        setUpload(!upload);
      }}
    >
      Upload Profile Picture
    </button>
  );

  if (upload === true) {
    button = (
      <div className={classes.buttons}>
        <input type="file" onChange={handleChange} />
        <Button variant="outline-success" onClick={handleUpload}>
          Upload
        </Button>
        <Button
          variant="light"
          onClick={() => {
            setUpload(!upload);
          }}
        >
          x
        </Button>
      </div>
    );
  }

  if (props.userData.url) {
    button = (
      <button
        className={classes.buttons}
        onClick={() => {
          const userData = { ...props.userData, url: null };
          props.onUpdateUserData(userData);
        }}
      >
        Remove Profile Picture
      </button>
    );
  }

  let profilePicURL = cuteSheep;

  if (props.userData.url != null) {
    profilePicURL = props.userData.url;
  }

  let attempted = (
    <Row className={classes.profileDescription}>Attempted: 0</Row>
  );
  if (props.userData.quizHistory !== undefined) {
    attempted = (
      <Row className={classes.profileDescription}>
        Attempted: {props.userData.quizHistory.length}
      </Row>
    );
  }

  return (
    <div className={classes.Profile}>
      <Container>
        <Row className="justify-content-center">
          <Image
            src={profilePicURL}
            roundedCircle
            className={classes.displaypic}
          />
          {button}
        </Row>
        <br />
        <Row className={classes.username}>@{props.userData.username}</Row>
        <Row className={classes.profileDescription}>
          Sheep Points: {props.userData.sheepPoints}
          <OverlayTrigger
            placement="right"
            delay={{ show: 100, hide: 100 }}
            overlay={renderTooltip}
          >
            <div className={classes.questionMark}>?</div>
          </OverlayTrigger>
        </Row>
        {attempted}
        <Row className={classes.profileDescription}>
          Created: {props.createdQuizzes.length}
        </Row>
        <Row className={classes.profileDescription}>
          Joined: {props.userData.dateJoined}
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.account.userData,
    createdQuizzes: state.account.createdQuizzes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUserData: (userData) => dispatch(actions.updateUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
