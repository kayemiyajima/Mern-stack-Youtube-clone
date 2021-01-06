import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import userRouter from './routes/user.js';
import videoRouter from './routes/video.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));

app.get('/', (req, res)=> {
    res.send('Hello to YouTube-clone API')
});

app.use('/api/users', userRouter);
app.use('/api/video', videoRouter);

app.use('/uploads', express.static('../uploads/'));

const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on port : ${5000}`)))
.catch((error) => console.log(error.message));

mongoose.set( 'useFindAndModify', false );