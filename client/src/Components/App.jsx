
import React, {useEffect} from 'react'
import '../Styles/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {dispatchLogin, fetchUser, dispatchFetchUser} from '../redux/actions/authAction'
import Profile from './Profile';
import UserLanding from './UserLanding';

function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const auth = useSelector(state => state.auth);


  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if(firstLogin){
      const getToken = async() => {
        const res = await axios.post('/user/refresh_token', null);
        // console.log(res);
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then(res => {
          dispatch(dispatchFetchUser(res));
        });
      }
      getUser();
    }
  }, [token, dispatch]);

  return (
    <div className="App">
    
      <Router>
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/user/activate/:activationToken" component={Home}/>
          <Route path="/user/landing" component={UserLanding} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
