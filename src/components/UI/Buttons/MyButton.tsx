
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import { IWorkModal } from '../../../store/interfaces/IWorkModal';
const MyButton:FC<{title:string,modal:IWorkModal}> = ({title,modal}:{title:string,modal:IWorkModal}) => 
{
    return (
        <>
        <Button variant="primary"
        className='mt-5'
        onClick={e=>
        {
            if(modal.handleShow)
                modal.handleShow();
        }}
        > {title} </Button>
        
       
        </>
    )
}

export default MyButton
