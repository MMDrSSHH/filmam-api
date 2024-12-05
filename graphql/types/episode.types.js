const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const getDbInstance = require("../../db/connection");

const EpisodeType = new GraphQLObjectType({
  name: "Episode",
  fields: () => ({
    id: {
      type: GraphQLID,
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
    order: {
      type: GraphQLInt,
    },
    season: {
      type: require("./season.types").SeasonType,
      resolve: async (source, args, context, info) => {
        const prisma = getDbInstance();

        const episodeId = source.id;
        const { season } = await prisma.episodeSeason.findFirst({
          where: {
            episodeId: episodeId,
          },
          select: {
            season: true,
          },
        });

        return season;
      },
    },
    covers: {
      type: new GraphQLList(require("./cover.types").CoverType),
      resolve: async (source, args, context, info) => {
        const prisma = getDbInstance();

        const episodeId = source.id;
        const episodeCovers = await prisma.episodeCover.findMany({
          where: {
            episodeId,
          },
          select: {
            cover: true,
          },
        });

        const covers = episodeCovers.map((ec) => ec.cover);

        return covers;
      },
    },
  }),
});

module.exports = {
  EpisodeType,
};
