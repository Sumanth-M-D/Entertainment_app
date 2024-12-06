import ContentHeading from "./ContentHeading";
import MediaList from "../mediaList/MediaList";
import { useGetSearchMediaQuery } from "../../features/mediaApi";
import { useSelector } from "react-redux";

function SearchResults({ type }) {
  const { searchText } = useSelector((state) => state.searchText);

  const {
    data: searchResults = {},
    error: searchError,
    isLoading: searchLoading,
  } = useGetSearchMediaQuery({ searchText, type });

  return (
    <div className="mediaSectionContainer">
      <ContentHeading
        title={`Found ${searchResults?.length || 0} results for '${searchText}'`}
      />
      <MediaList
        mediaList={searchResults}
        isLoading={searchLoading}
        error={searchError}
      />
    </div>
  );
}

export default SearchResults;
