const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const getDbInstance = require("../../db/connection");

const SeasonType = new GraphQLObjectType({
  name: "Season",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    order: {
      type: GraphQLInt,
    },
    title: {
      type: GraphQLString,
    },
    film: {
      type: require("./film.types").FilmType,
      resolve: async (source, args, context, info) => {
        const prisma = getDbInstance();

        const seasonId = source.id;

        const { film } = await prisma.season.findUnique({
          where: { id: seasonId },
          select: {
            film: true,
          },
        });

        return film;
      },
    },
    episodes: {
      type: new GraphQLList(require("./episode.types").EpisodeType),
      resolve: async (source, args, context, info) => {
        const prisma = getDbInstance();
        const seasonId = source.id;

        const seasonEpisodes = await prisma.episodeSeason.findMany({
          where: {
            seasonId,
          },
          select: {
            episode: true,
          },
        });

        const episodes = seasonEpisodes.map((se) => se.episode);

        return episodes;
      },
    },
  }),
});

module.exports = {
  SeasonType,
};
