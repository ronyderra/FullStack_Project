import React from "react";
import { Card, Form, Button, } from 'react-bootstrap';
import './basicAdminCard.css'

export function BasicAdminCard(props) {
    return (
        <div>
            <Card bg={props.background} key={props.id}>
                <Button onClick={props.handleShow} value={props.id}>x</Button>
                <Button onClick={() => props.toggleEdit(props.id)} value={props.id}>edit</Button>
                <Card.Img className="cardImage" variant="top" src={props.imageUrl} />
                <Card.Body >
                    <Card.Title>{props.destination}</Card.Title>
                    <Card.Text>"  {props.description}  "</Card.Text>
                    <Card.Text>From: {props.dates} to: {props.toDate} </Card.Text>
                    <Card.Text>Price: {props.price}$ </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small >{props.followers} people are following </small>
                </Card.Footer>
            </Card>
        </div>
    )
}
