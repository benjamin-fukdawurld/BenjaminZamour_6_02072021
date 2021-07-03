import express from 'express';
import cors from 'cors';

import auth from './routes/auth.js';
import sauces from './routes/sauces.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(auth);
app.use(sauces);

export default app;
