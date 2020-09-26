import React from "react";
import './EditBasicAdminCard.css'

export function EditBasicAdminCard(props) {
    return (
        <form className="vacationCard" key={props.id} onChange={(e: any) => props.onVacationChange(e, props.id)}>
            <button type='button' onClick={props.deleteVacation} value={props.id}>x</button>
            <button type='button' onClick={() => props.saveVacation(props.id)} value={props.id}>save</button>
            <div>Vacation description: <input name='description' defaultValue={props.description} /></div>
            <div>Destination: <input name='destination' defaultValue={props.destination} /></div>
            <div>Dates: <input name='dates' defaultValue={props.dates} /></div>
            <div>price: <input name='price' defaultValue={props.price} /></div>
            <div>toDate: <input name='toDate' defaultValue={props.toDate} /></div><br />
        </form>
    )
}