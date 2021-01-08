import React,{ useState, useEffect } from 'react';
import './Home.css';
import VideoCard from './VideoCard';
import axios from 'axios';
import moment from 'moment';
import { Grid, Typography } from '@material-ui/core';

function Home() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videos)
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])


    return (
        <div className='home'>
            <Typography variant="h5">Recommended</Typography>
            <hr />
            <Grid container spacing={2}>
                {videos.map((video) => (
                <Grid item xs={6} sm={4} md={3}>
                    <VideoCard 
                        videoId={video._id}
                        image={`http://localhost:5000/${video.thumbnail}`}
                        title={video.title}
                        channel={video.writer.name + ' ' + video.writer.lastname}
                        views={video.views}
                        timestamp={moment(video.createdAt).format("MMM DD YYYY")}
                        channelImage={video.writer.avatarImage}
                        minutes={Math.floor(video.duration / 60)}
                        seconds={('0' + (Math.floor(video.duration - (Math.floor(video.duration / 60)) * 60))).slice(-2)}
                    />
                </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Home
