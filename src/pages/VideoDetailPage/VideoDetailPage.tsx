import React from "react";
import { useParams } from "react-router-dom";
import Styled from "./VideoDetailPage.module.scss";

const VideoDetailPage = () => {
  const { videoId } = useParams();
  return (
    <p>{videoId}</p>
  );
};

export default VideoDetailPage;
