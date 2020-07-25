import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import classes from "./About.module.css";
import Description from "../../components/About/Description/Description";
import Creators from "../../components/About/Creators/Creators";

import Kenneth from "../../assets/kenneth.jpg";
import Pennhan from "../../assets/pennhan.jpg";

class About extends Component {
  render() {
    return (
      <div>
        <h1 className={classes.TitleBox}>About Scholarsheep</h1>
        <Description
          description="The Brainchild of two aspiring Software Developers, Kenneth and Penn Han. Scholarsheep 
            was created for the Apollo 11 Grade of Orbital 2020. In this web application, users can attempt quickfire quizzes
            that is set to expand their horizons and increase their general knowledge about the world. If interested, users can
            also create their own quiz in our whole array of topics to share their knowledge to the world. 
            So what are you waiting for? Become a scholarsheep TODAY!"
        />
        <Row className={classes.CreatorRow}>
          <Col className="col-sm-6">
            <Creators
              creator="Kenneth"
              image={Kenneth}
              creatordesc=""
              link="https://www.instagram.com/angrybunny_/"
            />
          </Col>
          <Col className="col-sm-6">
            <Creators
              creator="Penn Han"
              image={Pennhan}
              creatordesc=""
              link="https://www.linkedin.com/in/penn-han-lee-b703321a6/"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default About;
