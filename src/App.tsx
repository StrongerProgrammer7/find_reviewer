import React,{useState,createContext } from 'react';
import './App.css';
import MyButton from './components/UI/Buttons/MyButton';
import MyPopup from './components/UI/Popup/MyPopup';
import { Form } from 'react-bootstrap';
import { IDataUser } from './store/interfaces/IDataUser';

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

*/

export const Context = createContext<IDataUser | null>(null);

function App() 
{
  const [loginUser,setLoginUser] = useState<string>('');
  const [repoUser,setRepoUser] = useState<string>('');
  const [blacklistUser,setBlacklistUser] = useState<Array<string>>([]);
  const user:IDataUser = 
  {
    login:loginUser,
    setLogin: setLoginUser,
    repo:repoUser,
    setRepo: setRepoUser,
    blacklist: blacklistUser,
    setBlacklist:setBlacklistUser
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <Context.Provider
      value={
        user
      }>
        <div className="App">
        <MyButton 
        title='Show settings'
        modal={
          {
            show,
            handleShow}
          }
        />
        <MyPopup
        show={show}
        handleClose={handleClose}
        />
          <Form.Group className="mb-3">
              <Form.Label>Blacklist</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="using ,"
                    defaultValue={user.login}
                    />
                </Form.Group>
      </div>
      </Context.Provider>
  );
}

export default App;
