import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Container, Col, Row } from 'react-bootstrap';

import classes from './Account.module.css';
import QuickLinks from '../../components/Account/QuickLinks/QuickLinks';
import Profile from '../../components/Account/Profile/Profile';
import History from '../../components/Account/History/History';
import Award from '../../components/Account/Award/Award';
import * as actions from "../../store/actions/index";

import Kenneth from "../../assets/kenneth.jpg";
import Pennhan from "../../assets/pennhan.jpg";

class Account extends Component {

    // componentDidMount() {
    //     this.props.onInitUserDetails();
    // }

    createQuizLink = () => {
        this.props.history.push('/createQuiz');
    }

    quizListLink = () => {
        this.props.history.push('/quizzes');
    }

    render () {
        return (
            <div>
            <Container fluid> 
                <Row className={classes.topcontainer}>
                    <Col md={4}>
                        <Profile
                            displaypic={Kenneth}
                            name="Scholarsheep"
                            email="Test@Test.com"
                            level= "100"
                        />
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Award 
                                    awardimage={Kenneth}
                                    awardname="Handsome Award"
                                    awarddesc="For being Handsome"/>
                            </Col>
                            <Col>
                                <Award 
                                    awardimage={Kenneth}
                                    awardname="Handsome Award"
                                    awarddesc="For being Handsome"/>
                            </Col>
                            <Col>
                                <Award 
                                    awardimage={Kenneth}
                                    awardname="Handsome Award"
                                    awarddesc="For being Handsome"/>
                            </Col>
                            <Col>
                                <Award 
                                    awardimage={Kenneth}
                                    awardname="Handsome Award"
                                    awarddesc="For being Handsome"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container fluid className={classes.bottomcontainer}>
                <Row>
                    <Col>
                        <History />
                    </Col>
                    <Col>
                        <QuickLinks
                            clicked={this.createQuizLink}
                            LinkName=" Create A Quiz "/>
                        <QuickLinks
                            clicked={this.quizListLink}
                            LinkName=" Quiz List "/>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.email,
        award1: state.award1,
        award2: state.award2,
        award3: state.award3,
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onInitUserDetails: () => dispatch(actions.initUserDetails())
//     }
// }

export default Account;