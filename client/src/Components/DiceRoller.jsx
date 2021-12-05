import React, {useState} from 'react'
import TopBar from './TopBar';
import sunset from '../Media/sunset.jpg';
import {useSelector} from 'react-redux'; 
import {useParams, useHistory, Redirect} from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import Dice from 'react-dice-roll';


function DiceRoller(props) {
    const auth = useSelector(state=>state.auth);
    const {user, isLogged} = auth;
    const [diceDisabled, setDiceDisabled] = useState(false);
    const [diceValue, setDiceValue] = useState('');
    const history = useHistory();
    let workout = {};

    let StartWorkout = (_diceValue) =>{
        history.push({ pathname: '/user/currentWorkout',
                        state: {diceNumber: _diceValue,
                                workout: props.location.state.workout}
                    });
    }
    const handleOnRoll = (value) => {
        setDiceValue(value);
        setDiceDisabled(true);
    }

    console.log(props.location.state.workout);

    if(props.location.state.workout === 1){
        workout= 
            <>
            <ul>
                <li>Pushups</li>
                <li>Situps</li>
                <li>Jumping Jacks</li>
                <li>Running</li>
            </ul>
            </>    
    } else if (props.location.state.workout === 2){
        workout =
        <>
        <ul>
            <li>Pushups</li>
            <li>Pullups</li>
            <li>Jumping Jacks</li>
            <li>Squats</li>
        </ul>
        </>
    } else if (props.location.state.workout === 3){
        workout =
        <>
        <ul>
            <li>Pushups (intense)</li>
            <li>Situps (intense)</li>
            <li>Running</li>
        </ul>
        </>
    } else if(props.location.state.workout === 4){
        workout =
        <>
<ul>
    <li>Pullups (intense)</li>
    <li>Pushups (intense)</li>
    <li>Running</li>
</ul>
</>
    } else if(props.location.state.workout === 5){
        workout =
        <>
<ul>
    <li>Squats (intense)</li>
    <li>Jumping Jacks (intense)</li>
    <li>Running</li>
</ul>
</>
    }



    return (
        <div className="outerContainer">
        <TopBar />
            <div className="profileContainer">
                <div style={{alignSelf: 'center'}}>
                <h1>Selected Workout:</h1>
                {workout}
                    <h1>Roll the dice to generate a workout!</h1>
                </div>

                <div className="dice">
                    <Dice onRoll={(value) => handleOnRoll(value)} size="100" disabled={diceDisabled}/>
                </div>

                { diceDisabled ?
                <>
                    <div style={{alignSelf: 'center'}}>
                        <h1>You rolled a {diceValue}!</h1>
                    </div>

                    <div style={{alignSelf: 'center'}}>
                        <Button variant="contained" style={{background: '#5B70A3', color:'white', width: '10vw'}} onClick={() => StartWorkout(diceValue)}>Start Workout</Button>
                    </div>
                </>
                    :
                <></>
                }
            </div>
        </div>
    )
}

export default DiceRoller
