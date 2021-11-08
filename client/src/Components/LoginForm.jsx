import React, {useState} from 'react'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import {dispatchLogin} from '../redux/actions/authAction';
import {useDispatch} from 'react-redux';


function LoginForm(props) {
    //redux
    const dispatch = useDispatch();

    //Login state
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [isSignup, switchToSignup] = useState(false);
    const [isForgot, switchToForgot] = useState(false);

    //Creation state
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [signupError, setSignupError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

    //Forgot state 
    const [forgotEmail, setForgotEmail] = useState('');
    const [confirmForgotEmail, setConfirmForgotEmail] = useState('');
    const [forgotSuccess, setForgotSuccess] = useState('');
    const [forgotError, setForgotError] = useState('');

    //Login functions
    let handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    let handlePasswordChange = (e) => {
        setUserPassword(e.target.value);
    }

    let loginHandler = async() => {
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
        const res = await axios.post('/user/login', {email: userEmail, password: userPassword});
        setSuccess(res.data.msg);
        setError('');
        localStorage.setItem('firstLogin', true);
        dispatch(dispatchLogin());

        } catch (err){
            setError(err.response.data.msg);
            setSuccess('')
        }
    }


    let swapForm = () => {
        setNewUsername('');
        setNewPassword('');
        setConfirmPassword('');
        setNewEmail('');
        setSignupError('');
        setSignupSuccess('');
        switchToSignup(!isSignup);
    }

    let swapToForgot = () => {
        setForgotEmail('');
        setConfirmForgotEmail('');
        setForgotSuccess('');
        setForgotError('');
        switchToForgot(!isForgot);
    }

    //Signup functions
    let handleNewEmailChange = (e) => {
        setSignupError('')
        setNewEmail(e.target.value);
    }

    let handleNewUserChange = (e) => {
        setSignupError('')
        setNewUsername(e.target.value);
    }
    
    let handleNewPasswordChange = (e) => {
        setSignupError('')
        setNewPassword(e.target.value);
    }

    let handleConfirmPasswordChange = (e) => {
        setSignupError('')
        setConfirmPassword(e.target.value);
    }

    let signupHandler = async() => {
        if(!newUsername){
            setSignupError("Please enter a username");
            return;
        }
        if(!newEmail){
            setSignupError("Please enter an email address.");
            return;
        }
        if(!newPassword){
            setSignupError("Please enter a password.");
            return;
        }
        if(!confirmPassword){
            setSignupError("Please confirm your password.");
            return;
        }
        if(newPassword !== confirmPassword){
            setSignupError("Passwords do not match. Please confirm your password.");
            return;
        }

        try {
            const res = await axios.post('/user/register', 
            {   username: newUsername,
                email: newEmail,
                password: newPassword
            })
            setSignupSuccess(res.data.msg);
            setSignupError('');
            
        } catch (error) {
            setSignupSuccess('');
            setSignupError(error.response.data.msg)
        }
    }

    //Forgot functions 
    let handleForgotEmailChange = (e) => {
        setForgotError('');
        setForgotEmail(e.target.value);
    }

    let handleForgotConfirmEmailChange = (e) => {
        setForgotError('');
        setConfirmForgotEmail(e.target.value);
    }

    let forgotHandler = async() => {
        if(!forgotEmail){
            setForgotError("Please enter the email associated with your account.");
            return;
        }
        if(!confirmForgotEmail){
            setForgotError("Please confirm your email address.");
            return;
        }
        if(forgotEmail !== confirmForgotEmail){
            setForgotError("Emails do not match.");
            return;
        }

        try {
            const res = await axios.post('/user/forgot', {email: forgotEmail});
            setForgotSuccess(res.data.msg);
            setError('');            
        } catch (error) {
            setForgotError(error.response.data.msg);
            setSuccess('');
        }
    }

    return (
        <div>

        {isForgot 
        
        
        ? 
        
        <div style={{ display: 'flex', flexDirection:'column', backgroundColor:'white', paddingTop:'1px', paddingBottom: '20px'}}>
        <div style={{display: 'flex', flexDirection:'row', backgroundColor:'white'}}>
                <ArrowBackIcon style={{alignSelf: 'flex-end', cursor:'pointer'}} onClick={swapToForgot} />
        </div>
                <Container>
                    <Stack spacing={2}>
                        <h1>Forgot Password</h1>
               
                        { forgotSuccess ? <h1 style={{color: 'blue', fontSize: '15px'}}>{forgotSuccess}</h1> : <></> } 
                        { forgotError ? <h1 style={{color: 'red', fontSize: '12px'}}>{forgotError}</h1> : <></> }

                        <TextField fullWidth label="Email" variant="outlined" value={forgotEmail} onChange={handleForgotEmailChange} />
                        <TextField fullwidth label="Confirm Email" variant="outlined" value={confirmForgotEmail} onChange = {handleForgotConfirmEmailChange} />

                    </Stack>
                    
                    
                </Container>
                <Container>
                <Button variant="contained" size='medium' style={{marginLeft:"1%", marginTop:"12%"}} onClick={forgotHandler}>Reset Password</Button>
                    
                </Container> 
            </div>
        
        :


         isSignup 

        ?


        <div style={{ display: 'flex', flexDirection:'column', backgroundColor:'white', paddingTop:'1px', paddingBottom: '20px'}}>
                <CloseIcon style={{alignSelf: 'flex-end', cursor:'pointer'}} onClick={props.closeLoginForm} />
                <Container>
                    <Stack spacing={2}>
                        <h1>Signup</h1>
               
                        { signupSuccess ? <h1 style={{color: 'blue', fontSize: '15px'}}>{signupSuccess}</h1> : <></> } 
                        { signupError ? <h1 style={{color: 'red', fontSize: '12px'}}>{signupError}</h1> : <></> }

                        <TextField fullwidth label="Username" variant="outlined" value={newUsername} onChange={handleNewUserChange} />
                        <TextField fullWidth label="Email" variant="outlined" value={newEmail} onChange={handleNewEmailChange} />
                        <TextField fullWidth label="Password" type="password" variant="outlined" value={newPassword} onChange = {handleNewPasswordChange} />
                        <TextField fullwidth label="Confirm Password" type="password" variant="outlined" value={confirmPassword} onChange = {handleConfirmPasswordChange} />

                    </Stack>
                    
                    
                </Container>
                <Container>
                <Button variant="contained" size='medium' style={{marginLeft:"1%", marginTop:"12%"}} onClick={signupHandler}>Signup</Button>
                    
                </Container> 

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <p style={{color:'black', marginLeft: "25px"}}>Already have an account?</p>
                    <p style={{color:'dodgerblue', cursor: 'pointer', marginLeft:"5px", textDecoration:'underline'}} onClick={swapForm}>Login</p> 
                </div>
            </div>

         :

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
                    
                    <p style={{color:'dodgerblue', cursor: 'pointer', textDecoration:'underline'}} onClick={swapToForgot}>Forgot your password?</p>
                </Container>
                <Container>
                <Button variant="contained" size='medium' style={{marginLeft:"1%", marginTop:"12%"}} onClick={loginHandler}>Login</Button>
                    
                </Container>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <p style={{color:'black', marginLeft: "25px"}}>No account? </p>
                    <p style={{color:'dodgerblue', cursor: 'pointer', marginLeft:"5px", textDecoration:'underline'}} onClick={swapForm}>Sign up</p> 
                </div>
            </div>
        

        }
        </div>
    )
}

export default LoginForm
