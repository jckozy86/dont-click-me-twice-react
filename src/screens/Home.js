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

                for (var i = 0; i < 12; i++) {
                    let picObj = {};
                    picObj.url = temp[i].images.original.url;
                    picObj.id = temp[i].id;
                    picObj.clicked = false;
                    pics.push(picObj);
                }

                this.setState({
                    results: pics,
                })
                console.log(this.state.results);
            })
    }

    gifyClicked = event => {
        console.log("Clicked image");
        console.log(event.target);

        const { results } = this.state;

        let newPics = this.shuffle(results);

        this.setState({
            results: newPics,
        })

    }

    renderImages() {

        const { results } = this.state;

        return (results.map((result) => {
            //console.log(result.id)
            return (
                <Col xs={12} sm={6} md={4}>
                    <Card tag="a" onClick={this.gifyClicked} id={result.id} key={result.id} clicked="false" style={{ width: '18rem', cursor: "pointer" }}>
                        <Card.Img key={result.id} id={result.id} variant="top" src={result.url} />
                    </Card>
                </Col>
            )
        }))
    }

    shuffle(array) {

        let newArray = array.slice(0);

        var currentIndex = newArray.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = newArray[currentIndex];
            newArray[currentIndex] = newArray[randomIndex];
            newArray[randomIndex] = temporaryValue;
        }

        return newArray;
    }




    render() {

        //const { results } = this.state;

        if (this.state && this.state.results != null && this.state.results.length > 0) {

            return (
                <Container>
                    <Row>
                        {this.renderImages()}
                    </Row>
                </Container>
            )
        } else {
            return null;
        }
    }
}

export default Home;