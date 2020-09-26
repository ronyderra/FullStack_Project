import React, { Component } from "react"
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ModalPopUp } from "../modalPopUp/modalPopUp";
import { Button } from "react-bootstrap";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ActionType } from "../../redux/action-type";

const instance = axios.create({
    withCredentials: true
})

interface AddVacationPageState {
    destination: null,
    description: null,
    dates: null,
    price: null,
    toDate: null,
    image: null
    modalBool: boolean,
}

class AddVacationPage extends Component<any, AddVacationPageState> {
    public modalBool: boolean = false
    public constructor(props: any) {
        super(props);
        this.state = {
            destination: null,
            description: null,
            dates: null,
            price: null,
            toDate: null,
            image: null,
            modalBool: false,
        }
    }

    public submitVacation = async () => {
        const fd = new FormData();
        fd.append('image', this.state.image)
        fd.append('destination', this.state.destination)
        fd.append('description', this.state.description)
        fd.append('dates', this.state.dates)
        fd.append('price', this.state.price)
        fd.append('toDate', this.state.toDate)
        const response = await instance.post<any>("api/vacation/addVacation", fd, {})
        // update store
        this.props.dispatch({ type: ActionType.AddVacation, payload: response.data })
        this.setState({
            modalBool: true
        })
    }

    public close = () => {
        this.setState({
            modalBool: false
        })
    }
    public RedirectToAdminHome = async () => {
        this.setState({
            modalBool: false
        })
        this.props.history.push("/adminHome");
    }

    public handleInputChange = (event) => {
        const val = event.target.value
        const name = event.target.name
        switch (name) {
            case "destination":
                this.setState({
                    destination: val
                })
                break;
            case "description":
                this.setState({
                    description: val
                })
                break;
            case "dates":
                this.setState({
                    dates: val
                })
                break;
            case "toDate":
                this.setState({
                    toDate: val
                })
                break;
            case "price":
                this.setState({
                    price: val
                })
                break;
            case "image":
                this.setState({
                    image: event.target.files[0]
                })
                break;
        }
    }



    public render() {
        return (
            <div className="addVacation">
                <h1>Add Vacation</h1>
                <NavLink to="/adminHome" exact>go back</NavLink>
                <div className="addVacationForm">
                    <label htmlFor="destination">destination:</label>
                    <input name="destination" onChange={this.handleInputChange} type="text" placeholder="add destination" /><br />
                    <label htmlFor="description">description:</label>
                    <input name="description" onChange={this.handleInputChange} type="text" placeholder="add description" /><br />
                    <label htmlFor="dates">from:</label>
                    <input name="dates" onChange={this.handleInputChange} type="date" placeholder="add dates" /><br />
                    <label htmlFor="toDate">to:</label>
                    <input name="toDate" onChange={this.handleInputChange} type="date" placeholder="add dates" /><br />
                    <label htmlFor="price">price:</label>
                    <input name="price" onChange={this.handleInputChange} type="number" placeholder="add price" /><br />
                    <label htmlFor="image">image:</label>
                    <input name="image" onChange={this.handleInputChange} type="file" placeholder="add image" accept="image/*" /><br />
                    <Button onClick={this.submitVacation}>submit</Button><br />
                </div>
                <ModalPopUp toggle={this.state.modalBool} firstOptionText={"close"} firstOption={this.close}
                    secondeOptionText={"admin home"} secondeOption={this.RedirectToAdminHome}
                    title={""} question={"vacation has been added sucessfully!"} />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        //prop name : value from redux
        allVacations: state.vacations
    }
}

export const AddVacation = withRouter(connect(mapStateToProps)(AddVacationPage))     