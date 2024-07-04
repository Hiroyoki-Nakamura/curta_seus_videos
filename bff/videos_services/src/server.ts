import express from 'express';
import dotenv from 'dotenv';
import videoRouter from './videoRouter'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/videos', videoRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
