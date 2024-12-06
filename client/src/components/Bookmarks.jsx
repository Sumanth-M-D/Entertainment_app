import { useSelector } from "react-redux";

import ContentHeading from "./general/ContentHeading";
import MediaList from "./mediaList/MediaList";

function Bookmarks() {
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

// 1241982;
// 113779;
// 112470;
// 247885;
// 249010;
// 957119;
// 248890;
