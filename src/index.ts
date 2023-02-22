import { resolvers, typeDefs } from "./service/index";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import db from "./config/db";
import { getUser } from "./utility/getUser";
require("dotenv").config();

interface MyContext {
  token?: String;
}

async function startApolloServer() {
  const app = express();
  db();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization;
        const user = token ? await getUser(token) : null;
        let context = { user };
        return context;
      },
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql}`);
  console.log(process.env.NAME?.toUpperCase());
}

startApolloServer();
