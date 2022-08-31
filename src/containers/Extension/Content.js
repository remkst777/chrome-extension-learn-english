import React, { memo } from 'react';

import Vocabulary from '../Vocabulary';
import Tags from '../Tags';
import Settings from '../Settings';

import { NavigationType } from './constants';

const Content = ({ activeTab, setActiveTab }) => {
  switch (activeTab) {
    case NavigationType.VOCABULARY:
      return <Vocabulary />;

    case NavigationType.TAGS:
      return <Tags />;

    case NavigationType.SETTINGS:
      return <Settings setActiveTab={setActiveTab} />;

    default:
      return null;
  }
};

export default memo(Content);
