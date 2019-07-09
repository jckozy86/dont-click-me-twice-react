import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

class About extends Component {

    render() {
        return(
            <Container>
                <Row>
                    <h1> About the game </h1>
                    <p> Click the pics only once</p>
                    <p> You win if you click all gifs</p>
                    <p> Game resets if you click a gif twice</p>
                </Row>
            </Container>
        )
    }
}

export default About;