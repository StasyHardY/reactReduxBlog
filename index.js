import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import path from 'path'



const app = express()

dotenv.config()

// CONST
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(express.json())



// Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)


async function start() {
   try {
      await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.uau7dsg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)
      app.listen(PORT, () => console.log(`server start on port: ${PORT}`))
   } catch (error) {
      console.log(error)
   }
}


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
start()
