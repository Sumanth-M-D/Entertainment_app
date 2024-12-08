import { useGetMediaListQuery } from "../features/mediaApi";
import ContentHeading from "./general/ContentHeading";
import MediaList from "./mediaList/MediaList";

function Movies() {
  // Get the list of movies
  const { data: movies = [], error, isLoading } = useGetMediaListQuery("movie");

  return (
    <div className="mediaSectionContainer">
      <ContentHeading title="Movies" />
      <MediaList mediaList={movies} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Movies;
