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
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Donec vehicula nec orci eu faucibus. Cras lacus erat, finibus in faucibus at, 
                        mollis in elit. Sed dolor est, lacinia sit amet euismod a, viverra in nulla. 
                        Morbi quis hendrerit lorem. Nam eu enim ut purus aliquet aliquam. Maecenas id consequat nibh, 
                        accumsan vestibulum tortor. Etiam vitae mauris sed libero congue eleifend non vel risus. 
                        Praesent sed magna sed eros feugiat ullamcorper. "
        />
        <Row className={classes.CreatorRow}>
          <Col className={classes.CreatorCol}>
            <Creators
              creator="Kenneth"
              image={Kenneth}
              creatordesc="Kenneth desc"
              link="https://www.instagram.com/angrybunny_/"
            />
          </Col>
          <Col>
            <Creators
              creator="Penn Han"
              image={Pennhan}
              creatordesc="Pennhan desc"
              link="https://www.linkedin.com/in/penn-han-lee-b703321a6/"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default About;
