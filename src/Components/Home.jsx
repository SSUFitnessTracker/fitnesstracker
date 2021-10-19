import React, {useState} from 'react';


import run from '../Media/run.mp4';

import LoginForm from './LoginForm';

import TopBar from './TopBar';

import Backdrop from '@mui/material/Backdrop';

import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';


function Home() {

    const [auth, setAuth] = useState(false);

    const [showLogin, showLoginSet] = useState(false);

    let doNothing = () => {
      console.log("nothing");
    }

    let showUserLoginForm = () => {
      if(!showLogin)
        showLoginSet(!showLogin);
      
    }
    
    let closeLoginForm = () => {
      if(showLogin){
        showLoginSet(!showLogin);
      }
    }


    return (
      <>
        <TopBar authenticated={auth} onPress={auth ? doNothing : showUserLoginForm} />
          <div className="container"
          // style={{background: '#2B354D', height: '100vh'}}
          >
            <div>
              <p className="logo">TrackFit</p>
              <p className="logo2">Fitness tracking for everyone</p>
            </div>

            {
              showLogin 
            ?
              <Backdrop open={showLogin}>
                <LoginForm closeLoginForm = {closeLoginForm} /> 
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
