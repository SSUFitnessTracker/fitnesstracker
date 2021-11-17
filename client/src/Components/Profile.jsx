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
function Profile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector(state => state.token);
    const auth = useSelector(state => state.auth);
    const [editHeight, showEditHeight] = useState(false);
    const [newHeight, setNewHeight] = useState('');
    const [editWeight, showEditWeight] = useState(false);
    const [newWeight, setNewWeight] = useState('');
  

    const {user, isLogged} = auth;

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
      
      let handleNewHeightChange = (e) => {
        setNewHeight(e.target.value);
      }

      let handleNewWeightChange = (e) => {
        setNewWeight(e.target.value);
      }

      const setNewUserHeight = async () => {
        if(newHeight === "" ){
          showEditHeight(!editHeight);
          return;
        }
        const res = await axios.patch(
          "/user/setUserHeight",
          { height: parseInt(newHeight)},
          { headers: { Authorization: token } }
        );
        console.log(res);
        showEditHeight(false);
        window.location.reload(false);
      }

      const setNewUserWeight = async () => {
        if(newWeight === "" ){
          showEditWeight(!editWeight);
          return;
        }
        const res = await axios.patch(
          "/user/setUserWeight",
          { weight: parseInt(newWeight)},
          { headers: { Authorization: token } }
        );
        console.log(res);
        showEditWeight(false);
        window.location.reload(false);
      }


      const handleHeightEdit = () =>{
        showEditHeight(true);
      }

      const handleWeightEdit = () =>{
        showEditWeight(true);
      }
      
    return (
        <div className="profileContainer">
        <TopBar authenticated={true}  />
            

        <div className="containerProfile">
        <div>
        {/* TODO: Change width here + add profile pic swap functionality (YT VID! */}
            <div style={{ display: 'flex', flexDirection:'column', backgroundColor:'white', paddingTop:'1px', paddingBottom: '20px'}}>
                    
                    <Container>
                        <Stack spacing={1}>
                        <h1 style={{ fontSize:"29px", marginLeft:"33%", marginRight:"12%"}}>{user.username}</h1>

                        <img style={{ borderRadius: "70% 70% 70% 70%", width: '95px', height: '95px', marginLeft:"21%"}} src={user.avatar} alt=""></img>
                       
                            {/* {success ? <h1 style={{color: 'blue', fontSize: '15px'}}>{success}</h1> : <></> }
                            
                            {error? <h1 style={{color: 'red', fontSize: '12px'}}>{error}</h1> : <></> } */}
    {/* 
                            <TextField fullWidth label="Email" variant="outlined" value={userEmail} onChange={handleEmailChange} />
                            <TextField fullWidth label="Password" type="password" variant="outlined" value={userPassword} onChange = {handlePasswordChange} /> */}
                        </Stack>
                        
                    </Container>
                    <Container>

                    <p style={{ cursor: "pointer",fontSize:"15px", color: 'dodgerblue', fontWeight:"bold", marginLeft:"4px"}}>Change Profile Picture</p>
                    {editWeight 
                    ? 
                    <div>
                     <TextField type="number" style={{width: "120px"}} label="Weight" variant="outlined" value={newWeight} onChange={handleNewWeightChange} />
                      <Button variant="contained" size='medium' style={{marginLeft:"1%", marginTop:"12%"}} onClick={setNewUserWeight}>Set</Button>
                    </div>
                    :
                    <h4>Weight: {user.weight}lbs <CreateIcon style={{cursor:"pointer"}} onClick={handleWeightEdit} /></h4>
                    }

                    {editHeight 
                    ? 
                    <div>
                     <TextField type="number" style={{width: "120px"}} label="Height" variant="outlined" value={newHeight} onChange={handleNewHeightChange} />
                      <Button variant="contained" size='medium' style={{marginLeft:"1%", marginTop:"12%"}} onClick={setNewUserHeight}>Set</Button>
                    </div>
                    : 
                    <div>
                      <h4>Height: {user.height}in <CreateIcon style={{cursor:"pointer"}} onClick={handleHeightEdit} /></h4>  
                    </div> 
                    }
                    
                    <h4>Current Program: {user.currentProgram}</h4>
                    <h4>Completed Workouts: {user.completedWorkouts}</h4>
                    </Container>

                </div>
            </div>
            </div>
        </div>
    )
}

export default Profile
