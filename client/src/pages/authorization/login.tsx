import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import { Link } from 'react-router-dom';
import {PATH} from '../../constants/paths';

const Login: FC = () => {
    const [username, SetUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    return (<div className='authorization'>
      <div>
        <h2>Login account</h2>
      </div>
      <div>
        <form action="javascript:void(0);" method="POST">
          <div>
            <label htmlFor="email" >Email address or username</label>
            <div ><input id="email" name="email" type="text" autoComplete="email" onChange={e => SetUsername(e.target.value)}/>
            </div>
          </div>
    
          <div>
            <div>
              <label htmlFor="password">Password</label>
            </div>
            <div ><input id="password" name="password" type="password" autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}/>
            </div>
          </div>
    
          <div>
            <button type="submit" onClick={() => username.includes('@') ?
            store.loginEmail(username, password)
          : store.loginUsername(username,password)
          }>Sign in</button>
          </div>
        </form>
    
        <p>
        New user?
          <Link to={PATH.REGISTER} >Create an account</Link>
        </p>
      </div>



      {/* <div>
            <input
                
                value={email}
                type="text"
                placeholder='@email'
            />
            <input
                value={password}
                type="password"
                placeholder='Password'
            />
            <button >
                Login
            </button>
            <button onClick={() => store.registration(email, password)}>
                Registration
            </button>
        </div> */}
    </div>
    );
};

export default observer(Login);