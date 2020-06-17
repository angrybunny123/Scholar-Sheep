import React from 'react';

import './Profile.module.css';
import { Container, Row, Col, Image } from 'react-bootstrap';


const profile = (props) => {
    return (
        <div>
            <Container>
                <Row>
                    {/* <Image src= {require( `${props.image}` )} alt={props.imagealt} roundedCircle className="displaypicture" /> */}
                    <p> There will be a display picture </p>
                </Row>
                <Row> Name:  { props.name } </Row>
                <Row> Email: { props.email }</Row>
                <Row> Level { props.level } </Row>
            </Container>
        </div>
    );
};

export default profile;