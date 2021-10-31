import React, {useState} from 'react'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function LoginForm(props) {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    let handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    let handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    }

    let loginHandler = async() =>{
        if(!userEmail){
            setError("Please enter an email.");
            setSuccess("");
            return;
        }
        if(!userPassword){
            setError("Please enter a password.");
            setSuccess("");
            return;
        }

        try{
        console.log({userEmail, userPassword});
        const res = await axios.post('/user/login', {email: userEmail, password: userPassword});
        setSuccess(res.data.msg);
        setError('');
        } catch (err){
            setError(err.response.data.msg);
            setSuccess('')
        }
    }


    return (
        <div>
            <div style={{ display: 'flex', flexDirection:'column', backgroundColor:'white', paddingTop:'1px', paddingBottom: '20px'}}>
                <CloseIcon style={{marginLeft:"240px", cursor:'pointer'}} onClick={props.closeLoginForm} />
                <Container>
                    <Stack spacing={2}>
                        <h1>Login</h1>
                        {success ? <h1 style={{color: 'blue', fontSize: '15px'}}>{success}</h1> : <></> }
                        
                        {error? <h1 style={{color: 'red', fontSize: '12px'}}>{error}</h1> : <></> }

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
