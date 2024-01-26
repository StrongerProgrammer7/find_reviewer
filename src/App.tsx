import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import MyButton from './components/UI/Buttons/MyButton';
import MyPopup from './components/UI/Popup/MyPopup';
import { setDataFromLocalStorage, showAndChooseReviewer } from './utils/helper';
import { Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/interfaces/IReducers';
import { loadingsControls } from './models/loading';
/*
Analog React: Added Redux
Test:
hhru
eslint-config-hh
ipetropolsky,prizemlenie,Maxim-Do
*/


function App() 
{
  const user = useSelector((state: RootState) => state.userReducer);
  const reviewer = useSelector((state:RootState)=>state.reviewerReducer);
  const loadings = useSelector((state:RootState)=> state.loadingsReducer);
  const dispath = useDispatch();
  const generateReviewer = useRef<null | HTMLImageElement>(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setDataFromLocalStorage(dispath, 'userdata');
    dispath(loadingsControls.changeBaseLoad(false));
  }, []);
  return (
    <>
      {loadings.baseLoad === true ? (
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
              showAndChooseReviewer(
                user,
                generateReviewer,
                dispath
              );
            }}
          />
          <br />
        </div>
      )}
      <br />
      {loadings.loadReadyShowReviewer ? <img ref={generateReviewer} alt="iterationImgs" /> : null}
      {reviewer.login !== '' ? (
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
