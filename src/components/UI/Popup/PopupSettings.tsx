
import { FC, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAppDispatch } from '../../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IWorkModal } from '../../../store/interfaces/IWorkModal';
import { StandartInput } from '../Inputs/StandartInput';
import { saveChanges } from './utils';
const PopupSettings: FC<IWorkModal> = ({ show, handleClose }: IWorkModal) => {
  const {blacklist,login,repo } = useTypedSelector((state) => state.userReducer);//useSelector((state: RootState) => state.userReducer);
  const dispatch = useAppDispatch();

  const loginInput = useRef<HTMLInputElement | null>(null);
  const repoInput = useRef<HTMLInputElement | null>(null);
  const blacklistInput = useRef<HTMLInputElement | null>(null);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (!loginInput || !repoInput || !blacklistInput) return;
          if (!loginInput.current || !repoInput.current || !blacklistInput.current) return;

          saveChanges(
            dispatch,
            {
              loginInput: loginInput.current.value,
              repoInput: repoInput.current.value,
              blacklistInput: blacklistInput.current.value
            },
            handleClose
          );
        }}
      >
        <Modal.Body>
          <StandartInput
            titleLabel="Your login"
            placeholder="login"
            defaultValue={login}
            ref={loginInput}
          />
          <StandartInput
            titleLabel="Your repo"
            placeholder="repo"
            defaultValue={repo}
            ref={repoInput}
          />
          <StandartInput
            titleLabel="Blacklist"
            placeholder="using ,"
            defaultValue={blacklist.toString()}
            ref={blacklistInput}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PopupSettings;
