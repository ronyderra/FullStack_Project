
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './loading.css'
export function Loading(props) {

    return (
        <div>
            <Container>
                <Row>
                    <Col md={{ span: 9, offset: 3 }}  >
                        <div className="container">
                            <img className="loading" src="/assets/loading.gif" alt="Loading" />
                            <div className="centered">loading</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )


}