import privateClient from "../private.client";

const reviewEndpoints = {
  list: ({mediaId}) => `reviews/${mediaId}`,
  add: "reviews",
  remove: ({ reviewId }) => `reviews/${reviewId}`
};

const reviewApi = {
  add: async ({
    userId,
    author,
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    content
  }) => {
    try {
      const response = await privateClient.post(
        reviewEndpoints.add,
        {
          userId,
          author,
          mediaId,
          mediaType,
          mediaTitle,
          mediaPoster,
          content
        }
      );

      return { response };
    } catch (err) { return { err }; }
  },
  remove: async ({ reviewId }) => {
    try {
      console.log("in reviewApi.remove: ", reviewEndpoints.remove({ reviewId }));
      const response = await privateClient.delete(reviewEndpoints.remove({ reviewId }));

      return { response };
    } catch (err) { return { err }; }
  },
  getList: async ( {mediaId} ) => {
    try {
      console.log("in reviewApi.getList: ", reviewEndpoints.list);
      console.log("in reviewApi.getList: ", reviewEndpoints.list( { mediaId } ));
      const response = await privateClient.get(reviewEndpoints.list( { mediaId } ));




      return { response };
    } catch (err) { return { err }; }
  }
};

export default reviewApi;