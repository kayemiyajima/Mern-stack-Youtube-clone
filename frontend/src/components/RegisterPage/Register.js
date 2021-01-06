import React, { useState } from 'react';
import './Register.css';
import { Typography, TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import FileBase from 'react-file-base64';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../actions/user_actions';

function Register() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [dataToRegister, setDataToRegister] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        avatarImage: ''
    });
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [checked, setChecked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(dataToRegister);
        if (dataToRegister.password !== passwordConfirmation){
            setError('passwords mismatch');
        } else {
            dispatch(addUser(dataToRegister))
            .then(history.push('./login'));
        }
    };

    const handleCheckBoxChange = (e) => {
        setChecked(e.target.checked);
    }

    return (
        <div className="register">
            <div className="register__container">
                <div className="register__container__left">
                    <div className='register__title'>
                        <Typography variant="h4">Create your account</Typography>
                        <p>to continue to YouTube - Clone</p>
                    </div>

                    <div className="register__form">
                    <form autoComplete="off" onSubmit={handleSubmit}> 
                        <div className="register__form__name">
                            <TextField 
                                required
                                onChange={(e) =>
                                    setDataToRegister({ ...dataToRegister, name: e.target.value})}
                                value={dataToRegister.name} 
                                label="First name"
                                type="text"
                                className="validate"
                            />
                            <TextField
                                required
                                onChange={(e) => 
                                    setDataToRegister({...dataToRegister, lastname: e.target.value})}
                                value={dataToRegister.lastname} 
                                label="Last Name"
                                type="text"
                                className="validate"
                            />
                        </div>
                    <br />
                    <TextField
                        required
                        onChange={(e) => 
                            setDataToRegister({...dataToRegister, email: e.target.value})}
                        value={dataToRegister.email} 
                        label="Your email Address"
                        type="email"
                        fullWidth
                    />
                    <br />
                    <div className="register__message">
                        <p>You'll need to confirm that this email belongs to you.</p>
                    </div>
                    <br />
                    <div className="register__form__password">
                        <TextField 
                            required
                            onChange={(e) => 
                                setDataToRegister({...dataToRegister, password: e.target.value})}
                            value={dataToRegister.password} 
                            label="Password"
                            type={checked ? "text" : "password"}
                            inputProps={{minLength: 8}}
                            className="validate"
                        />
                        <TextField
                            required
                            onChange={(e) => 
                                setPasswordConfirmation(e.target.value)}
                            value={passwordConfirmation} 
                            label="Confirm"
                            type={checked ? "text" : "password"}
                            className="validate"
                        />
                        <div className='register__form__password__detail'>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={checked}
                                    onChange={handleCheckBoxChange}
                                    color="primary"
                                    fontSize="small"
                                />
                                }
                                label="Show password"
                            />
                            <p>* Use 8 or more characters.</p>
                        </div>
                    </div>
                    <br />
                    <div className='register__fileInput'>
                            <p>Profile Image*</p>
                            <FileBase
                                type='file'
                                multiple={false}
                                onDone={({ base64 }) => 
                                    setDataToRegister({ ...dataToRegister, avatarImage: base64})}
                            />
                    </div>
                    {error ? 
                        <div className="registerLogin__errorMessage">
                            <WarningIcon color="secondary"/>
                            <p>{error}</p>
                        </div> : null
                    }
                    <div className="register__bottom">
                        <Link to={'/user/login'}>
                            <p>Sign in instead</p>
                        </Link>
                        <Button  onSubmit={handleSubmit} type="submit" variant="contained" color="primary" size="large" >
                            Create
                        </Button>
                    </div>
                </form>
                    </div>
                </div>
                <div className="register__container__right">
                    <img 
                        alt="create your accout" 
                        src="https://images.assetsdelivery.com/compings_v2/bsd555/bsd5551909/bsd555190901994.jpg" 
                    />
                </div>
            </div>
        </div>
    )
}

export default Register
