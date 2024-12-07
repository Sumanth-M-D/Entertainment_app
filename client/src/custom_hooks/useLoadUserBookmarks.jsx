import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLazyGetUserBookmarksQuery } from "../features/mediaApi";

import {
  setBookmarks,
  setBookmarkError,
  setBookmarkLoading,
} from "./features/bookmarkSlice";

export function useLoadUserBookmarks() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  const [getUserBookmarks, { isLoading: isBookmarksLoading }] =
    useLazyGetUserBookmarksQuery();

  useEffect(() => {
    async function loadBookmarks() {
      try {
        dispatch(setBookmarkLoading(true));
        const bookmarks = await getUserBookmarks().unwrap();
        dispatch(setBookmarks(bookmarks));
      } catch (err) {
        dispatch(setBookmarkError(err));
        toast.error(err.message || "Error loading bookmarks");
      } finally {
        dispatch(setBookmarkLoading(false));
      }
    }

    if (isAuthenticated) {
      loadBookmarks();
    }
  }, [isAuthenticated, getUserBookmarks, dispatch]);

  return isBookmarksLoading;
}
