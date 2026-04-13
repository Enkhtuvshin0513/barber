/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { expressMiddleware } from '@as-integrations/express4';
import { userApolloServer } from './modules/user/apollo/index';

import { ownerRouter } from './modules/owner/routes';
import { utilsRouter } from './modules/utils/routes';

const app = express();

await userApolloServer.start();

app.use('/api/graphql', express.json(), expressMiddleware(userApolloServer));

app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api/owner', ownerRouter);
app.use('/api/utils', utilsRouter);

const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
