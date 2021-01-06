import express from "express";
import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import { Video } from "../models/Video.js";

const router = express.Router();

router.get("/getvideos", (req, res)=> {
    Video.find().populate('writer')
    .exec((err, videos)=> {
        if(err) {
            res.status(400).send(err);
        } else {
            res.status(200).send({ success: true, videos })
        }
    })
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/');
  },
  filename: (req, file, cb) =>  {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadvideo", (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .send("Error while uploading file. Try again later.");
    } else if (err) {
      return res.status(500).send({ success: false });
    } else {
      return res.status(200).send({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
      });
    }
  });
});

router.post("/upload", (req, res) => {
  const newVideo = new Video(req.body);
  console.log(req.body);
  try {
    newVideo.save();

    res.status(201).json({
      successUpload: true,
    });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

router.post("/thumbnail", (req, res) => {
  let thumbsFilePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      count: 1,
      folder: "../uploads/thumbnails",
      size: "300x200",
      filename: "thumbnail-%b.png",
    });
});

router.post('/getVideo', (req, res)=> {
  Video.findOne({ '_id': req.body.videoId})
  .populate('writer')
  .exec((err, video) => {
    if(err) {
      res.status(400).send(err);
    } else {
        res.status(200).send({ success: true, video })
    }
  });
});

export default router;
