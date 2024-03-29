import React, {FC, useContext, useState, useEffect} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";
import Login from './pages/authorization/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Registration from './pages/authorization/registration';
import Profile from './pages/profile/profile';

const App: FC = () => {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
      if (localStorage.getItem('token')) {
          store.checkAuth()
      }
  }, [])

  async function getUsers() {
      try {
          const response = await UserService.fetchUsers();
          setUsers(response.data);
      } catch (e) {
          console.log(e);
      }
  }

  if (store.isLoading) {
      return <div>Loading...</div>
  }

  if (!store.isAuth) {
      return (
        <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='*' element={<Registration />} />
        </Routes>
      </BrowserRouter>
      );
  }
  return(
    <BrowserRouter>
        <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Profile />} />
        </Routes>
      </BrowserRouter>
  )
}

export default observer(App);
