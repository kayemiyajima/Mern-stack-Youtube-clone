import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, authUser } from '../../actions/user_actions';

import WarningIcon from '@material-ui/icons/Warning';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state)=> state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSubmit = {
            email: email,
            password: password
        };

        dispatch(loginUser(dataToSubmit));

        if(user.loginSuccess){
            await setErrors('Failed to login, try it again');
        }
    };

    useEffect(() => {
        if(user.loginSuccess){
            dispatch(authUser());
            history.push('/');
        }
    },[dispatch, history, user.loginSuccess]);

    return (
        <div className="login">
            <div className="login__signInForm">
                <div className='login__title'>
                    <Typography variant="h4">Sign in</Typography>
                    <p>to continue to YouTube - Clone</p>
                </div>
                <form autoComplete="off" onSubmit={handleSubmit}> 
                    <TextField 
                        required
                        onChange={handleChangeEmail}
                        value={email} 
                        label="email"
                        type="email"
                        fullWidth
                        className="validate"
                    />
                    <br />
                    <br />
                    <TextField
                        required
                        onChange={handleChangePassword}
                        value={password} 
                        label="password"
                        type="password"
                        fullWidth
                        className="validate"
                    />
                    <br />
                    <br />
                    {errors ? 
                        <div className="login__errorMessage">
                            <WarningIcon color="secondary"/>
                            <p>{errors}</p>
                        </div> : null
                    }
                    <br />
                    <div className="login__message">
                        <p>Not your computer? Use Guest mode to sign in privately.</p>
                        <a href="/"> Learn more</a>
                    </div>
                    <div className="login__bottom">
                        <Link to={'/user/register'}>
                            <p>Create account</p>
                        </Link>
                        <Button  onSubmit={handleSubmit} type="submit" variant="contained" color="primary" size="large" >
                            Sign in
                        </Button>
                    </div>
                </form> 
            </div>
        </div>
    )
}

export default Login
