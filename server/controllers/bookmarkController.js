import Bookmarks from "../models/bookmarkModel.js";
import Media from "../models/mediaModel.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import respondSuccess from "../utils/respondSuccess.js";
import commonMediaController from "./commonMediaController.js";

/*


*/

// Function to create a new bookmark list for a user
const createBookmarks = async function (userId, next) {
  try {
    return await Bookmarks.create({ userId });
  } catch (err) {
    next(err);
  }
};

/*


*/

// Function to get the bookmark list of the logged-in user
const getBookmarks = asyncHandler(async function (req, res, next) {
  const user = req.user;

  const bookmarks = await Bookmarks.findById(user.bookmarksId);
  respondSuccess(200, { bookmarks }, res);
});

/*


*/

// Function to add a media item to the user's bookmark list
const addBookmark = asyncHandler(async function (req, res, next) {
  const { id } = req.body;
  const bookmarksId = req.user.bookmarksId;

  if (!id) return next(new AppError("Please provide id of the media."));

  // Find the media item in the database if not found then insert a new document
  let media = await Media.findOne({ id });
  if (!media) media = await commonMediaController.insertMedia(req.body);

  // Find the bookmarks document, check if bokmark already exist, if not add the bookmark
  let bookmarks = await Bookmarks.findById(bookmarksId);
  if (!bookmarks)
    return next(new AppError("Bookmarks List doesnt exist for this user", 400));

  if (bookmarks.bookmarkList.includes(media._id))
    return next(new AppError("Media is already bookmarked", 400));

  bookmarks.bookmarkList.push(media._id);
  await bookmarks.save();

  // Populate the bookmarks document with media itmes details
  bookmarks = await bookmarks.populate("bookmarkList");
  respondSuccess(201, { bookmarks }, res);
});

/*


*/

// Function to remove a media item from the user's bookmark list
const deleteBookmark = asyncHandler(async function (req, res, next) {
  const { _id } = req.body;
  const bookmarksId = req.user.bookmarksId;

  if (!_id) return next(new AppError("Please provide id of the media."));

  // Find the bookmarks document
  let bookmarks = await Bookmarks.findById(bookmarksId);
  if (!bookmarks)
    return next(new AppError("Bookmarks List doesnt exist for this user", 400));

  // Filter out the media item from the bookmark list
  const filteredBookmarkList = bookmarks.bookmarkList.filter(
    (ele) => ele.toString() !== _id.toString()
  );

  // If the media item was not found in the bookmark list, return an error
  if (filteredBookmarkList.length === bookmarks.bookmarkList.length)
    return next(new AppError("Media is not bookmarked", 400));

  // Update the bookmark list and save the updated document
  bookmarks.bookmarkList = filteredBookmarkList;
  await bookmarks.save();

  // Populate the bookmarkList field with the media items' details
  bookmarks = await bookmarks.populate("bookmarkList");
  respondSuccess(200, { bookmarks }, res);
});

/*


*/

const bookmarksController = {
  createBookmarks,
  getBookmarks,
  addBookmark,
  deleteBookmark,
};

export default bookmarksController;
