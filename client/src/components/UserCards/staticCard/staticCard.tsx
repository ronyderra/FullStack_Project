import React from "react";
import { Button, Col } from "react-bootstrap";
import './staticCard.css'

export function StaticCard(props) {
    return (
            <Col xs={12} md={6} key={props.id} className="imagesContainer">
                <img className="layoutImage" src={props.imageUrl} alt="" />
                <div className="topLeft" >
                    <div>
                        <h3 className="title" >{props.destination}</h3>
                        <p className="text">Dates: {props.dates} <br /> To: {props.toDate}</p>
                    </div>
                </div>
                <div className="middle">
                    <Button>Order Ticket</Button>
                </div>
                <div className="bottomRight">
                    <div className="bottomRightBr">
                        <span className="span1">Average Price:</span><br />
                        <span className="span2" > {props.price}$</span>
                    </div>
                </div>
            </Col>
    )
}