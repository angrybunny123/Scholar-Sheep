import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import classes from './Description.module.css';

const description = (props) => {
    return(
        <div className={classes.DescriptionBox}>
            <Container className={classes.Description}>
                <p>{ props.description }</p>
            </Container>
        </div>
    );
}

export default description;