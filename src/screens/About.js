import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button, Col, Container, Row } from 'react-bootstrap';

class About extends Component {

    render() {
        return(
            <Container>
                <Row>
                    <h1> About Us </h1>
                    <p> typing for the sake of typing</p>
                </Row>
            </Container>
        )
    }
}

export default About;