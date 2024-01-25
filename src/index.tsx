import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContext } from './components/UserContext';
import { IDataUser } from './store/interfaces/IDataUser';

export const Context = createContext<IDataUser | null>(null);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>
);
