import publicClient from "../public.client";
import privateClient from "../private.client";

const favoriteEndpoints = {
  list: "user/favorites",
  add: "user/favorites",
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`
};

const favoriteApi = {
  getList: async () => {
    try {
       console.log("in favoriteApi.getList");
       console.log("in favoriteApi.getList: ", favoriteEndpoints.list);
      const response = await publicClient.get(favoriteEndpoints.list);

      return { response };
    } catch (err) { return { err }; }
  },
  add: async ({
    mediaId,
    mediaType,
    mediaTitle,
    mediaPoster,
    mediaRate
  }) => {
    try {

        console.log("in favoriteApi.add");

        console.log("in favoriteApi.add: ", favoriteEndpoints.add,
                            {
                              mediaId,
                              mediaType,
                              mediaTitle,
                              mediaPoster,
                              mediaRate
                            });
      const response = await privateClient.post(
        favoriteEndpoints.add,
        {
          mediaId,
          mediaType,
          mediaTitle,
          mediaPoster,
          mediaRate
        }
      );

      return { response };
    } catch (err) { return { err }; }
  },
  remove: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(favoriteEndpoints.remove({ favoriteId }));

      return { response };
    } catch (err) { return { err }; }
  }
};

export default favoriteApi;