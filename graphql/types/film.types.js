const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLEnumType,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { GenreType } = require("./genre.types");
const getDbInstance = require("../../db/connection");

const FilmType = new GraphQLObjectType({
  name: "Film",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    type: {
      type: new GraphQLEnumType({
        name: "Type",
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
      type: new GraphQLList(GenreType),
      resolve: async (source, args, context, info) => {
        const prisma = getDbInstance();
        const filmId = source.id;
        const filmGenres = await prisma.filmGenre.findMany({
          where: {
            filmId,
          },
          select: {
            genre: true,
          },
        });

        const genres = filmGenres.map((filmGenre) => filmGenre.genre);
        return genres;
      },
    },
    seasons: {
      type: new GraphQLList(require("./season.types").SeasonType),
      resolve: async (source, args, context, info) => {
        const prisma = getDbInstance();

        const filmId = source.id;

        const seasons = await prisma.season.findMany({
          where: {
            filmId,
          },
        });

        return seasons;
      },
    },
    covers: {
      type: new GraphQLList(require("./cover.types").CoverType),
      resolve: async (source, args, context, info) => {
        const prisma = getDbInstance();

        const filmId = source.id;
        const filmCovers = await prisma.filmCover.findMany({
          where: {
            filmId,
          },
          select: {
            cover: true,
          },
        });

        const covers = filmCovers.map((fc) => fc.cover);

        return covers;
      },
    },
  }),
});

module.exports = {
  FilmType,
};
