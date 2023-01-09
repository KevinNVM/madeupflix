import { get, set, del } from "idb-keyval";

export const getTopAiring = async () => {
  try {
    const data = get("topairing");
    if (!data) set("topairing", {});
    return await get("topairing");
  } catch (err) {
    console.log(err);
  }
};

export const setTopAiring = async (newData) => {
  try {
    const created_at = new Date();
    const expired_at = created_at.setHours(created_at.getHours() + 4);
    await set("topairing", { ...data, created_at, expired_at });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTopAiring = async () => {
  try {
    del("topairing");
    return true;
  } catch (err) {
    console.log(err);
  }
};
