import MediaCard from "./MediaCard";
import Loader from "../general/Loader";
import Error from "../general/Error";
import { useSelector } from "react-redux";

// const demoBookamrked = [
//   {
//     id: 1241982,
//     type: "movie",
//     title: "Moana 2",
//     releaseDate: "2024-11-27",
//     backdropPath: "/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg",
//   },
//   {
//     id: 211039,
//     type: "tv",
//     title: "Senna",
//     releaseDate: "2024-11-29",
//     backdropPath: "/pP9Or3dN8k0go1G2OSldcwBpUFO.jpg",
//   },
//   {
//     id: 1365044,
//     type: "movie",
//     title: "The Snow Sister",
//     releaseDate: "2024-11-28",
//     backdropPath: "/pjHpobTyiHPO5OTbfi9DHyynKHp.jpg",
//   },
//   {
//     id: 30984,
//     type: "tv",
//     title: "Bleach",
//     releaseDate: "2004-10-05",
//     backdropPath: "/o0NsbcIvsllg6CJX0FBFY8wWbsn.jpg",
//   },
// ];

function MediaList({ mediaList, isLoading, error, listType = "general" }) {
  const { bookmarks } = useSelector((state) => state.bookmark);

  const bookmarkedMediaIds = new Set(bookmarks.map((media) => media.id)); //TODO: Fetch bookmarked media from API

  if (isLoading)
    return (
      <div className="h-56">
        <Loader />
      </div>
    );

  if (error) return <Error error={error} />;

  return (
    <section
      className={`${listType === "trending" ? "flex gap-5 overflow-x-scroll" : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-10 grid-flow-row"} `}
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
