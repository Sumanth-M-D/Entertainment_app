import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import {
  useAddUserBookmarkMutation,
  useDeleteUserBookmarkMutation,
} from "../../features/mediaApi";
import { useDispatch } from "react-redux";
import { setBookmarks } from "../../features/bookmarkSlice";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";

function Bookmark({ isBookmarked, id, mediaType }) {
  const [addUserBookmark, { isLoading: isAddingBookmark }] =
    useAddUserBookmarkMutation();

  const [deleteUserBookmark, { isLoading: isDeletingBookmark }] =
    useDeleteUserBookmarkMutation();

  const isUpdatingBookmark = isAddingBookmark || isDeletingBookmark;

  const dispatch = useDispatch();

  async function handleClick() {
    try {
      if (isBookmarked) {
        const updatedBookmarks = await deleteUserBookmark({ id }).unwrap();
        dispatch(setBookmarks(updatedBookmarks));
      }

      if (!isBookmarked) {
        const updatedBookmarks = await addUserBookmark({
          id,
          type: mediaType,
        }).unwrap();

        dispatch(setBookmarks(updatedBookmarks));
      }
    } catch (error) {
      toast.error(error.message || "Error updating the bookmarks");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="hover:text-md hover:scale-125 transition-all duration-200"
    >
      <div className="text-xs p-2 bg-secondary bg-opacity-60 rounded-full ">
        {isUpdatingBookmark && (
          <AiOutlineLoading className="animate-spin-slow" />
        )}
        {!isUpdatingBookmark &&
          (isBookmarked ? <FaBookmark /> : <FaRegBookmark />)}
      </div>
    </button>
  );
}

export default Bookmark;
<FaBookmark />;
<FaRegBookmark />;
