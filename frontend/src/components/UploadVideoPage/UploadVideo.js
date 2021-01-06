import React, { useState, useEffect } from 'react'
import "./UploadVideo.css" ;
import { Typography, Button, TextField, MenuItem, Backdrop, CircularProgress, Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Dropzone from "react-dropzone";
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const Private = [
    { value: 0, label:'Private' },
    { value: 1, label: 'Public' }
]

const Category = [
    { value: 'Film & Animation', label:'Film & Animation' },
    { value: 'Autos & Vehcles', label: 'Autos & Vehcles' },
    { value: 'Music', label: 'Music' },
    { value: 'Pets & Animals', label: 'Pets & Animals' },
    { value: 'Sports', label: 'Sports' }
]

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function UploadVideoPage() {

    const url = 'http://localhost:5000';
    const user = useSelector(state =>state.user);
    const history = useHistory();
    console.log(user);

    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0);
    const [categories, setCategories] = useState(0);
    const [filePath, setFilePath] = useState("");
    const [duration, setDuration] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleChangeOne = (e) => {
        setPrivacy(e.target.value)
    }

    const handleChangeTwo = (e) => {
        setCategories(e.target.value)
    }

    const [file, setFile] = useState({});
    const [errorMsg, setErrorMsg] = useState('');

    const onDrop = async ( Files ) => {
        // setLoading(!loading);
        setFile(Files[0]);
        try {
            const formData = new FormData();
            formData.append('file', Files[0]);
            
            const config = { "content-type": "multiport/form-data" }

            await axios.post(`${url}/api/video/uploadvideo`, formData, config)
            .then(res => {
                if(res.data.success){
                    let videoData = {
                        filePath: res.data.filePath,
                        fileName: res.data.fileName
                    }
                    setFilePath(res.data.filePath);

                    axios.post(`${url}/api/video/thumbnail`, videoData)
                    .then(res => {
                        if(res.data.success) {
                            setDuration(res.data.fileDuration);
                            setThumbnail(res.data.thumbsFilePath);
                        } else {
                            alert('Failed to make the thumbnail');
                        };
                    });

                } else {
                    alert('failed to save the video in server');
                }
            });
        } catch (error) {
            console.log('something is wrong', error);
        }
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (title !== '' && description !== ''){
            if (file) {
                const dataToSubmit = {
                    writer: user.user._id,
                    title: title,
                    description: description,
                    privacy: privacy,
                    categories: categories,
                    filePath: filePath,
                    duration: duration,
                    thumbnail: thumbnail
                }

                axios.post(`${url}/api/video/upload`, dataToSubmit)
                .then(res => {
                    if(res.data.successUpload) {
                        alert('successed to upload video!!');
                        history.push('/');
                    } else {
                         alert('failed to upload video');
                    }
                })
            } else {
                setErrorMsg('Please select a file to add.');
            }
        } else {
            setErrorMsg('Please enter all the field values.');
        }
    };

    useEffect(() => {
        if(thumbnail){
            setLoading(false);
        }
    },[thumbnail]);

    // if(user.loginSuccess){
    return (
        <div className="uploadVideo">
            <div className="uploadVideo__container">
                <div className='uploadVideo__title'>
                    <Typography variant="h4">Upload Video</Typography>
                </div>

                <form autoComplete="off" onSubmit={handleSubmit} > 
                    <div className="uploadVideo__container__form">
                        <div className="uploadVideo__container__left">
                            <TextField 
                                required
                                onChange={handleChangeTitle} 
                                value={title} 
                                label="Title"
                                fullWidth
                            />
                            <br /><br />
                            <TextField
                                required
                                onChange={handleChangeDescription}
                                value={description}
                                label="Description"
                                fullWidth
                                multiline
                            />
                            <br /><br />
                            <TextField
                                required
                                select
                                label="privacy"
                                onChange={handleChangeOne}
                                helperText="Please select a privacy"
                                >
                                {Private.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>
                                    {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <br />
                            <TextField
                                required
                                select
                                label="category"
                                onChange={handleChangeTwo}
                                helperText="Please select a category"
                                >
                                {Category.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>
                                    {item.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <div className="uploadVideo__container__right">
                            <div className="uploadVideo__dropzone">
                                <Dropzone 
                                    onDrop={onDrop}
                                    multiple={false}
                                    accept="video/mp4"
                                    maxSize={800000000}>
                                    {({getRootProps, getInputProps}) => (
                                        <div className="uploadVideo__dropzone__input" {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <AddCircleIcon color="disabled" style={{ fontSize: 30 }} />
                                            <br />
                                            <p>
                                                Drag and drop a file OR click here to select a file
                                            </p>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                            <br />
                            {thumbnail !== "" &&
                                <div>
                                    <img src={`${url}/${thumbnail}`}
                                        alt='hahaha' />
                                </div>
                            }
                            {file && (
                                <div>
                                    <strong>Selected file:</strong> {file.name}
                                </div>
                            )}
                            {errorMsg ? 
                                <div className="Uploadvideo__errorMessage">
                                    <WarningIcon color="secondary"/>
                                    <p>{errorMsg}</p>
                                </div> : null
                            }
                            <br />
                            <div className="uploadVideo__button">
                                <Button variant="contained" color="primary" size="large" type='submit' 
                                onClick={handleSubmit}>
                                    Upload
                                </Button>
                            </div>
                        </div>
                    </div> 
                </form>
            </div>
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
                <p>Loading......</p>
            </Backdrop>
        </div>
    )
    // )} else {
    //     return (
    //         <div>
    //             <Dialog
    //                 open={true}
    //                 aria-labelledby="alert-dialog-title"
    //                 aria-describedby="alert-dialog-description"
    //             >
    //                 <DialogTitle id="alert-dialog-title">{"Are you registered?"}</DialogTitle>
    //                 <DialogContent>
    //                 <DialogContentText id="alert-dialog-description">
    //                     To upload videos, please sign in first!
    //                 </DialogContentText>
    //                 </DialogContent>
    //                 <DialogActions>
    //                 <Link to={'/user/login'}>
    //                     <Button color="primary">
    //                         SIGN IN
    //                     </Button>
    //                 </Link>
    //                 </DialogActions>
    //             </Dialog>
    //         </div>
    //     )
    // }
}

export default UploadVideoPage
