import React from 'react'
import TopBar from './TopBar';
import sunset from '../Media/sunset.jpg';
import {useSelector} from 'react-redux'; 
import {useParams, useHistory, Redirect} from 'react-router-dom';


function UserLanding() {
    const auth = useSelector(state=>state.auth);
    const {user, isLogged} = auth;


    if(!isLogged){
        console.log(user);
        return <Redirect push to="/" />;
      }

    return (
        <div className="profileContainer">
            <TopBar  />
            <div styles={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{marginLeft:"35vw", marginTop:"5vh"}}>
                    <img src={sunset} alt="sunset" style={{height: '30vh', width:'50vh'}} />
                </div>
                
            </div>
        </div>
    )
}

export default UserLanding
