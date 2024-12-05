const { GraphQLList } = require("graphql");
const { GenreType } = require("../types/genre.types");
const getDbInstance = require("../../db/connection");

/**
 * @type {import("graphql").GraphQLFieldConfig}
 */
const genresResolver = {
  type: new GraphQLList(GenreType),
  resolve: async (source, args, context, info) => {
    const prisma = getDbInstance();

    const genres = await prisma.genre.findMany();

    return genres;
  },
};

module.exports = {
  genresResolver,
};
