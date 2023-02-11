import { resolvers,typeDefs } from './service/index';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express, { request } from 'express';
import http from 'http';
import db from './config/db';
import { getUser } from './utility/getUser';
require('dotenv').config()

async function startApolloServer() {
  const app = express();
  db()
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: async({req}) => {
      const token = req.headers.authorization
      const user = token ? await getUser(token) : null
      let context = {user}
      return context
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>(resolve => httpServer.listen({ port: process.env.PORT  }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server?.graphqlPath}`);
  console.log(process.env.NAME?.toUpperCase())
}

startApolloServer()