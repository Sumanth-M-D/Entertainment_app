import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import { lazy, Suspense } from "react";
import Loader from "./components/general/Loader";

import { useLoadLoggedInUserData } from "./custom_hooks/useLoadLoggedInUserData";
import { useLoadUserBookmarks } from "./custom_hooks/useLoadUserBookmarks";

import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/TVShowsPage";
import MediaDetailsPage from "./pages/MediaDetailsPage";
import BookmarksPage from "./pages/BookmarksPage";
import UserAccountPage from "./pages/UserAccountPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VideoModal from "./components/general/VideoModal";
import Protected from "./components/general/Protected";

// const PageNotFound = lazy(() => import("./pages/PageNotFound"));
// const HomePage = lazy(() => import("./pages/HomePage"));
// const MoviesPage = lazy(() => import("./pages/MoviesPage"));
// const TVShowsPage = lazy(() => import("./pages/TVShowsPage"));
// const MediaDetailsPage = lazy(() => import("./pages/MediaDetailsPage"));
// const BookmarksPage = lazy(() => import("./pages/BookmarksPage"));
// const UserAccountPage = lazy(() => import("./pages/UserAccountPage"));
// const LoginPage = lazy(() => import("./pages/LoginPage"));
// const SignupPage = lazy(() => import("./pages/SignupPage"));
// const VideoModal = lazy(() => import("./components/general/VideoModal"));
// const Protected = lazy(() => import("./components/general/Protected"));

function App() {
  const { mediaId } = useSelector((state) => state.videoModal);
  const { isUserDataLoading } = useLoadLoggedInUserData();
  const { isBookmarksLoading } = useLoadUserBookmarks();

  if (isUserDataLoading || isBookmarksLoading)
    return (
      <div className="my-56 w-screen flex justify-center">
        <Loader />
      </div>
    );

  return (
    <BrowserRouter>
      {/* <Suspense fallback={<Loader />}> */}
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
      {/* </Suspense> */}
    </BrowserRouter>
  );
}

export default App;
