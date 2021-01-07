import React from 'react';
import './VideoPage.css';
import SelectedVideo from './SelectedVideo';
import Thumbnail from './Thumbnail';
import Grid from '@material-ui/core/Grid';


function VideoPage() {
    return (
        <div className="videoPage">
            <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={7}>
                        <SelectedVideo />
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}> 
                        <Thumbnail />
                    </Grid>
            </Grid>
        </div>
    )
}

export default VideoPage
