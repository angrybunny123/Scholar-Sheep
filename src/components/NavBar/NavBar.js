import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import classes from "./NavBar.module.css";
import { Link } from "react-router-dom";

import orbitalLogo from "../../assets/orbitallogo.png";
// import accountButton from "../../assets/accountbutton.PNG";
// import createButton from "../../assets/createbutton.PNG";
// import homeButton from "../../assets/homebutton.PNG";
// import quizzesButton from "../../assets/quizbutton.PNG";
// import aboutButton from "../../assets/aboutbutton.PNG";

const navBar = () => {
  return (
    <Navbar expand="lg" style={{ padding: "1rem", backgroundColor: "#3a60be" }}>
      <Navbar.Brand style={{ marginRight: "50px" }}>
        <img src={orbitalLogo} style={{ width: "3rem" }} alt="orbitalLogo" />
        <div
          style={{
            display: "inline-block",
            fontSize: "1.3rem",
            marginLeft: "0.2rem",
          }}
        >
          Scholar-sheep
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link>
            <Link className={classes.NavBarLink} to="/">
              {/* <img src={homeButton} alt="homeButton" /> */}
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className={classes.NavBarLink} to="/account">
              {/* <img src={accountButton} alt="accountButton" /> */}
              Account
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className={classes.NavBarLink} to="/quizzes">
              {/* <img src={quizzesButton} alt="quizzesButton" /> */}
              Quizzes
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className={classes.NavBarLink} to="/createQuiz">
              {/* <img src={createButton} alt="createButton" /> */}
              Create Quiz
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className={classes.NavBarLink} to="/about">
              {/* <img src={aboutButton} alt="aboutButton" /> */}
              About
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link className={classes.NavBarLink} to="/logout">
              Logout
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default navBar;
