import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import postRouter from './routes/postRouter'
import profileRouter from './routes/profileRouter'
import userRouter from './routes/userRouter'
import followRouter from './routes/followRoute'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/posts', postRouter)
app.use('/profile', profileRouter)
app.use('/users', userRouter)
app.use('/follow', followRouter)

app.get('/', (_, res) => res.send(' Server is running'))

app.listen(5000, () => console.log('Server running on http://localhost:5000'))
