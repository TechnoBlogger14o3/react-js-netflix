import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { YOUTUBE_SOURCE_LINK } from "../utils/constants";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);


  return (
    <div className=" w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          YOUTUBE_SOURCE_LINK +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
      
    </div>
  );
};
export default VideoBackground;