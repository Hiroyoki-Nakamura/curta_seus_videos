import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import videoRouter from './videoRouter'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            "script-src": ["'self'", "'unsafe-inline'"]
        },
    }
}));

app.use('/videos', videoRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
