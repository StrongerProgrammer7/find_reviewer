import React, { useState, createContext, useEffect, useRef } from 'react';
import './App.css';
import MyButton from './components/UI/Buttons/MyButton';
import MyPopup from './components/UI/Popup/MyPopup';
import { IContributor, IDataUser } from './store/interfaces/IDataUser';
import { setDataContextFromLocalStorage, showAndChooseReviewer } from './utils/helper';
import { Spinner } from 'react-bootstrap';

/*
Функционал:
- кнопка настроек, по клику на нее можно переключать видимость настроек.
- в настройках 3 поля:

    1. login для ввода логина текущего юзера
    2. repo для указания репозитория для которого ищем ревьюера
    3. blacklist для указания списка login-ов, кто не должен быть ревьюером
- состояние настроек сохранять в localStorage
- для генерации ревьюера нужна кнопка поиска ревьюера, по клику на которую должен быть выбран рандомный ревьюер из списка контрибьютеров репзитория указанный в пункте 2 настроек, учитывая blacklist пункта 3.
- при генерации ревьюера показываем текущего пользователя и перебираемые вами пользователи для ревью.

Дока по API https://docs.github.com/en/rest.
Test:
hhru
eslint-config-hh
ipetropolsky,prizemlenie,Maxim-Do
*/

export const Context = createContext<IDataUser | null>(null);

function App() {
  const generateReviewer = useRef<null | HTMLImageElement>(null);
  const [loginUser, setLoginUser] = useState<string>('');
  const [repoUser, setRepoUser] = useState<string>('');
  const [blacklistUser, setBlacklistUser] = useState<Array<string>>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [readyShowReviewers, setReadyShowReviewers] = useState<boolean>(false);
  const [reviewer, setReviewer] = useState<IContributor | null>(null);
  const user: IDataUser = {
    login: loginUser,
    setLogin: setLoginUser,
    repo: repoUser,
    setRepo: setRepoUser,
    blacklist: blacklistUser,
    setBlacklist: setBlacklistUser
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setDataContextFromLocalStorage(user, 'userdata');
    setLoading(false);
  }, []);
  return (
    <Context.Provider value={user}>
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
    </Context.Provider>
  );
}

export default App;
