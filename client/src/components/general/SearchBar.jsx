import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setInputText } from "../../features/searchTextSlice";
import { useCallback, useEffect } from "react";
import debounce from "../../utils/debounce";

function SearchBar({ placeholder = "Search for movies or TV shows" }) {
  const { inputText } = useSelector((state) => state.searchText);
  const dispatch = useDispatch();

  const debouncedSetSearchText = useCallback(
    debounce(function (text) {
      dispatch(setSearchText(text));
    }, 800),
    [],
  );

  useEffect(() => {
    debouncedSetSearchText(inputText);
  }, [inputText, debouncedSetSearchText]);

  function handleChange(e) {
    dispatch(setInputText(e.target.value));
  }

  return (
    <div className="flex gap-5 items-center text-lg caret-primary  sectionBottomMargin">
      <label>
        <FaSearch />
      </label>
      <input
        id="search"
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder={placeholder}
        // autoComplete="off" // Disable autocomplete
        className="w-full outline-none bg-black border-b-2  border-tertiary p-2 placeholder-zinc-500 placeholder:text-base"
      />
    </div>
  );
}

export default SearchBar;
