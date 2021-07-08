import dotenv from 'dotenv';

import http from 'http';
import app from './app.js';

import mongoose from 'mongoose';

dotenv.config();

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    return val;
  }

  if (port < 0) {
    throw new Error(`Server port '${port}' is invalid`);
  }

  return port;
}

const port = normalizePort(process.env.SERVER_PORT);
const server = http.createServer(app(process.env.FRONT_END_URL));

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', async () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  console.log(`Listening on ${bind}`);
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@sopekocko.mldfa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    );

    console.log('Connection established with database');
  } catch (error) {
    console.log(`Unable to connect to database :${error}`);
    process.exit(1);
  }
});

server.listen(port);
