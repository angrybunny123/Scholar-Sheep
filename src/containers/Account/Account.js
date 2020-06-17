import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Col, Row } from 'react-bootstrap';

import classes from './Account.module.css';
import QuickLinks from '../../components/Account/QuickLinks/QuickLinks';
import Profile from '../../components/Account/Profile/Profile';
import History from '../../components/Account/History/History';
import Award from '../../components/Account/Award/Award';

import Kenneth from "../../assets/kenneth.jpg";
import Pennhan from "../../assets/pennhan.jpg";

class Account extends Component { 
    render () {
        return (
            <div>
                <Row>
                    <Col>
                        <Profile
                            name="Scholarsheep"
                            email="Test@Test.com"
                            level="Level 100"
                        />
                    </Col>
                    <Col>
                        <QuickLinks
                            LinkName=" Create A Quiz "/>
                        <QuickLinks
                            LinkName=" Quiz Link "/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <History />
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
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

// const mapStateToProps = () => {
//     return {

//     }
// }

// const mapDispatchToProps = () => {
//     return {

//     }
// }

export default Account;