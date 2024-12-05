const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID,
} = require("graphql");
const { EpisodeType } = require("../types/episode.types");
const getDbInstance = require("../../db/connection");
const { CoverType } = require("../types/cover.types");

/**
 * @type {import("graphql").GraphQLFieldConfig}
 */
const addEpisodeResolver = {
  type: EpisodeType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    summary: {
      type: new GraphQLNonNull(GraphQLString),
    },
    releaseDate: {
      type: new GraphQLNonNull(GraphQLString),
    },
    order: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    seasonId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (source, args, context, info) => {
    const prisma = getDbInstance();

    const { title, summary, releaseDate, order, seasonId } = args;
    const episode = {
      title,
      summary,
      releaseDate: new Date(releaseDate),
      order,
    };

    const season = await prisma.season.findUnique({ where: { id: seasonId } });

    if (!season)
      throw new Error(`Season with id ${episode.seasonId} does not exist`);

    const newEpisode = await prisma.episode.create({
      data: {
        ...episode,
        EpisodeSeason: {
          create: {
            seasonId,
          },
        },
      },
    });

    return newEpisode;
  },
};

// /**
//  * @type {import("graphql").GraphQLFieldConfig}
//  */
const addEpisodeCoverResolver = {
  type: CoverType,
  args: {},
};

module.exports = {
  addEpisodeResolver,
};
