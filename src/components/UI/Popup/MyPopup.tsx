
import React, { FC,useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { IWorkModal } from '../../../store/interfaces/IWorkModal';
import { IDataUser } from '../../../store/interfaces/IDataUser';
import useGetComplexObject from '../../../hooks/customHooks/useGetComplexObject';


const debounce = (fn: Function, ms = 300) => 
{
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) 
    {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

const MyPopup:FC<IWorkModal> = ({ show, handleClose}: IWorkModal) => 
{
    let {login,repo,blacklist}:IDataUser = useGetComplexObject();
    const [loginInput,setLoginInput] = useState<string>('');
    const [repoInput,setRepoInput] = useState<string>('');
    const [blacklistInput,setBlacklistInput] = useState<string>('');

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Your login</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="login"
                    defaultValue={loginInput}
                    onChange={e=>
                    {
                        setLoginInput(e.target.value);
                        console.log(loginInput);
                    }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Your repo</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="repo"
                    defaultValue={repoInput}
                    onChange={e=>
                    {
                        setRepoInput(e.target.value);
                        console.log(repoInput);
                        
                    }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Blacklist</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="using ,"
                    defaultValue={blacklistInput}
                    onChange={e=>
                    {
                        setBlacklistInput(e.target.value);
                    }} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={()=>
            {
                login = loginInput;
                repo = repoInput;
                blacklist.push(blacklistInput);
                console.log(blacklist,login,repo);
                if(handleClose)
                    handleClose();
            }}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MyPopup
