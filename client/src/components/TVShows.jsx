import { useGetMediaListQuery } from "../features/mediaApi";
import ContentHeading from "./general/ContentHeading";
import MediaList from "./mediaList/MediaList";

function TvShows() {
  const {
    data: tvShows = [],
    error,
    isLoading,
  } = useGetMediaListQuery("tvshow");
  return (
    <div className="mediaSectionContainer">
      <ContentHeading title="TV Series" />
      <MediaList mediaList={tvShows} isLoading={isLoading} error={error} />
    </div>
  );
}

export default TvShows;
