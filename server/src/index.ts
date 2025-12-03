import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import postRouter from './routes/postRouter'
import profileRouter from './routes/profileRouter'
import userRouter from './routes/userRouter'
import followRouter from './routes/followRoute'
import likeRoute from './routes/likeRoute'
import commentsRouter from './routes/commentsRouter'
import conversationRouter from './routes/conversationRouter'
import messagesRouter from './routes/messagesRouter'

const app = express()
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://onlyfriends69.netlify.app"
  ],
  credentials: true
}));
app.use(express.json())

app.use('/posts', postRouter)
app.use('/profile', profileRouter)
app.use('/users', userRouter)
app.use('/follow', followRouter)
app.use('/like', likeRoute)
app.use('/comments', commentsRouter)
app.use('/conversation', conversationRouter)
app.use('/messages', messagesRouter)

app.get('/', (_, res) => res.send(' Server is running'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server running on http://localhost:5000'))
