import { $authHost, $host } from "./index";
export const fetchUserForums = async () => {
  const { data } = await $host.get("/forum");
  return data;
};

export const createForum = async (forum) => {
  const { data } = await $authHost.post(`/forum/create`, forum);
  return data;
};
export const getForum = async (id) => {
  const { data } = await $host.get(`forum/${id}`);
  return data;
};
export const deleteForumApi = async (id) => {
  const { data } = await $authHost.delete(`/forum/delete/${id}`);
  return data;
};
export const addTopicApi = async (forumId, topic) => {
  const { data } = await $authHost.post(`/topics/${forumId}/create`, topic);
  return data;
};
export const fetchForumTopics = async (forumId) => {
  const { data } = await $authHost.get(`/topics/${forumId}`);
  return data;
};
export const fetchTopicApi = async (topicId) => {
  const { data } = await $authHost.get(`/topics/${topicId}`);
  return data;
};
export const fetchTopicComments = async (topicId) => {
  const { data } = await $authHost.get(`topics_comment/${topicId}/comments`);
  return data;
};
export const createTopicComment = async (topicId, comment) => {
  const { data } = await $authHost.post(
    `/topics_comment/${topicId}/comments/create`,
    comment,
    { headers: "Content-Type: multipart/form-data" },
  );
  return data;
};
