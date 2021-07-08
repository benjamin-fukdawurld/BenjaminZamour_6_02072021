import express from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';

import auth from './routes/auth.js';
import sauces from './routes/sauces.js';

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(helmet())
app.use('/api/auth', auth);
app.use('/api/sauces', sauces);

app.use('/images', express.static(path.join(path.dirname(''), 'images')));

export default app;
