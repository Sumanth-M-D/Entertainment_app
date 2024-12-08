import { useSelector } from "react-redux";

import ContentHeading from "./general/ContentHeading";
import MediaList from "./mediaList/MediaList";

function Bookmarks() {
  // Get the bookmarks from the store
  const { bookmarks, isLoading, error } = useSelector(
    (state) => state.bookmark,
  );

  return (
    <div className="mediaSectionContainer">
      <ContentHeading title="Bookmarks" />
      {bookmarks.length === 0 && <p className="text-lg">No bookmarks found</p>}
      {bookmarks.length > 0 && (
        <MediaList mediaList={bookmarks} isLoading={isLoading} error={error} />
      )}
    </div>
  );
}

export default Bookmarks;
