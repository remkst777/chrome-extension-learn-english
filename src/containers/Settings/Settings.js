import React, { memo, useCallback, useRef, useEffect } from 'react';

import { SETTINGS_KEY } from '../../constants/storage';
import { getStoredData, saveData } from '../../utils/data';
import { getText, saveText } from '../../utils/ipfs';
import { NavigationType } from '../Extension/constants';

import { Wrapper } from './styledComponents';

const Settings = ({ setActiveTab }) => {
  const selectionRef = useRef();
  const dblClickRef = useRef();
  const testingIntervalRef = useRef();
  const testingWordsNumberRef = useRef();
  const testingRandomRef = useRef();

  const importByHashRef = useRef();
  const getHashRef = useRef();

  useEffect(() => {
    (async () => {
      const res = await chrome.storage.local.get([SETTINGS_KEY]);
      const data = res[SETTINGS_KEY] || {};

      selectionRef.current.checked = data.selection || false;
      dblClickRef.current.checked = data.dblClick || false;
      testingIntervalRef.current.value = data.testingInterval || 0;
      testingWordsNumberRef.current.value = data.testingWordsNumber || 0;
      testingRandomRef.current.checked = data.testingRandom || false;
    })();
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      chrome.storage.local.set({
        [SETTINGS_KEY]: {
          selection: selectionRef.current.checked,
          dblClick: dblClickRef.current.checked,
          testingInterval: testingIntervalRef.current.value,
          testingWordsNumber: testingWordsNumberRef.current.value,
          testingRandom: testingRandomRef.current.checked,
        },
      });

      setActiveTab(NavigationType.VOCABULARY);
    },
    [setActiveTab]
  );

  const onImportByHash = useCallback(async () => {
    const data = await getText(importByHashRef.current.value);

    saveData(JSON.parse(data));

    importByHashRef.current.value = '';
    setActiveTab(NavigationType.VOCABULARY);
  }, [setActiveTab]);

  const onGetHash = useCallback(async () => {
    const data = await getStoredData();
    const hash = await saveText(JSON.stringify(data));

    getHashRef.current.value = hash;
  }, []);

  const onReset = useCallback(() => {
    chrome.storage.local.clear();
    setActiveTab(NavigationType.VOCABULARY);
  }, [setActiveTab]);

  const onTestYourself = useCallback(() => {
    chrome.tabs.create({ url: 'testing.html' });
  }, []);

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <div>
          <input id="selection" type="checkbox" ref={selectionRef} />
          <label for="selection">Selection</label>
        </div>

        <div>
          <input id="dbl-click" type="checkbox" ref={dblClickRef} />
          <label for="dbl-click">Double click</label>
        </div>

        <div>
          <input
            id="testing-last-words"
            type="checkbox"
            ref={testingRandomRef}
          />
          <label for="testing-last-words">Testing random|last words</label>
        </div>

        <div>
          <div className="top-hint">Testing interval (min)</div>
          <div>
            <input type="number" ref={testingIntervalRef} min="0" />
          </div>
        </div>

        <div>
          <div className="top-hint">Testing words number</div>
          <div>
            <input type="number" ref={testingWordsNumberRef} min="0" />
          </div>
        </div>

        <div>
          <button type="submit">Save</button>
        </div>

        <div>
          <div className="top-hint">Import data by hash</div>
          <div>
            <input type="text" ref={importByHashRef} />
            <button type="button" onClick={onImportByHash}>
              Import
            </button>
          </div>
        </div>

        <div>
          <div className="top-hint">Get actual hash</div>
          <div>
            <input type="text" readOnly ref={getHashRef} />
            <button type="button" onClick={onGetHash}>
              Get hash
            </button>
          </div>
        </div>

        <div>
          <button type="button" onClick={onReset}>
            Reset data
          </button>
        </div>

        <div>
          <button type="button" onClick={onTestYourself}>
            Test yourself
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default memo(Settings);
