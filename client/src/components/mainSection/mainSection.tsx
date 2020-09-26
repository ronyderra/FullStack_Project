import React from "react";
import { Button, Row, Col,  Image } from "react-bootstrap";
import './mainSection.css'

export function MainSectionUi(props) {
    function leftSideHandelClick() {
        props.btnFunction()
    }
    function rightSideHandelClick() {
        props.btnFunction()
    }
    return (
            <Row>
                <Col  sm={12} md={4} className='textContainer'>
                    <h4>{props.title}</h4>
                    <p>{props.paragrph}</p>
                    <Button onClick={leftSideHandelClick}>{props.leftSideBtnText}</Button>
                </Col>
                <Col sm={12} md={8} className="imagesContainer">
                    <Image id={'mainImage'} src="/assets/mainImage.jpg" alt="" fluid />
                    <div className='bottomRight'>
                        <Image id={'secondaryImg'} src="/assets/secondaryImg.webp" alt="" fluid />
                    </div>
                    <Button onClick={rightSideHandelClick}>{props.rightSideBtnText}</Button>
                </Col>
            </Row>
    )
}