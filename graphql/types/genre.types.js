const { GraphQLObjectType, GraphQLString } = require("graphql");

const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
  }),
});

module.exports = {
  GenreType,
};
