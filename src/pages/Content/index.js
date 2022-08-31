import React from 'react';
import { nanoid } from 'nanoid';
import { render } from 'react-dom';

import Content from './Content';

const div = document.createElement('div');
const popupId = nanoid();

div.id = popupId;
document.body.insertAdjacentHTML('afterEnd', div.outerHTML);

render(<Content />, window.document.getElementById(popupId));

if (module.hot) module.hot.accept();
