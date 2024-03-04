import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/connectDB.js';

dotenv.config();
const app = express();
connectDB();
const port = process.env.PORT ?? 8000;

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(
    cors({
      origin: [
        "localhost:5173", //vite
        "localhost:3000", //nextjs
        "https://your-frontend-website.com",
      ],
     credentials: true
    })
);

app.get('/', (req, res) => {
  res.send('Hello World, from Express Server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
