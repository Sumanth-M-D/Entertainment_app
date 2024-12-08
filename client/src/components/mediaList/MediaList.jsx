import MediaCard from "./MediaCard";
import Loader from "../general/Loader";
import Error from "../general/Error";
import { useSelector } from "react-redux";

function MediaList({ mediaList, isLoading, error, listType = "general" }) {
  const { bookmarks } = useSelector((state) => state.bookmark);

  const bookmarkedMediaIds = new Set(bookmarks.map((media) => media.id));

  if (isLoading)
    return (
      <div className="h-56">
        <Loader />
      </div>
    );

  if (error) return <Error error={error} />;

  return (
    <section
      className={`${listType === "trending" ? "flex gap-5 overflow-x-scroll rounded-lg" : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-10 grid-flow-row"} `}
    >
      {mediaList.map((media) => (
        <MediaCard
          key={media.id}
          mediaData={media}
          isBookmarked={bookmarkedMediaIds.has(media.id)}
          cardType={listType}
        />
      ))}
    </section>
  );
}

export default MediaList;
