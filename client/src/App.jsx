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

// import PageNotFound from "./pages/PageNotFound";
// import HomePage from "./pages/HomePage";
// import MoviesPage from "./pages/MoviesPage";
// import TVShowsPage from "./pages/TVShowsPage";
// import MediaDetailsPage from "./pages/MediaDetailsPage";
// import BookmarksPage from "./pages/BookmarksPage";
// import UserAccountPage from "./pages/UserAccountPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import VideoModal from "./components/general/VideoModal";
// import Protected from "./components/general/Protected";

const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const TVShowsPage = lazy(() => import("./pages/TVShowsPage"));
const MediaDetailsPage = lazy(() => import("./pages/MediaDetailsPage"));
const BookmarksPage = lazy(() => import("./pages/BookmarksPage"));
const UserAccountPage = lazy(() => import("./pages/UserAccountPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const VideoModal = lazy(() => import("./components/general/VideoModal"));
const Protected = lazy(() => import("./components/general/Protected"));

function App() {
  const dispatch = useDispatch();

  const { mediaId } = useSelector((state) => state.videoModal);
  const { isAuthenticated } = useSelector((state) => state.user);

  const { data: userData, isLoading: userDataLoading } =
    useGetLoggedInUserQuery();

  const [getUserBookmarks, { isLoading: bookmarksLazyLoading }] =
    useLazyGetUserBookmarksQuery();

  useEffect(() => {
    if (userData) {
      dispatch(setUserdata(userData));
    }
  }, [userData, dispatch]);

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

  if (userDataLoading || bookmarksLazyLoading) return <Loader />;

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/tvshows" element={<TVShowsPage />} />
          <Route
            path="/bookmarks"
            element={
              <Protected>
                {" "}
                <BookmarksPage />
              </Protected>
            }
          />

          <Route path="/mediadetails">
            <Route
              path="movies/:id"
              element={<MediaDetailsPage type={"movie"} />}
            />
            <Route
              path="tvshows/:id"
              element={<MediaDetailsPage type={"tvshow"} />}
            />
          </Route>

          <Route path="/user" element={<UserAccountPage />} />
          <Route path="/useraccount" element={<UserAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        {/* For Toast notifications */}
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
        {mediaId && <VideoModal />}
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
