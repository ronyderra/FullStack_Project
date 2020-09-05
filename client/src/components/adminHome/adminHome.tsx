import React, { Component, } from "react";
import { VacationsTableModel } from "../../models/vacation-model";
import axios from "axios";
import socket from "../../socket";
import { NavLink } from "react-router-dom";
import { ActionType } from "../../redux/action-type";
import { Modal, Button, } from "react-bootstrap";
import "./adminHome.css"


// connect redux to componet
import { connect } from 'react-redux'


interface AdminHomeState {
    onEdit: object,
    show: boolean,
    valueTodelete: null

}

class AdminHomePage extends Component<any, AdminHomeState>{



    public constructor(props: any) {
        super(props);
        this.state = {
            onEdit: {},
            show: false,
            valueTodelete: null
        }
    }

    //
    public toggleEdit = (id: number) => {
        const { onEdit } = this.state;

        if (onEdit[id]) {//if onEdit[id] exist then delete it
            delete onEdit[id]
        } else {
            onEdit[id] = {};//if it does not exist then create one
        }
        this.setState({ onEdit: { ...onEdit } })//update the state with new values
    }

    public async componentDidMount() {
        try {

            socket.on("admin-change-delete", id => {
                this.props.dispatch({ type: ActionType.DeleteVacation, payload: id })
            })
            socket.on("admin-change-add", (newVacation) => {
                this.props.dispatch({ type: ActionType.AddVacation, payload: newVacation })
            })
            socket.on("admin-change-update", (id, update) => {
                this.props.dispatch({ type: ActionType.UpdateVacation, payload: id, update })
            })


            if (this.props.allVacations.length > 0) {
                return;
            }

            const response = await axios.get<VacationsTableModel[]>("/api/vacation/allVacations", { withCredentials: true });
            const allVacations = response.data;
            // update store
            this.props.dispatch({ type: ActionType.GetAllVacations, payload: allVacations })
        }
        catch (err) {
            alert(err.message);
        }
    }



    public deleteVacation = async () => {

        const deleteDestinationId = this.state.valueTodelete           //id.target.value;
        await axios.delete<any>(`/api/vacation/delete/` + deleteDestinationId, { withCredentials: true })
        const newVacations = this.props.allVacations.filter(v => v.id !== Number(deleteDestinationId));
        this.props.dispatch({ type: ActionType.GetAllVacations, payload: newVacations })
    }

    public onVacationChange = (e: any, id: any) => {
        const { onEdit } = this.state;
        const { name, value } = e.target;

        onEdit[id] = { ...onEdit[id], [name]: value };//adds the new values
        this.setState({ onEdit: { ...onEdit } })//updates the state
    }


    public saveVacation = async (id: any) => {
        const { onEdit } = this.state;
        const { allVacations, dispatch } = this.props;

        const data = onEdit[id];//gets all the new data

        await axios.put<any>(`/api/vacation/updateVac/${id}`, { update: data }, { withCredentials: true });

        const vacationIndex = allVacations.findIndex(v => v.id === id)//looking for the index that we need to chand
        allVacations[vacationIndex] = { ...allVacations[vacationIndex], ...data }//replacing with new data
        dispatch({ type: ActionType.GetAllVacations, payload: [...allVacations] })
        this.toggleEdit(id)//in order to delete what has already bin changed
    }


    public handleClose = async (event) => {


        let value = event.target.value

        if (value === '1') {
            this.setState({ show: false });
        }
        else {
            this.setState({ show: false })
            await this.deleteVacation()
        }


    }


    public handleShow = (event) => {
        let id = event.target.value

        this.setState({ valueTodelete: id })
        this.setState({ show: true })


    }

    public render() {

        const { show, onEdit } = this.state

        return (
            <div className="adminHome">

                <h1>Admin Home All Vacations</h1>
                <div className="breadCrom">
                    <NavLink to="/vacationChart" exact>Watch Analitycs / </NavLink>
                    <NavLink to="/addVacation" exact>Add Vacation</NavLink><br />
                </div>
                <br /><br />


                {this.props.allVacations.map((vacation, key) => {

                    if (onEdit[vacation.id]) {

                        return (
                            <form className="vacationCard" key={key} onChange={(e: any) => this.onVacationChange(e, vacation.id)}>

                                <button type='button' onClick={this.deleteVacation} value={vacation.id}>x</button>
                                <button type='button' onClick={() => this.saveVacation(vacation.id)} value={vacation.id}>save</button>

                                <div>Vacation description: <input name='description' defaultValue={vacation.description} /></div>
                                <div>Destination: <input name='destination' defaultValue={vacation.destination} /></div>
                                <div>Dates: <input name='dates' defaultValue={vacation.dates} /></div>
                                <div>price: <input name='price' defaultValue={vacation.price} /></div>
                                <div>toDate: <input name='toDate' defaultValue={vacation.toDate} /></div><br />
                            </form>
                        )
                    }

                    return (
                        <div className="vacationCard" key={key}>
                            <button onClick={this.handleShow} value={vacation.id}>x</button>
                            <button onClick={() => this.toggleEdit(vacation.id)} value={vacation.id}>edit</button>
                            <div> <b>Description: </b> {vacation.description}</div>
                            <div><b> Destination:</b> {vacation.destination}</div>
                            <div><b>Dates:</b> {vacation.dates}</div>
                            <div><b>Price:</b> {vacation.price}</div>
                            <div><b>To Date:</b> {vacation.toDate}</div><br />
                        </div>
                    )
                })
                }
                <Modal show={show} onHide={() => this.setState({ show: false })}>

                    <Modal.Header closeButton>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Are you sure want to delete this vacation?</Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={this.handleClose} value={1}>  do not delete </Button>
                        <Button variant="primary" onClick={this.handleClose} value={2}> delete </Button>

                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

// take values from state(redux) and set as  component props
function mapStateToProps(state) {
    return {
        //prop name : value from redux
        allVacations: state.vacations
    }
}

export const AdminHome = connect(mapStateToProps)(AdminHomePage);