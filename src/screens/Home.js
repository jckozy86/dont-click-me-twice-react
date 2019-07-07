import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button, Col, Container, Row } from 'react-bootstrap';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            results: [],
        }
    }

    componentDidMount() {
        this.getGifs();
    }

    

    getGifs() {
        axios.get('https://api.giphy.com/v1/gifs/trending?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9')
            .then((response) => {

                let pics = [];
                let temp = response.data.data;

                for( var i=0; i<12; i++){
                    pics.push(temp[i]);
                }

                this.setState({
                    results: pics,
                })
                console.log(this.state.results);
            })
    }

    renderImages() {
        return (this.state.results.map((result) => {
            const { id, images: { original: { url } } } = result
            return (
                <Col xs={12} sm={6} md={4}>
                    <Card key={id} clicked="false" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={url} />
                    </Card>
                </Col>
            )
        }))
    }

    render() {
        return (
            <Container>
                <Row>
                    {this.renderImages()}
                </Row>
            </Container>
        )
    }
}

export default Home;