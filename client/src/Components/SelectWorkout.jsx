import React from 'react'
import TopBar from './TopBar';
import sunset from '../Media/sunset.jpg';
import {useSelector} from 'react-redux'; 
import {useParams, useHistory, Redirect} from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import Divider from '@mui/material/Divider';

function SelectWorkout() {
    const auth = useSelector(state=>state.auth);
    const {user, isLogged} = auth;

    const history = useHistory();

    let workouts = [];
    let possibleWorkouts = [];



    let HandleSelectWorkout = (wrkout) => {

        history.push({
            pathname: '/user/diceRoll',
            state: {workout: wrkout}
        })
        
    }

    possibleWorkouts[1] = 
    <>
    <ul>
        <li>Pushups</li>
        <li>Situps</li>
        <li>Jumping Jacks</li>
        <li>Running</li>
    </ul>
    <Button variant="contained" style={{background: '#5B70A3', color:'white', width: '10vw'}} onClick={() => HandleSelectWorkout(1)}>Roll Dice</Button>
    </>;

    possibleWorkouts[2] = 
    <>
    <ul>
        <li>Pushups</li>
        <li>Pullups</li>
        <li>Jumping Jacks</li>
        <li>Squats</li>
    </ul>
    <Button variant="contained" style={{background: '#5B70A3', color:'white', width: '10vw'}} onClick={() => HandleSelectWorkout(2)}>Roll Dice</Button>
    </>;

    possibleWorkouts[3] = 
    <>
    <ul>
        <li>Pushups (intense)</li>
        <li>Situps (intense)</li>
        <li>Running</li>
    </ul>
    <Button variant="contained" style={{background: '#5B70A3', color:'white', width: '10vw'}} onClick={() => HandleSelectWorkout(3)}>Roll Dice</Button>
    </>;

possibleWorkouts[4] = 
<>
<ul>
    <li>Pullups (intense)</li>
    <li>Pushups (intense)</li>
    <li>Running</li>
</ul>
<Button variant="contained" style={{background: '#5B70A3', color:'white', width: '10vw'}} onClick={() => HandleSelectWorkout(4)}>Roll Dice</Button>
</>;


possibleWorkouts[5] = 
<>
<ul>
    <li>Squats (intense)</li>
    <li>Jumping Jacks (intense)</li>
    <li>Running</li>
</ul>
<Button variant="contained" style={{background: '#5B70A3', color:'white', width: '10vw', marginLeft:"15px"}} onClick={() => HandleSelectWorkout(5)}>Roll Dice</Button>
</>;
    
    
    for(let i = 1; i < 6; i++){
        workouts.push(
            <>
                <div className="workoutSelection">
                    <h3 style={{marginLeft: '1.5vw'}}>Workout {i}</h3>
                    {possibleWorkouts[i]}
                </div>

                <hr />
            </>
        )
    }



    return (
        <div className="outerContainer">
        <TopBar />
    

                <div className="startWorkoutContainer" >
                <h1 style={{alignSelf:'center', textDecoration:'underline'}}>Select Workout</h1>
              
                {workouts}


                </div>

            </div>

    )
}

export default SelectWorkout
