import { nanoid } from 'nanoid';
import { SETTINGS_KEY } from '../../constants/storage';
import { getSettingsByParam } from '../../utils/settings';

let interval;

const notificationId = nanoid();

const showNotification = () => {
  console.log('show notification');
  chrome.notifications.create(notificationId, {
    iconUrl: 'icon-34.png',
    message: 'Time for test',
    title: 'Friendly reminder',
    type: 'basic',
  });
};

const setNotification = async (time) => {
  const initialTime = (await getSettingsByParam('testingInterval')) || 0;
  const updatedTime = +(time || initialTime);

  if (!updatedTime) {
    return;
  }

  interval = setInterval(showNotification, updatedTime * 1000);
};

setNotification();

chrome.storage.onChanged.addListener((res) => {
  const { oldValue, newValue } = res[SETTINGS_KEY];

  if (oldValue?.testingInterval !== newValue?.testingInterval) {
    const time = +newValue.testingInterval;

    console.log('New interval noticed');

    clearInterval(interval);
    setNotification(time);
  }
});

chrome.notifications.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'testing.html' });
});
