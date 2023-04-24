import publicClient from "../public.client";

const personEndpoints = {
  detail: ({ id }) => `person/${id}`,
  medias: ({ id }) => `person/${id}/medias`,
  userDetail: ({ id }) => `api/users/${id}`
};

const personApi = {
  detail: async ({ id }) => {
    try {
      const response = await publicClient.get(personEndpoints.detail({ id }));

      return { response };
    } catch (err) { return { err }; }
  },
  medias: async ({ id }) => {
    try {
      const response = await publicClient.get(personEndpoints.medias({ id }));

      return { response };
    } catch (err) { return { err }; }
  },
    userDetail: async ({ id }) => {
    try {
      const response = await publicClient.get(personEndpoints.userDetail({ id }));

      return { response };
    } catch (err) { return { err }; }
    }
};

export default personApi;