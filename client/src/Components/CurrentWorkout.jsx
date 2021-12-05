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

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import {dispatchLogin, fetchUser, dispatchFetchUser} from '../redux/actions/authAction'

function CurrentWorkout(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector(state => state.token);
    const auth = useSelector(state => state.auth);
    const {user, isLogged} = auth;
    const [chk1, setChk1] = useState(false);
    const [chk2, setChk2] = useState(false);
    const [chk3, setChk3] = useState(false);
    const [chk4, setChk4] = useState(false);
    const [chk5, setChk5] = useState(false);
 
    let workout = {};

    let handleChk1Change = (event) => {
      setChk1(event.target.checked);
    }
    let handleChk2Change = (event) => {
      setChk2(event.target.checked);
    }

    let handleChk3Change = (event) => {
      setChk3(event.target.checked);
    }

    let handleChk4Change = (event) => {
      setChk4(event.target.checked);
    }

    let handleChk5Change = (event) => {
      setChk5(event.target.checked);
    }

    if(props.location.state.workout === 1){
      workout= 
          <>
          <div style={{width:'15vw', alignSelf: 'center', marginLeft:'20px'}}>
          <ul>
          
              <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk1} onChange={handleChk1Change} />} label={`${user.fitnessLevel.possiblePushups + props.location.state.diceNumber+5} Pushups`} /></li>
              <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk2} onChange={handleChk2Change} />} label={`${user.fitnessLevel.possibleSitups + props.location.state.diceNumber+5} Situps`} /></li>
              <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk3} onChange={handleChk3Change}/>} label={`${user.fitnessLevel.possibleJumpingJacks + props.location.state.diceNumber+10} Jumping Jacks`} /></li>
              <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk4} onChange={handleChk4Change} />} label={`${user.fitnessLevel.maxRunTime + props.location.state.diceNumber+175} Seconds Running`} /></li>
          </ul>
          </div>
          </>    
  } else if (props.location.state.workout === 2){
      workout =
      <>
       <div style={{width:'15vw', alignSelf: 'center', marginLeft:'20px'}}>
      <ul>
      <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk1} onChange={handleChk1Change} />} label={`${user.fitnessLevel.possiblePushups + props.location.state.diceNumber+5} Pushups`} /></li>
              <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk2} onChange={handleChk2Change} />} label={`${user.fitnessLevel.possibleSitups + props.location.state.diceNumber+5} Situps`} /></li>
              <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk3} onChange={handleChk3Change} />} label={`${user.fitnessLevel.possibleJumpingJacks + props.location.state.diceNumber+10} Jumping Jacks`} /></li>
              <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk4} onChange={handleChk4Change} />} label={`${user.fitnessLevel.possibleSquats + props.location.state.diceNumber+10} Squats`} /></li>
      </ul>
      </div>
      </>
  } else if (props.location.state.workout === 3){
      workout =
      <>
       <div style={{width:'15vw', alignSelf: 'center', marginLeft:'20px'}}>
      <ul>
      <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk1} onChange={handleChk1Change} />} label={`${user.fitnessLevel.possiblePushups + props.location.state.diceNumber+15} Pushups`} /></li>
      <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk2} onChange={handleChk2Change}/>} label={`${user.fitnessLevel.possibleSitups + props.location.state.diceNumber+20} Situps`} /></li>
      <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk3} onChange={handleChk3Change} />} label={`${user.fitnessLevel.maxRunTime + props.location.state.diceNumber+300} Seconds Running`} /></li>
      </ul>
      </div>
      </>
  } else if(props.location.state.workout === 4){
      workout =
      <>
       <div style={{width:'15vw', alignSelf: 'center', marginLeft:'20px'}}>
        <ul>
          <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk1} onChange={handleChk1Change}/>} label={`${user.fitnessLevel.possiblePullups + props.location.state.diceNumber+15} Pullups`} /></li>
          <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk2} onChange={handleChk2Change} />} label={`${user.fitnessLevel.possiblePushups + props.location.state.diceNumber+15} Pushups`} /></li>
          <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk3} onChange={handleChk3Change} />} label={`${user.fitnessLevel.maxRunTime + props.location.state.diceNumber+300} Seconds Running`} /></li>
        </ul>
      </div>
</>
  } else if(props.location.state.workout === 5){
      workout =
      <>
       <div style={{width:'15vw', alignSelf: 'center', marginLeft:'20px'}}>
        <ul>
          <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk1} onChange={handleChk1Change} />} label={`${user.fitnessLevel.possibleSquats + props.location.state.diceNumber+20} Squats`}/></li>
          <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk2} onChange={handleChk2Change} />} label={`${user.fitnessLevel.possibleJumpingJacks + props.location.state.diceNumber+20} Jumping Jacks`}/></li>
          <li style={{marginBottom:"30px"}}><FormControlLabel control={<Checkbox checked={chk3} onChange={handleChk3Change} />} label={`${user.fitnessLevel.maxRunTime + props.location.state.diceNumber+300} Seconds Running`}/></li>
        </ul>
       </div>
</>
  }


    useEffect(() => {
      const firstLogin = localStorage.getItem('firstLogin');
      if(firstLogin){
        const getToken = async() => {
          const res = await axios.post('/user/refresh_token', null);
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
      <div className="outerContainer">
            <TopBar />
            <div className="profileContainer">
                {workout}
              
            
                <Button variant="contained" size='medium' style={{marginLeft:"1%", marginTop:"2%", alignSelf: 'center'}} onClick={CompleteWorkoutHandler}>Set</Button>

            </div>

        </div>
    )
}

export default CurrentWorkout
