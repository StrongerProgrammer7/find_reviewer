
import React, { FC,useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { IWorkModal } from '../../../store/interfaces/IWorkModal';
import { IUser } from '../../../store/interfaces/IDataUser';
import { MyInput } from '../Inputs/MyInput';
import { saveChanges, fillInputs } from './utils';
import { useSelector, useDispatch } from "react-redux";

const MyPopup:FC<IWorkModal> = ({ show, handleClose}: IWorkModal) => 
{
    const user = useSelector((state:IUser)=>state);
    const dispatch = useDispatch();

    const [loginInput,setLoginInput] = useState<string>('');
    const [repoInput,setRepoInput] = useState<string>('');
    const [blacklistInput,setBlacklistInput] = useState<string>('');
    const [isReadInputData, setReadInputData] = useState(false);
    useEffect(()=>
    {
        fillInputs(user,{loginInput,repoInput,blacklistInput,setLoginInput,setRepoInput,setBlacklistInput});
        
    },[]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MyInput 
                titleLabel='Your login'
                placeholder='login'
                _defaultValue={loginInput}
                setState={setLoginInput}
                setStateLoading={setReadInputData}
                />
                <MyInput 
                titleLabel='Your repo'
                placeholder='repo'
                _defaultValue={repoInput}
                setState={setRepoInput}
                setStateLoading={setReadInputData}
                />
                <MyInput 
                titleLabel='Blacklist'
                placeholder='using ,'
                _defaultValue={blacklistInput}
                setState={setBlacklistInput}
                setStateLoading={setReadInputData}
                />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            {isReadInputData ?
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                <Button variant="primary" onClick={()=> 
                    saveChanges(dispatch,
                    {
                        loginInput,
                        repoInput,
                        blacklistInput
                    },
                    handleClose)}>Save Changes
                </Button>
            }  
            </Modal.Footer>
        </Modal>
    )
}

export default MyPopup
