import { $authHost, $host } from "./index";
export const createVisit = async (path) => {
  const { data } = await $authHost.post("/history/create", { type: path });
  return data;
};
