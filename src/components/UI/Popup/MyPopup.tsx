
import React, { FC,useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { IWorkModal } from '../../../store/interfaces/IWorkModal';
import { IDataUser } from '../../../store/interfaces/IDataUser';
import useGetComplexObject from '../../../hooks/customHooks/useGetComplexObject';
import { MyInput } from '../Inputs/MyInput';




const dataFromStringToArray = (data:string,separator:string=',') =>
{
    return data.split(separator);
}

const MyPopup:FC<IWorkModal> = ({ show, handleClose}: IWorkModal) => 
{
    const user:IDataUser = useGetComplexObject();
    const [loginInput,setLoginInput] = useState<string>('');
    const [repoInput,setRepoInput] = useState<string>('');
    const [blacklistInput,setBlacklistInput] = useState<string>('');

    useEffect(()=>
    {
        if(user.blacklist.length===0) return;
        let blacklistText = '';
        for(let i =0;i<user.blacklist.length; i++)
            if(i+1 !== user.blacklist.length)
                blacklistText += user.blacklist[i] + ',';
            else
                blacklistText += user.blacklist[i]
        
        setBlacklistInput(blacklistText);
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
                />
                <MyInput 
                titleLabel='Your repo'
                placeholder='repo'
                _defaultValue={repoInput}
                setState={setRepoInput}
                />
                <MyInput 
                titleLabel='Blacklist'
                placeholder='using ,'
                _defaultValue={blacklistInput}
                setState={setBlacklistInput}
                />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={()=>
            {
                user.setLogin(loginInput);
                user.setRepo(repoInput);
                user.setBlacklist(dataFromStringToArray(blacklistInput));
                
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
