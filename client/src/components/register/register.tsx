import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import "./register.css"

interface RegisterState {
    firstName: string,
    lastName: string,
    password: number,
    userName: string,
    validated: boolean
}

export class Register extends Component<any, RegisterState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            password: null,
            userName: null,
            validated: false
        }
    }
    public handleSubmit = async (event) => {

        // const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        const response = await axios.post<any>("/api/auth/register", this.state, { withCredentials: true });

        if (response.data.err) {
            alert(response.data.err)
        }
        else {
            alert("all good")
            this.setState({
                validated: true
            })
            this.props.history.push("/login")
        }


    }

    public handleInputChange = (event) => {
        const val = event.target.value
        const name = event.target.name
        switch (name) {
            case "firstName":
                this.setState({
                    firstName: val
                })
                break;
            case "lastName":
                this.setState({
                    lastName: val
                })
                break;
            case "password":
                this.setState({
                    password: val
                })
                break;
            case "userName":
                this.setState({
                    userName: val
                })
                break;
        }
    }

    public render() {
        const { validated } = this.state
        return (

            <div className='register'>
                <NavLink to="/login" exact>go back</NavLink>

                <h1>Register</h1>

                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                name="firstName"
                                onChange={this.handleInputChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                name="lastName"
                                onChange={this.handleInputChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    name="userName"
                                    onChange={this.handleInputChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>

                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="text" placeholder="password"
                                required name="password"
                                onChange={this.handleInputChange} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                          </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit">Submit form</Button>
                </Form>
            </div>
        )
    }

}