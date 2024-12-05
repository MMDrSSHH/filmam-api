const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const graphqlSchema = require("./graphql/index.resolvers");
// const {
//   default: graphqlUploadExpress,
// } = require("graphql-upload/graphqlUploadExpress.mjs");

const app = express();

// app.use(graphqlUploadExpress());
app.all("/graphql", createHandler({ schema: graphqlSchema }));

module.exports = app;
