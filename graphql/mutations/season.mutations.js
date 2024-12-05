const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID,
} = require("graphql");
const { SeasonType } = require("../types/season.types");
const getDbInstance = require("../../db/connection");

/**
 * @type {import("graphql").GraphQLFieldConfig}
 */
const addSeasonResolver = {
  type: SeasonType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    order: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    filmId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (source, args, context, info) => {
    const prisma = getDbInstance();
    const { title, order, filmId } = args;
    const season = { title, order, filmId };

    const film = await prisma.film.findUnique({
      where: {
        id: season.filmId,
      },
    });

    if (film.type === "STANDALONE") {
      throw new Error("Standalone movies cannot have seasons");
    }

    const newSeason = await prisma.season.create({
      data: season,
    });

    return newSeason;
  },
};

module.exports = {
  addSeasonResolver,
};
