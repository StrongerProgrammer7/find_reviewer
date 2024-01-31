import React, { FC, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { IWorkModal } from '../../../store/interfaces/IWorkModal';
import { IDataUser } from '../../../store/interfaces/IDataUser';
import useGetComplexObject from '../../../hooks/customHooks/useGetComplexObject';
import { MyInput } from '../Inputs/MyInput';
import { saveChanges } from './utils';

const MyPopup: FC<IWorkModal> = ({ show, handleClose }: IWorkModal) => {
  const user: IDataUser = useGetComplexObject();
  const [loginInput, setLoginInput] = useState<string>(user.login ?? '');
  const [repoInput, setRepoInput] = useState<string>(user.repo ?? '');
  const [blacklistInput, setBlacklistInput] = useState<string>(user.blacklist.toString() ?? '');
  const [isReadInputData, setReadInputData] = useState(false);
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MyInput
          titleLabel="Your login"
          placeholder="login"
          _defaultValue={loginInput}
          setState={setLoginInput}
          setStateLoading={setReadInputData}
        />
        <MyInput
          titleLabel="Your repo"
          placeholder="repo"
          _defaultValue={repoInput}
          setState={setRepoInput}
          setStateLoading={setReadInputData}
        />
        <MyInput
          titleLabel="Blacklist"
          placeholder="using ,"
          _defaultValue={blacklistInput}
          setState={setBlacklistInput}
          setStateLoading={setReadInputData}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {isReadInputData ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Button
            variant="primary"
            onClick={() =>
              saveChanges(
                user,
                {
                  loginInput,
                  repoInput,
                  blacklistInput
                },
                handleClose
              )
            }
          >
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default MyPopup;
