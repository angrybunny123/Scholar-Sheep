import React, { Component } from "react";
import Bronze from "../../../../assets/Awards/BroadHorizon_Bronze.png";
import Silver from "../../../../assets/Awards/BroadHorizon_Silver.png";
import Gold from "../../../../assets/Awards/BroadHorizon_Gold.png";
import Expert from "../../../../assets/Awards/BroadHorizon_Expert.png";
import NoAward from "../../../../assets/Awards/NoAward.png";

import {
  Container,
  Col,
  Row,
  ProgressBar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import classes from "./AwardInfo.module.css";

class awardInfo extends Component {
  renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        40/100 (Progress to your next award)
      </Tooltip>
    );
  };
  render() {
    return (
      <div className={classes.AwardInfo}>
        There are 4 attainable awards in Scholar Sheep: Broad Horizons, Hard
        Worker, Professor Sheep, and Scholar Sheep. Each award consists of 5
        different tiers, and achieving each tier (by meeting the requirements
        displayed) will grant you a significant amount of sheep points. The
        tiers are as follows:
        <Container fluid style={{ marginTop: "1rem" }}>
          <Row>
            <Col className="col-2">
              <img src={NoAward} className={classes.Image} alt="Novice" />
              <div className={classes.header}>Novice</div>
            </Col>
            <Col className="col-2">
              <img src={Bronze} className={classes.Image} alt="Bronze" />
              <div className={classes.header}>Bronze</div>
            </Col>
            <Col className="col-2">
              <img src={Silver} className={classes.Image} alt="Silver" />
              <div className={classes.header}>Silver</div>
            </Col>
            <Col className="col-2">
              <img src={Gold} className={classes.Image} alt="Gold" />
              <div className={classes.header}>Gold</div>
            </Col>

            <Col className="col-2">
              <img src={Expert} className={classes.Image} alt="Expert" />
              <div className={classes.header}>Expert</div>
            </Col>
          </Row>
          <Row style={{ marginTop: "2rem" }}>
            <Col className="col-6">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 100 }}
                overlay={this.renderTooltip}
              >
                <ProgressBar striped variant="success" now={40} />
              </OverlayTrigger>
            </Col>
            <div style={{ marginTop: "2rem" }}>
              The progress bar indicates your progress towards the next award.
              Hover over it to see your current progress for each award!
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default awardInfo;
