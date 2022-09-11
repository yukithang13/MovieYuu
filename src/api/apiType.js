import apiConfig from "./apiConfig";
import axiosClient from "./axiosClient";
//set type
export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
};
//call api axios TMDB
const apiType = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },
  // /movie/{movie_id}
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },
  // /credits
  credits: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  // /similar
  similar: (cate, id) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
  tvSeasons: (id, season) => {
    const url =
      "tv/" + id + "/season/" + season + "?api_key=" + apiConfig.API_KEY;
    return axiosClient.get(url, { params: {} });
  },
};

export default apiType;
