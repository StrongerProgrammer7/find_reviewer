import React, { FC,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { IWorkModal } from '../../../store/interfaces/IWorkModal';
import { saveChanges } from './utils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/interfaces/IReducers';
import { StandartInput } from '../Inputs/StandartInput';

const MyPopup: FC<IWorkModal> = ({ show, handleClose }: IWorkModal) => {
  const user = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  const loginInput = useRef<HTMLInputElement | null>(null);
  const repoInput = useRef<HTMLInputElement | null>(null);
  const blacklistInput = useRef<HTMLInputElement | null>(null);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Form
      onSubmit={(e)=>
      {
        e.preventDefault();
        if(!loginInput || !repoInput || !blacklistInput) return;
        if(!loginInput.current || !repoInput.current || !blacklistInput.current) return;

        saveChanges(
          dispatch,
          {
            loginInput:loginInput.current.value,
            repoInput:repoInput.current.value,
            blacklistInput:blacklistInput.current.value
          },
          handleClose
        )
      }}>
      <Modal.Body>
        <StandartInput 
        titleLabel="Your login"
        placeholder="login"
        _defaultValue={user.login}
        _ref={loginInput}
        />
        <StandartInput 
        titleLabel="Your repo"
        placeholder="repo"
        _defaultValue={user.repo}
        _ref={repoInput}
        />
        <StandartInput 
        titleLabel="Blacklist"
        placeholder="using ,"
        _defaultValue={user.blacklist.toString()}
        _ref={blacklistInput}
        />
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
            variant="primary"
            type="submit"
          >
            Save Changes
          </Button>
      </Modal.Footer>

      </Form>
    </Modal>
  );
};

export default MyPopup;
