import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import roleRouter from './routes/roleRoutes.js';

const app = express();

app.use(cors())
app.use(express.json());

app.use(userRouter)
app.use(roleRouter)

app.listen(8080)