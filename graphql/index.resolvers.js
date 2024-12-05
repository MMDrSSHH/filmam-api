const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { filmsResolver } = require("./queries/film.resolvers");
const { addGenreResolver } = require("./mutations/genre.mutations");
const { genresResolver } = require("./queries/genre.resolvers");
const { addFilmResolver } = require("./mutations/film.mutations");
const { addSeasonResolver } = require("./mutations/season.mutations");
const { addEpisodeResolver } = require("./mutations/episode.mutations");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    films: filmsResolver,
    genres: genresResolver,
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addGenre: addGenreResolver,
    addFilm: addFilmResolver,
    addSeason: addSeasonResolver,
    addEpisode: addEpisodeResolver,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;
