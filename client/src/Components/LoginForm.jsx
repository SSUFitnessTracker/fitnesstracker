import React, {useState} from 'react'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function LoginForm(props) {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');


    let handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    let handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    }

    let loginHandler = () =>{
        console.log("THIS IS WHERE THE LOGIN FOR A USER WILL HAPPEN THRU MONGO")
    }


    return (
        <div>
            <div style={{ display: 'flex', flexDirection:'column', backgroundColor:'white', paddingTop:'1px', paddingBottom: '20px'}}>
                <CloseIcon style={{marginLeft:"240px", cursor:'pointer'}} onClick={props.closeLoginForm} />
                <Container>
                    <Stack spacing={2}>
                        <h1>Login</h1>
                        <TextField fullWidth label="Email" variant="outlined" value={userEmail} onChange={handleEmailChange} />
                        <TextField fullWidth label="Password" type="password" variant="outlined" value={userPassword} onChange = {handlePasswordChange} />
                    </Stack>
                    
                    <a href="https://www.google.com" style={{marginLeft:'5px', marginBottom:'5px'}}>Forgot your password?</a>
                </Container>
                <Container>
                <Button variant="contained" size='medium' style={{marginLeft:"1%", marginTop:"12%"}} onClick={loginHandler}>Login</Button>
                    
                </Container> 
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <p style={{color:'black', marginLeft: "25px"}}>No account? </p>
                    <p style={{color:'dodgerblue', cursor: 'pointer', marginLeft:"5px", textDecoration:'underline'}}>Sign up</p> 
                </div>

            </div>
        </div>
    )
}

export default LoginForm
