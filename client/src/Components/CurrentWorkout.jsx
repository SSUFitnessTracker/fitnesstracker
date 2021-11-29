import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import TopBar from './TopBar';
import "../Styles/App.css";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';


import {dispatchLogin, fetchUser, dispatchFetchUser} from '../redux/actions/authAction'

function CurrentWorkout() {
    const dispatch = useDispatch();
    const history = useHistory();
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


    let CompleteWorkoutHandler = async() => {
        console.log(token);
        try{
          console.log(token);
        const res = await axios.post(
            "/user/completedWorkout",
            {},
            { headers: { Authorization: token } }
          );
          console.log(res);
        } catch(err){
            console.log(err.response.data.msg);
        }
    }

    return (
        <div>
            <Button variant="contained" size='medium' style={{marginLeft:"1%", marginTop:"12%"}} onClick={CompleteWorkoutHandler}>Set</Button>

        </div>
    )
}

export default CurrentWorkout
