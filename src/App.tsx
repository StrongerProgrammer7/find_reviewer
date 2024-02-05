import { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import './App.css';
import MyButton from './components/UI/Buttons/MyButton';
import PopupSettings from './components/UI/Popup/PopupSettings';
import { useAppDispatch } from './hooks/useTypedDispatch';
import { useTypedSelector } from './hooks/useTypedSelector';
import { UserControls } from './models/user';
import { setDataFromLocalStorage, showAndChooseReviewer } from './utils/helper';
/*
Analog React: Added Redux
Test:
hhru
eslint-config-hh
ipetropolsky,prizemlenie,Maxim-Do
*/


function App() 
{
  const user = useTypedSelector((state) => state.userReducer);
  const reviewer = useTypedSelector((state) => state.reviewerReducer);
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setDataFromLocalStorage(dispatch, 'userdata');
    dispatch(UserControls.setLoading(false));
  }, []);
  return (
    <>
      {user.loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="App">
          <MyButton title="Show settings" callback={handleShow} />
          <PopupSettings show={show} handleClose={handleClose} />
          <br />
          <MyButton
            title=" Searching reviewer..."
            callback={() => {
              dispatch(showAndChooseReviewer() ); //При проблеме с типизацией as unkown as IAction
            }}
          />
          <br />
        </div>
      )}
      <br />
      {reviewer.loading ? <img src={reviewer.generateReviewerImgSrc} alt="iterationImgs" /> : null}
      {reviewer.login !== '' ? (
        <div>
          <h1>You: {user.login}</h1>
          <h1>Reviewer: {reviewer.login}</h1>
          <img src={reviewer.avatarUrl} alt="reviwerImg" />
        </div>
      ) : null}
    </>
  );
}

export default App;
