import React, {useState} from 'react';

import {useParams, useHistory, Redirect} from 'react-router-dom';

import run from '../Media/beachRun.mp4';

import LoginForm from './LoginForm';

import TopBar from './TopBar';

import Backdrop from '@mui/material/Backdrop';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import Button from '@mui/material/Button';
import ActivationForm from './ActivationForm';
import SetupAccountForm from './SetupAccountForm';

import {useSelector} from 'react-redux'; 
import axios from 'axios';


function Home() {

    const history = useHistory();
    const auth = useSelector(state=>state.auth);
    const {user, isLogged} = auth;



    // const [auth, setAuth] = useState(false);

    const [showLogin, showLoginSet] = useState(false);

    const [showActivation, showActivationSet] = useState(false);

    const [showSetupAccount, showSetupAccountSet] = useState(false);

    let doNothing = () => {
      console.log("nothing");
    }


    // let setUserAuth = () =>{
    //   setAuth(true);
    // }

    let parms = useParams();
    let isActivation = Object.keys(parms).includes("activationToken");

    let showUserActivation = () => {
      if(!showActivation){
        showActivationSet(true);
      }
    }

    let showUserSetup = () => {
      if(!showSetupAccount){
        showSetupAccountSet(true);
      }
    }

    let hideUserActivation = () => {
      showActivationSet(false);
    }

    let hideUserSetup = () => {
      showSetupAccountSet(false);
    }

    if(isActivation) {
      showUserActivation();
    }

    let showUserLoginForm = () => {
      history.push("/");
      hideUserActivation();
      hideUserSetup();
      if(!showLogin)
        showLoginSet(!showLogin);
      
    }
    
    let closeLoginForm = () => {
      if(showLogin){
        showLoginSet(!showLogin);
      }
      
    }
    
    let closeSetupForm = () => {
      if(showSetupAccount){
        showSetupAccountSet(!showSetupAccount);
      }
    }

if(auth.user.length !== 0){
  if(auth.user.height === 0 && auth.user.weight === 0){
    showUserSetup();
  }
}

if(isLogged){
  console.log(user);
  return <Redirect push to="/user/landing" />;
}


    return (
      <>
        <TopBar authenticated={isLogged} onPress={isLogged ? doNothing : showUserLoginForm} />
          <div className="container"
          // style={{background: '#2B354D', height: '100vh'}}
          >
          
            <div>
            <Container>
              <p className="logo">TrackFit</p>
              <p className="logo2">Fitness tracking for everyone</p>
              {isLogged ?
                <Button variant="contained" style={{background: '#5B70A3', color:'white', marginLeft:"35%"}} onClick={showUserLoginForm}>Go To My Workouts</Button>

              :
              <Button variant="contained" style={{background: '#5B70A3', color:'white', marginLeft:"40%"}} onClick={showUserLoginForm}>Get Started</Button>

              }
            </Container>
            </div>

            {/* <h1>{auth.toString()}</h1> */}


            {
              showLogin 
            ?
              <Backdrop open={showLogin}>
                <LoginForm closeLoginForm = {closeLoginForm}/> 
              </Backdrop>
            : 
             <></> 
             }

             {
               showActivation 
               ?
               <Backdrop open={showActivation}>
                <ActivationForm showLogin={showUserLoginForm} activationToken={parms.activationToken}/>
               </Backdrop>
               :
               <></> 
             }

             {
               showSetupAccount
               ?
               <Backdrop open={showSetupAccount}>
                <SetupAccountForm closeSetupForm = {closeSetupForm} ></SetupAccountForm>
                </Backdrop>
               :
               <></>
             }
        
            <video className="running" autoPlay loop muted>

              <source src={run} type='video/mp4'></source>
          
            </video>
            
          </div>
      </>
    )
}

export default Home
