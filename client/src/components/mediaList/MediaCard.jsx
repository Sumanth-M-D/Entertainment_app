import { IMAGE_BASE_URL } from "../../config/config";
import { MdLocalMovies } from "react-icons/md";
import { GiTv } from "react-icons/gi";
import Bookmark from "../mediaList/Bookmark";
import PlayButton from "../mediaList/PlayButton";
import { Link } from "react-router-dom";

function MediaCard({ mediaData, isBookmarked, cardType = "general" }) {
  const { id, type: mediaType, title, releaseDate, backdropPath } = mediaData;

  return (
    <div
      className={`${cardType === "trending" ? "w-80 mb-3 flex-none" : ""}  relative`}
    >
      <PosterSection
        backdropPath={backdropPath}
        isBookmarked={isBookmarked}
        id={id}
        mediaType={mediaType}
        cardType={cardType}
      />
      <ContentSection
        title={title}
        releaseDate={releaseDate}
        id={id}
        mediaType={mediaType}
        cardType={cardType}
      />
    </div>
  );
}

function PosterSection({
  backdropPath,
  isBookmarked,
  id,
  mediaType,
  cardType,
}) {
  let imgSrc;
  if (backdropPath) {
    imgSrc = `${IMAGE_BASE_URL}/${backdropPath}`;
  } else {
    imgSrc = "/placeholder.jpg";
    // imgSrc = "https://via.placeholder.com/500x281";
  }

  return (
    <div className="group relative">
      <img src={imgSrc} className="rounded-lg" />
      {/* Hover Overlay */}
      <HoverOverLay />

      {cardType === "trending" && <GradientOverLay />}

      <div className="absolute right-5 top-3">
        <Bookmark isBookmarked={isBookmarked} id={id} mediaType={mediaType} />
      </div>

      <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <PlayButton id={id} type={mediaType} />
      </div>
    </div>
  );
}

function ContentSection({ id, mediaType, title, releaseDate, cardType }) {
  return (
    <div
      className={`${cardType === "trending" ? "absolute bottom-0 px-5 inset-x-0" : "mt-3"} `}
    >
      <Link
        // to={`/${mediaType === "movie" ? "movies" : "tvshows"}/${id}`}
        to={`/mediadetails/${mediaType === "movie" ? "movies" : "tvshows"}/${id}`}
        className=" w-full hover:text-primary hover:font-normal transition-all duration-200"
      >
        <div className="text-sm flex gap-3">
          <p>{releaseDate?.slice(0, 4) || "N/A"}</p>
          <p>
            {mediaType === "movie" ? (
              <span className="flex items-center gap-1">
                <MdLocalMovies />
                <span> Movie</span>
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <GiTv />
                <span> TV show</span>
              </span>
            )}
          </p>
          <p>PG</p>
        </div>
        <h3 className="font-semibold">{title}</h3>
      </Link>
    </div>
  );
}

function HoverOverLay() {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 ease-in-out"></div>
  );
}

function GradientOverLay() {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
  );
}

export default MediaCard;
