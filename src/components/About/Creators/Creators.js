import React from 'react';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';

import classes from './Creators.module.css';

const creators = (props) => {
    return(
        <div>
            <Card style={{width: '20rem', margin: 'auto'}}>
                <Card.Header>{props.creator}</Card.Header>
                <Card.Img varient="top" src={props.image} />
                <Card.Body>
                    <Card.Text>{props.creatordesc}</Card.Text>
                    <a href={ props.link }>
                        <button>Connect Now!</button>
                    </a>
                </Card.Body>
            </Card>
        </div>
    );
};

export default creators;
