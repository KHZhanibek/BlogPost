import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { Link } from 'react-router-dom';
import {PATH} from '../../constants/paths';
import { IUser } from '../../models/IUser';
import UserService from '../../services/UserService';
import AccountMenu from '../../components/menu/menu'

const Profile: FC = () => {
  const {store} = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  async function getUsers() {
      try {
          const response = await UserService.fetchUsers();
          setUsers(response.data);
      } catch (e) {
          console.log(e);
      }
  }

    return (
      <div style={{ margin: '1vh 10vw'}}>
        <AccountMenu/>
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
      {store.user.role == 'admin' ? <div>
            <div>
                <button onClick={getUsers}>Получить пользователей</button>
            </div>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )} </div>
        : <div/>}
    </div>     
    );
};

export default observer(Profile);