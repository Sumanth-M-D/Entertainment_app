import { useDispatch, useSelector } from "react-redux";
import {
  closeVideoModal,
  resetVideoState,
} from "../../features/videoModalSlice";
import YouTube from "react-youtube";
import { IoMdClose } from "react-icons/io";
import { useGetMediaUrlQuery } from "../../features/mediaApi";
import Loader from "./Loader";
import { toast } from "react-toastify";

function VideoModal() {
  const { isOpen, mediaId, mediaType } = useSelector(
    (state) => state.videoModal,
  );
  const dispatch = useDispatch();
  const {
    data: videoKey,
    error,
    isLoading,
  } = useGetMediaUrlQuery({ id: mediaId, type: mediaType });

  const showYoutube = videoKey && !isLoading && !error;

  function handleCloseModal(e) {
    e.stopPropagation();
    dispatch(closeVideoModal());
  }

  const videoOptions = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  if (error) {
    dispatch(resetVideoState());
    return toast.error(error.message);
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0">
          <div
            onClick={handleCloseModal}
            className="absolute inset-0 bg-[#000] bg-opacity-85 cursor-pointer z-30"
          ></div>

          <div className="relative aspect-video mx-auto mt-20 sm:mt-40 max-w-[640px] max-h-[500px] z-30">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-2xl font-semibold hover:text-red-500 transition-all duration-300 bg-black rounded-full p-2"
            >
              <IoMdClose />
            </button>
            {isLoading && <Loader />}
            {showYoutube && (
              <YouTube
                videoId={videoKey}
                className="w-full h-full"
                opts={videoOptions}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default VideoModal;
