import React from 'react';
import { render } from 'react-dom';

import Testing from './Testing';

render(<Testing />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
