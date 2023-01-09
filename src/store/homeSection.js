import { get, set, del } from "idb-keyval";

export const getHomeData = async () => {
  try {
    return await get("homedata");
  } catch (err) {
    console.log(err);
  }
};

export const setHomeData = async (data) => {
  try {
    const now = new Date();
    const created_at = new Date();
    const expired_at = now.setHours(now.getHours() + 1);
    set("homedata", { ...data, created_at, expired_at });
  } catch (err) {
    console.log(err);
  }
};

export const deleteHomeData = async () => {
  try {
    await del("homedata");
  } catch (err) {
    console.log(err);
  }
};
