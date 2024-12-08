import Applayout from "../components/general/Applayout";
import SearchBar from "../components/general/SearchBar";
import TrendingMedia from "../components/home/TrendingMedia";
import RecommendedMedia from "../components/home/RecommendedMedia";
import { useSelector } from "react-redux";
import SearchResults from "../components/general/SearchResults";

function HomePage() {
  const { searchText } = useSelector((state) => state.searchText);

  return (
    <div className="">
      <Applayout>
        <div className="">
          <SearchBar />
          {searchText && <SearchResults type={"all"} />}
          {!searchText && (
            <>
              <TrendingMedia />
              <RecommendedMedia />
            </>
          )}
        </div>
      </Applayout>
    </div>
  );
}

export default HomePage;
