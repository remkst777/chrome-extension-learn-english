import React, { memo } from 'react';

import { NavigationType } from './constants';
import { Navigation as Wrapper } from './styledComponents';

const Navigation = ({ onChangeTab, activeTab }) => (
  <Wrapper onClick={onChangeTab}>
    <button
      data-is-active={activeTab === NavigationType.VOCABULARY}
      data-tab={NavigationType.VOCABULARY}
    >
      Vocabulary
    </button>

    <button
      data-is-active={activeTab === NavigationType.TAGS}
      data-tab={NavigationType.TAGS}
    >
      Tags
    </button>

    <button
      data-is-active={activeTab === NavigationType.SETTINGS}
      data-tab={NavigationType.SETTINGS}
    >
      Settings
    </button>
  </Wrapper>
);

export default memo(Navigation);
