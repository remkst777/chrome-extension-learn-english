import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import AddButton from '../../components/AddButton';

import { getStoredData, saveTag } from '../../utils/data';
import { Tag, AddTagPanel, AddTagButton } from './styledComponents';

const ModeType = {
  REGULAR: 'Regular',
  ADD: 'Add',
};

const Tags = () => {
  const ref = useRef();

  const [mode, setMode] = useState(ModeType.REGULAR);
  const [data, setData] = useState({});

  useEffect(() => {
    getStoredData().then(setData);
  }, []);

  const onChangeMode = useCallback((e) => {
    const { mode } = e.target.dataset;
    setMode((prev) => (prev === mode ? ModeType.REGULAR : mode));
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (ref.current.value) {
      await saveTag(ref.current.value);
      await getStoredData().then(setData);
      await setMode(ModeType.REGULAR);

      ref.current.value = '';
    }
  }, []);

  return (
    <div className="relative">
      {Object.keys(data.tags || {}).map((i) => (
        <Tag>{i}</Tag>
      ))}

      {mode === ModeType.ADD && (
        <AddTagPanel onSubmit={onSubmit} as="form">
          <div className="relative">
            <input autoFocus type="text" ref={ref} placeholder="Type here..." />
            <AddTagButton type="submit">✔️</AddTagButton>
          </div>
        </AddTagPanel>
      )}

      <AddButton data-mode={ModeType.ADD} onClick={onChangeMode}>
        A
      </AddButton>
    </div>
  );
};

export default memo(Tags);
