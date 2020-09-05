
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export function ModalPopUp(props) {

    function handleClose(event) {
        
        if (event.target.value === '2') {
            props.secondeOption()
        } else {
            props.firstOption()
        }
    }

    function onHide(){
        if(props.functionA){
            props.functionA();
        }
    }


    return (
        <div>
            <Modal onHide={onHide} centered={true} show={props.toggle} >

                <Modal.Header >
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>{props.question}</Modal.Body>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose} value={1}>  {props.firstOptionText}</Button>
                    <Button variant="primary" onClick={handleClose} value={2}>  {props.secondeOptionText} </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
}