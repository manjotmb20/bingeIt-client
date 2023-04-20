import privateClient from "../private.client";
import publicClient from "../public.client";

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) => `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, id }) => `${mediaType}/movie/${id}`,
  search: ({ mediaType, query, page }) => `${mediaType}/search?query=${query}&page=${page}`,
  reviews: ({ mediaType, id }) => `${mediaType}/${id}/reviews`,
    recommendations: ({ mediaType, id }) => `${mediaType}/${id}/recommendations`,
    credits: ({ mediaType, id }) => `${mediaType}/${id}/credits`,
    videos: ({ mediaType, id }) => `${mediaType}/${id}/videos`
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );

      return { response };
    } catch (err) { return { err }; }
  },
  getDetail: async ({ mediaType, id }) => {
    try {


      console.log(mediaEndpoints.detail({ mediaType, id }));
      const response = await publicClient.get(
        mediaEndpoints.detail({ mediaType, id })
      );
      console.log("response11111_cameafter: ", response);

      return { response };
    } catch (err) { return { err }; }
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      );

      return { response };
    } catch (err) { return { err }; }
  },
    getReviews: async ({ mediaType, id }) => {
    try {

            console.log("here11111111");
          console.log(mediaEndpoints.reviews({ mediaType, id }));

      const response = await publicClient.get(
        mediaEndpoints.reviews({ mediaType, id })
      );

      console.log("response12: ", response);

      return { response };
    } catch (err) { return { err }; }
    },
    getRecommendations: async ({ mediaType, id }) => {
    try {

            console.log("here11111110");
          console.log(mediaEndpoints.recommendations({ mediaType, id }));

      const response = await publicClient.get(
        mediaEndpoints.recommendations({ mediaType, id })
      );

      console.log("response13: ", response);

      return { response };
    } catch (err) { return { err }; }
    },
    getCredits: async ({ mediaType, id }) => {
    try {

            console.log("here11111110");
          console.log(mediaEndpoints.credits({ mediaType, id }));

      const response = await publicClient.get(
        mediaEndpoints.credits({ mediaType, id })
      );

      console.log("response14: ", response);

      return { response };
    } catch (err) { return { err }; }
    },
    getVideos: async ({ mediaType, id }) => {
    try {

            console.log("here11111110");
          console.log(mediaEndpoints.videos({ mediaType, id }));

      const response = await publicClient.get(
        mediaEndpoints.videos({ mediaType, id })
      );

      console.log("response15: ", response);

      return { response };
    } catch (err) { return { err }; }
    }
};

export default mediaApi;