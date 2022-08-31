import React from 'react';
import { render } from 'react-dom';

render(<div>Options</div>, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
