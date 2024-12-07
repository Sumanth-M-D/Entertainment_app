import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/general/Loader";
import {
  useGetLoggedInUserQuery,
  useLazyGetUserBookmarksQuery,
} from "./features/mediaApi";
import { setUserdata } from "./features/userSlice";
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
