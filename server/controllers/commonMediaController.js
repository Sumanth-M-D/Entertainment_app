import asyncHandler from "../utils/asyncHandler.js";
import fetchFromTMDB from "../utils/fetchFromTMDB.js";
import respondSuccess from "../utils/respondSuccess.js";
import { formatMediaRecommendedData } from "../utils/dataFormatFactory.js";
import Media from "../models/mediaModel.js";
import mediaHandlerFactory from "./mediaHandlerFactory.js";

// Handler function to get recommended media
const getRecommendedMedia = asyncHandler(async (req, res, next) => {
  const movieEndpoint = `discover/movie`;
  const tvEndpoint = `discover/tv`;

  const query = `include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc`;

  const movieData = await fetchFromTMDB("GET", movieEndpoint, query, next);
  const tvData = await fetchFromTMDB("GET", tvEndpoint, query, next);

  const mediaList = formatMediaRecommendedData(movieData, tvData);

  respondSuccess(200, mediaList, res);
});

// Function to insert a media document into the database
async function insertMedia(data) {
  try {
    const mediaData = {
      id: data.id,
      type: data.type || "",
      title: data.title || "",
      overview: data.overview || "",
      releaseDate: data.releaseDate || "",
      backdropPath: data.backdropPath || "",
    };

    const newMedia = await Media.create(mediaData);
    return newMedia;
  } catch (err) {
    next(err);
  }
}

// Defining a handler to get all trending media
const getTrendingMediaAll = mediaHandlerFactory.getTrendingMedia("all");

const commonMediaController = {
  getTrendingMediaAll,
  getRecommendedMedia,
  insertMedia,
};

export default commonMediaController;
