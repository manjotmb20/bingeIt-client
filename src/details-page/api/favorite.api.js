import publicClient from "../public.client";
import privateClient from "../private.client";

const favoriteEndpoints = {
  list: "user/favorites",
  add: "user/favorites",
  userfavorites: ({ userId }) => `user/favorites/${userId}`,
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`
};

const favoriteApi = {

  getFavoriteList: async ({ userId }) => {
    try {
       console.log("in favoriteApi.getFavoriteList");
       console.log("in favoriteApi.getFavoriteList: ", favoriteEndpoints.userfavorites({userId}));
      const response2 = await publicClient.get(favoriteEndpoints.userfavorites({userId}));
      console.log("in favoriteApi.getFavoriteList response: ", response2);

      return { response2 };
    } catch (err) { return { err }; }

  },
  getList: async () => {
    try {
       console.log("in favoriteApi.getList");
       console.log("in favoriteApi.getList: ", favoriteEndpoints.list);
      const response = await publicClient.get(favoriteEndpoints.list);

      return { response };
    } catch (err) { return { err }; }
  },
  add: async ({
    userId,
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
          userId,
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
    console.log("in favoriteApi.remove");
    try {
        console.log("in favoriteApi.remove: ", favoriteEndpoints.remove({ favoriteId }));

      const response = await privateClient.delete(favoriteEndpoints.remove({ favoriteId }));
      console.log("in favoriteApi.remove response: ", response.statusText);

      return { response };
    } catch (err) { return { err }; }
  }
};

export default favoriteApi;