import React from 'react'
import TopBar from './TopBar';
import sunset from '../Media/sunset.jpg';
import {useSelector} from 'react-redux'; 
import {useParams, useHistory, Redirect} from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

function SelectWorkout() {
    const auth = useSelector(state=>state.auth);
    const {user, isLogged} = auth;




    return (
        <div class="outerContainer">
        <TopBar />
            <div className="profileContainer">
                <table>
                    <tr>
                        first 
                    </tr>
                    <tr>
                        second
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default SelectWorkout
