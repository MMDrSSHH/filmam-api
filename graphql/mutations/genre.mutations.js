const { GraphQLNonNull, GraphQLString } = require("graphql");
const { GenreType } = require("../types/genre.types");
const getDbInstance = require("../../db/connection");

/**
 * @type {import("graphql").GraphQLFieldConfig}
 */
const addGenreResolver = {
  type: GenreType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (source, args, context, info) => {
    const { title } = args;
    const prisma = getDbInstance();

    const genre = { title };
    const newGenre = await prisma.genre.create({ data: genre });

    return newGenre;
  },
};

module.exports = {
  addGenreResolver,
};
