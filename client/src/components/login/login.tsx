import React, { Component } from "react";
import "./login.css"
import { UserInfoModel } from "../../models/userInfo-model"
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Form, Col, Container, Button, Row } from "react-bootstrap";

interface LoginState {
    userName
    password
}

export class Login extends Component<any, LoginState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            userName: "",
            password: null,
        }
    };

    public isFormLegal = async () => {
        const response = await axios.post<UserInfoModel>("/api/auth/login", this.state, { withCredentials: true });
        const user = response.data;
        sessionStorage.setItem("isAdmin", String(user.isAdmin));
        this.props.data.changeName(user.firstName)
        if (typeof (user) === "string") {//if user dosnt exist
            alert(user);
            // go to resitration
            this.props.history.push("/register");
        };
        if (typeof (user) === "object") {
            // if admin redirect to admin page else to user page
            if (user.isAdmin === 1) {
                this.props.history.push("/adminHome");
            } else {
                this.props.history.push("/userHome");
            };
        }
    }

    public handleInputChange = (event) => {
        const val = event.target.value
        const name = event.target.name
        switch (name) {
            case "userName":
                this.setState({
                    userName: val
                })
                break;
            case "password":
                this.setState({
                    password: val
                })
                break;
        }
    }


    public render() {
        return (
            <div className="login">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control name="userName" onChange={this.handleInputChange}  placeholder="Enter user name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit"> Submit</Button>
                </Form>
                {/* <h6 id="title">Sign In</h6>
                        <Container fluid={"sm"}>
                            <Form >
                                <Row className="justify-content-md-center" >
                                    <Col sm={12} lg="6"> <Form.Label>User Name:</Form.Label>  <Form.Control name="userName" size="sm" placeholder="User name" onChange={this.handleInputChange} /> </Col>
                                </Row>
                                <Row className="justify-content-md-center" >
                                    <Col sm={12} lg="6"> <label >Password:</label>  <Form.Control name="password" size="sm" placeholder="Password" onChange={this.handleInputChange} /> </Col>
                                </Row>
                                <Row >
                                    <Col sm={12} lg={{ span: 8, offset: 2 }}>
                                        <NavLink to="/register" exact> go register</NavLink>/
                                <NavLink to="/userHome" exact>enter as a guest</NavLink>
                                    </Col>
                                </Row>
                                <Row className="justify-content-md-center" >
                                    <Col sm={12} lg="3"> <Button size="sm" block onClick={this.isFormLegal}>login</Button></Col>
                                </Row>
                            </Form>
                        </Container> */}
            </div>
        )
    }
}