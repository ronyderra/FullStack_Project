import React from "react";
import { Form, Col, } from 'react-bootstrap';
import Flippy, { FrontSide, BackSide } from 'react-flippy';

import './flippyCard.css'


export function FlippyCard(props) {

    function doNow(event) {
        props.function(event)
    }


    return (
        <div>
            <Col key={props.id}>
                <Flippy className="flippy-container" flipOnHover={true} flipDirection="vertical" style={{ width: '350px', height: '350px' }} >
                    <FrontSide style={{ backgroundColor: '#007bff', }}>
                        {props.destination}
                        <img className="flippyImg" src={props.imageUrl} alt="" />
                    </FrontSide>
                    <BackSide style={{ backgroundColor: '#FFFFFF' }}>
                        <h5>price: {props.price}$</h5>
                        <br />
                        <p> {props.description}</p>
                        <p>From: {props.dates} to: {props.toDate} </p>
                        <Form.Check type="switch" id={props.id + "x"} label="follow" onChange={doNow} isValid />
                    </BackSide>
                </Flippy>
            </Col>
        </div>
    )


}