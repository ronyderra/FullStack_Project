import React from "react";
import { Card, Form, } from 'react-bootstrap';
import './basicCard.css'

export function BasicCard(props) {

    function doNow(event) {
        props.function(event)
    }

    return (
        <div>
            <Card bg={props.background} key={props.id}>
                <Card.Img className="cardImage" variant="top" src={props.imageUrl} />
                <Card.Body >
                    <Card.Title>{props.destination}</Card.Title>
                    <Card.Text>"  {props.description}  "</Card.Text>
                    <Card.Text>From: {props.dates} to: {props.toDate} </Card.Text>
                    <Card.Text>Price: {props.price}$ </Card.Text>
                    <Form.Check type="switch" id={props.id + "x"} label="" onChange={doNow} isValid />
                </Card.Body>
                <Card.Footer>
                    <small >{props.followers} people are following </small>
                </Card.Footer>
            </Card>
        </div>
    )
}

