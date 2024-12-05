const { GraphQLList } = require("graphql");
const getDbInstance = require("../../db/connection");
const { FilmType } = require("../types/film.types");

/**
 * @type {import("graphql").GraphQLFieldConfig}
 */
const filmsResolver = {
  type: new GraphQLList(FilmType),
  resolve: async (source, args, context, info) => {
    const prisma = getDbInstance();

    const films = await prisma.film.findMany();

    return films;
  },
};

module.exports = {
  filmsResolver,
};
