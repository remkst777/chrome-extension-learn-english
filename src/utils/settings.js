import { SETTINGS_KEY } from '../constants/storage';

export const getSettingsByParam = async (param) => {
  const res = await chrome.storage.local.get([SETTINGS_KEY]);
  const data = res[SETTINGS_KEY] || {};
  return data[param];
};
