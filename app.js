const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const graphqlSchema = require("./graphql/index.resolvers");
// const {
//   default: graphqlUploadExpress,
// } = require("graphql-upload/graphqlUploadExpress.mjs");
// const graphqlUploadExpress = (...args) =>
//   import("graphql-upload/graphqlUploadExpress.mjs").then(
//     ({ default: graphqlUploadExpress }) => graphqlUploadExpress(args)
//   );

const getGraphqlUploadExpress = async () =>
  await import("graphql-upload/graphqlUploadExpress.mjs");

// app.use(graphqlUploadExpress());

const scaffoldApp = async () => {
  const { default: graphqlUploadExpress } = await getGraphqlUploadExpress();
  const app = express();

  app.use(graphqlUploadExpress());
  app.all("/graphql", createHandler({ schema: graphqlSchema }));

  return app;
};

module.exports = scaffoldApp;
