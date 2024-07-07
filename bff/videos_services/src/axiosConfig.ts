import axios from "axios";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const axiosInstance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${YOUTUBE_API_KEY}`,
  },
  params: {
    part: "snippet",
    type: "video",
  },
});

export default axiosInstance;
