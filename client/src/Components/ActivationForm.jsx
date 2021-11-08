import React, {useState} from 'react'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function ActivationForm(props) {

    const [didUserActivate, activateUserSet] = useState(false);

    const showActivated = () => {
        if(!didUserActivate){
            activateUserSet(true);
        }
    }


    let activateAccount = async() => {
        try{
        const res = await axios.post('/user/activation', {activation_token: props.activationToken});
        console.log(res);
        showActivated();
        } catch(e){
          console.log(e.response.data.msg)
        }
      }


    return (
        <div>


        
        <div style={{ display: 'flex', flexDirection:'column', backgroundColor:'white', paddingTop:'1px', paddingBottom: '20px'}}>
        <CloseIcon style={{alignSelf: 'flex-end', cursor:'pointer'}} onClick={props.closeActivationForm} />
        {didUserActivate ?
            <div>    
                <Container>
                    <Stack spacing={2}>
                        <h1>Your account has been activated!</h1>
                        <h2>Please sign in using your credentials.</h2>
                    </Stack>
                    
                    
                </Container>
                <Container>
                <Button variant="contained" size='medium' style={{marginLeft:"1%", marginTop:"12%"}} onClick={props.showLogin}>Login</Button> 
                </Container> 
                </div>
                :
                <div>    
                <Container>
                    <Stack spacing={2}>
                        <h1>Account activation almost complete.</h1>
                        <h2>Please click below to activate your account!</h2>
                    </Stack>
                    
                    
                </Container>
                <Container>
                <Button variant="contained" size='medium' style={{marginLeft:"1%", marginTop:"12%"}} onClick={activateAccount}>Activate</Button> 
                </Container> 
                </div>
            }
            </div>


        </div>
    )
}

export default ActivationForm
