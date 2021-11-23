import React, {useState, useEffect} from 'react'
import TopBar from './TopBar';
import sunset from '../Media/sunset.jpg';
import {useSelector} from 'react-redux'; 
import {useParams, useHistory, Redirect} from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';

function UserLanding() {
    const auth = useSelector(state=>state.auth);
    const {user, isLogged} = auth;
    const [quote, setQuote] = useState("");

    const history = useHistory();


    const GoToSelectWorkout = () => {
        history.push("/user/startWorkout");
    }




    
      const createQuote = (_quote) => {
          setQuote(_quote);
      }


      useEffect(() => {
        const fetchData = async () => {
            let options = {
                method: 'POST',
                url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
                headers: {
                  'content-type': 'application/json',
                  'x-rapidapi-host': 'motivational-quotes1.p.rapidapi.com',
                  'x-rapidapi-key': '021093a2f1msh7bbc60c3cb99ccep18113ejsn25d0e9f3866c'
                },
                data: {key1: 'value', key2: 'value'}
              };

              axios.request(options).then(function (response) {
                            createQuote(response.data);
                        });
        };
        fetchData();
      }, []);



      if(!isLogged){
        console.log(user);
        return <Redirect push to="/" />;
      }

    return (
        <div className="outerContainer">
        <TopBar />
            <div className="profileContainer">
                
                <img src={sunset} alt="sunset" style={{ alignSelf: 'center', height: '30vh', width:'50vh', borderRadius:"10px"}} />
                <h2 className="quote">{quote}</h2>
                <Button variant="contained" style={{background: '#5B70A3', color:'white', width: '10vw', alignSelf: 'center'}} onClick={GoToSelectWorkout}>Start Workout</Button>
  

            </div>
        </div>
    )
}

export default UserLanding
