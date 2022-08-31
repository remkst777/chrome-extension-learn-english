import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';

import { getSettingsByParam } from '../../utils/settings';
import { getStoredData } from '../../utils/data';
import { Wrapper } from './styledComponents';

const Testing = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    (async () => {
      const testingWordsNumber = await getSettingsByParam('testingWordsNumber');
      const testingRandom = await getSettingsByParam('testingRandom');
      const data = await getStoredData();

      const formatItem = (i) => ({
        ...i,
        hiddenIndex: _.random(1, 2),
      });

      if (testingRandom) {
        return setWords(
          _.sampleSize(Object.values(data.words), testingWordsNumber).map(
            formatItem
          )
        );
      }

      setWords(
        Object.values(data.words).slice(-testingWordsNumber).map(formatItem)
      );
    })();
  }, []);

  const onReveal = useCallback((e) => {
    e.currentTarget.removeAttribute('data-hidden-index');
  }, []);

  return (
    <Wrapper>
      <h1>Testing</h1>

      <div>
        {words.map((word, index) => (
          <p
            key={index}
            onClick={onReveal}
            data-hidden-index={word.hiddenIndex}
          >
            <span>{word[0]}</span>
            {` — `}
            <span>{word[1]}</span>
          </p>
        ))}
      </div>
    </Wrapper>
  );
};

export default Testing;
