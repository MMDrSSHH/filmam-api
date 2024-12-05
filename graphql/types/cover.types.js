const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const CoverType = new GraphQLObjectType({
  name: "Cover",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    url: {
      type: GraphQLString,
    },
    alt: {
      type: GraphQLString,
    },
  }),
});

module.exports = {
  CoverType,
};
