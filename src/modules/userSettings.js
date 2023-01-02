const existingData = localStorage.getItem("user_settings");
const defaultSettings = {
  theme: "dark",
  NSFW: false,
};
if (!existingData)
  localStorage.setItem("user_settings", JSON.stringify(defaultSettings));

const getSettings = () => {
  return JSON.parse(existingData);
};

const resetSettings = () => {
  localStorage.setItem("user_settings", JSON.stringify(defaultSettings));
  return localStorage.getItem("user_settings");
};

const setSettings = (newSettings) => {
  localStorage.setItem("user_settings", JSON.stringify(newSettings));
  return localStorage.getItem("user_settings");
};

export { getSettings, setSettings, resetSettings };
