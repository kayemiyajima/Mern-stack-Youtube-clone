import { Video } from '../models/Video.js';
import mongoose from 'mongoose';

export const getVideo = async (req, res) => {
    await Video.findOne({ '_id': req.body.videoId})
    .populate('writer')
    .exec((err, video) => {
      if(err) {
        res.status(400).send(err);
      } else {
          res.status(200).send(video);
      }
    });
};

export const likeVideo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send('No video with that id');

    const video = await Video.findById(id);
    const updatedVideo = await Video.findByIdAndUpdate(id, { likeCount: video.likeCount + 1 }, { new: true }).populate('writer');

    res.json(updatedVideo);
}

export const dislikeVideo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send('No video with that id');

    const video = await Video.findById(id);
    const updatedVideo = await Video.findByIdAndUpdate(id, { dislikeCount: video.dislikeCount + 1 }, { new: true }).populate('writer');

    res.json(updatedVideo);
}