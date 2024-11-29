import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/TVShowsPage";
import MediaDetailsPage from "./pages/MediaDetailsPage";
import BookmarksPage from "./pages/BookmarksPage";
import UserAccountPage from "./pages/UserAccountPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies">
          <Route index element={<MoviesPage />} />
          <Route path=":id" element={<MediaDetailsPage />} />
        </Route>

        <Route path="/tvshows">
          <Route index element={<TVShowsPage />} />
          <Route path=":id" element={<MediaDetailsPage />} />
        </Route>

        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/user" element={<UserAccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      {/* For Toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={1000}
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
    </BrowserRouter>
  );
}

export default App;
