import React, { useState, createContext, useEffect, useRef } from 'react';
import './App.css';
import MyButton from './components/UI/Buttons/MyButton';
import MyPopup from './components/UI/Popup/MyPopup';
import { IContributor, IDataUser } from './store/interfaces/IDataUser';
import { setDataFromLocalStorage, showAndChooseReviewer } from './utils/helper';
import { Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { IUser } from './store/interfaces/IDataUser';
/*
Analog React: Added Redux
Test:
hhru
eslint-config-hh
ipetropolsky,prizemlenie,Maxim-Do
*/


function App() {
  const user = useSelector((state: IUser) => state);
  const dispath = useDispatch();
  const generateReviewer = useRef<null | HTMLImageElement>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [readyShowReviewers, setReadyShowReviewers] = useState<boolean>(false);
  const [reviewer, setReviewer] = useState<IContributor | null>(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setDataFromLocalStorage(dispath, 'userdata');
    setLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="App">
          <MyButton title="Show settings" callback={handleShow} />
          <MyPopup show={show} handleClose={handleClose} />
          <br />
          <MyButton
            title=" Searching reviewer..."
            callback={() => {
              setReviewer(null);
              setLoading(true);
              showAndChooseReviewer(
                user,
                generateReviewer,
                setReadyShowReviewers,
                setReviewer,
                setLoading
              );
            }}
          />
          <br />
        </div>
      )}
      <br />
      {readyShowReviewers ? <img ref={generateReviewer} alt="iterationImgs" /> : null}
      {reviewer ? (
        <div>
          <h1>You: {user.login}</h1>
          <h1>Reviewer: {reviewer.login}</h1>
          <img src={reviewer.avatar_url} alt="reviwerImg" />
        </div>
      ) : null}
    </>
  );
}

export default App;
