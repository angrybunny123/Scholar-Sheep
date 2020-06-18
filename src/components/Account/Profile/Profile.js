import React from 'react';

import classes from './Profile.module.css';
import { Container, Row, Col, Image } from 'react-bootstrap';


const profile = (props) => {
    return (
        <div>
            <Container>
                <Row>
                    {/* <Image src= {require( `${props.image}` )} alt={props.imagealt} roundedCircle className="displaypicture" /> */}
                    <Image src={props.displaypic} roundedCircle className={classes.displaypic} />
                </Row>
                <Row className={classes.restrow}> Name:  { props.name } </Row>
                <Row className={classes.restrow}> Email: { props.email }</Row>
                <Row className={classes.btmrow}> Level: { props.level } </Row>
            </Container>
        </div>
    );
};

export default profile;