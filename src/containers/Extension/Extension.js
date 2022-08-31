import React, { useState, useCallback } from 'react';

import { NavigationType } from './constants';
import Navigation from './Navigation';
import Content from './Content';

import '../../styles/reset.css';

const Extension = () => {
  const [activeTab, setActiveTab] = useState(NavigationType.VOCABULARY);

  const onChangeTab = useCallback((e) => {
    setActiveTab(e.target.dataset.tab);
  }, []);

  return (
    <div>
      <Navigation activeTab={activeTab} onChangeTab={onChangeTab} />
      <Content activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Extension;
