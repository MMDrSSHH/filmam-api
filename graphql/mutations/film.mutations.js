const { GraphQLEnumType, GraphQLString, GraphQLList } = require("graphql");
const getDbInstance = require("../../db/connection");
const { GenreType } = require("../types/genre.types");
const { FilmType } = require("../types/film.types");
const { CoverType } = require("../types/cover.types");

/**
 * @type {import("graphql").GraphQLFieldConfig}
 */
const addFilmResolver = {
  type: FilmType,
  args: {
    type: {
      type: new GraphQLEnumType({
        name: "FilmType",
        values: {
          STANDALONE: { value: "STANDALONE" },
          SERIES: { value: "SERIES" },
        },
      }),
    },
    title: {
      type: GraphQLString,
    },
    summary: {
      type: GraphQLString,
    },
    releaseDate: {
      type: GraphQLString,
    },
    genres: {
      type: new GraphQLList(GraphQLString),
    },
  },
  resolve: async (source, args, context, info) => {
    const prisma = getDbInstance();
    const { type, title, summary, releaseDate, genres } = args;

    const film = { type, title, summary, releaseDate: new Date(releaseDate) };
    const newFilm = await prisma.film.create({
      data: {
        ...film,
        FilmGenre: {
          createMany: {
            data: genres.map((genre) => ({ genreId: genre })),
          },
        },
      },
    });

    return newFilm;
  },
};

/**
 * @type {import("graphql").GraphQLFieldConfig}
 */
const addFilmCoverResolver = {
  type: CoverType,
  args: {
    
  },
};

module.exports = {
  addFilmResolver,
};
