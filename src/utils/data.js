import _ from 'lodash';

import { DATA_KEY } from '../constants/storage';
import { initialData } from '../constants/data';

export const getStoredData = async () => {
  const data = await chrome.storage.local.get([DATA_KEY]);
  return data[DATA_KEY] || initialData;
};

export const saveWord = async (w1 = '', w2 = '', tags = [], key) => {
  const data = await getStoredData();

  chrome.storage.local.set({
    [DATA_KEY]: {
      ...data,
      words: {
        ...data.words,
        [key || Date.now()]: [w1, w2, tags, []],
      },
    },
  });
};

export const saveData = async (data) =>
  chrome.storage.local.set({ [DATA_KEY]: data });

export const saveTag = async (name) => {
  const data = await getStoredData();
  const tagsSize = _.size(data.tags);

  chrome.storage.local.set({
    [DATA_KEY]: {
      ...data,
      tags: {
        ...data.tags,
        [name]: tagsSize + 1,
      },
    },
  });
};

export const deleteWord = async (key) => {
  const data = await getStoredData();

  chrome.storage.local.set({
    [DATA_KEY]: {
      ...data,
      words: _.omit(data.words, key),
    },
  });
};
