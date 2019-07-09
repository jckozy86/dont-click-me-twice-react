import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button, Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            score: 0,
            results: [],
            clicked: [],
            showModal: false,
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
            })
    }

    gifyClicked = event => {
        
        const { clicked, results, score } = this.state;

        if (clicked.includes(event.target.id) && score < 12) {
            //window.alert("Pic has been clicked before... Game resetting", 'error');

            this.setState({
                results: this.shuffle(results),
                score: 0,
                clicked: [],
                showModal: true,
                won: false,
            })
        } else if( score === 11 ) {
            this.setState({
                score: 0,
                clicked: [],
                showModal: true,
                won: true,
            })
        } else {

            let newClicked = clicked.splice(0);
            newClicked.push(event.target.id);

            let newResults = this.shuffle(results);

            this.setState({
                results: newResults,
                score: score + 1,
                clicked: newClicked,
                won: false,
            })
        }

    }

    renderImages = () => {

        const { results, showModal, won } = this.state;

        return (results.map((result) => {
            //console.log(result.id)
            return (
                <>
                    <Modal
                        isOpen={showModal}
                        // onAfterOpen={this.afterOpenModal}
                        // onRequestClose={this.handleCloseModal}
                        style={customStyles}
                        contentLabel="Game Announcement Modal"
                        ariaHideApp={false}
                        key="Modal"
                    >

                        <h2 ref={subtitle => this.subtitle = subtitle}>Game Announcement:</h2>
                        <Button onClick={this.handleCloseModal}>close</Button>
                        <div>{(won) ? "You Won!" : "You clicked a gif twice... Game resetting"}</div>
                    </Modal>
                    <Col id={"column-" + result.id} key={"column-" + result.id} xs={12} sm={6} md={4}>
                        <Card tag="a" onClick={this.gifyClicked} id={"card" + result.id} key={"card" + result.id} clicked="false" style={{ width: '18rem', cursor: "pointer" }}>
                            <Card.Img key={result.id} id={result.id} variant="top" src={result.url} />
                        </Card>
                    </Col>
                </>
            )
        }))
    }

    shuffle = (array) => {

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

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }


    render() {

        const { results, score } = this.state;

        if (results != null && results.length > 0) {

            return (
                <>
                    <h1>Score: {score}</h1>
                    <Container>
                        <Row>
                            {this.renderImages()}
                        </Row>
                    </Container>
                </>
            )
        } else {
            return null;
        }
    }
}

export default Home;