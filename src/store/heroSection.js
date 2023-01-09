import { del, get, set } from "idb-keyval";

export const getHeroSection = async () => {
  try {
    const data = await get("herosection");
    if (!data) set("herosection", {});

    return await get("herosection");
  } catch (err) {
    console.log(err);
  }
};

export const setHeroSection = async (data = {}) => {
  try {
    const now = new Date();
    const created_at = new Date();
    const expired_at = now.setHours(now.getHours() + 1);
    await set("herosection", { ...data, created_at, expired_at });
  } catch (err) {
    console.log(err);
  }
};

export const deleteHeroSection = async () => {
  try {
    del("herosection");
  } catch (err) {
    console.log(err);
  }
};
