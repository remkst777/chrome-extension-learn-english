import _ from 'lodash';
import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import { useRef } from 'react';
import AddButton from '../../components/AddButton';
import { getStoredData, saveWord, deleteWord } from '../../utils/data';
import {
  Wrapper,
  FilterButton,
  Filter,
  AddWordPanel,
  IFrameWrapper,
} from './styledComponents';

const ModeType = {
  REGULAR: 'Regular',
  FILTER: 'Filter',
  ADD: 'Add',
  EDIT: 'Edit',
  IFRAME: 'IFrame',
};

const initNumberFilter = 25;
const numberFilterList = [0, initNumberFilter, 50, 100, 200];

const Vocabulary = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const [data, setData] = useState({});
  const [mode, setMode] = useState(ModeType.REGULAR);
  const [searchText, setSearchText] = useState('');
  const [searchTags, setSearchTags] = useState([]);
  const [searchNumber, setSearchNumber] = useState(initNumberFilter);
  const [capturedString, setCapturedString] = useState('');

  const tagsNumber = _.size(data.tags);
  const wordsNumber = _.size(data.words);

  const isFilterSet =
    !!searchText || !!searchTags.length || searchNumber !== initNumberFilter;

  const isAddPanelVisible = [ModeType.ADD, ModeType.EDIT].includes(mode);

  const filteredWords = useMemo(() => {
    const filterTag = (tags) =>
      searchTags.length
        ? tags.some((i) => searchTags.includes(i.toString()))
        : true;

    const filterWords = (i1, i2) =>
      searchText
        ? [i1, i2].some((i) => i.match(new RegExp(searchText, 'gim')))
        : true;

    return Object.keys(data.words || {})
      .map((key) => {
        data.words[key].key = key;
        return data.words[key];
      })
      .filter(([i1, i2, tags]) => filterWords(i1, i2) && filterTag(tags))
      .slice(-searchNumber);
  }, [data.words, searchTags, searchText, searchNumber]);

  const filteredWordsNumber = filteredWords.length;

  useEffect(() => {
    getStoredData().then(setData);
  }, []);

  const onChangeMode = useCallback((e) => {
    const { mode } = e.target.dataset;
    setMode((prev) => (prev === mode ? ModeType.REGULAR : mode));
  }, []);

  const onReset = useCallback(() => {
    setSearchTags([]);
    setSearchText('');
    setSearchNumber(initNumberFilter);
  }, []);

  const onAddWord = useCallback(
    async (e) => {
      e.preventDefault();

      const w1 = ref1.current.value;
      const w2 = ref2.current.value;
      const tags = Array.from(
        ref3.current.selectedOptions,
        ({ value }) => +value
      );

      const key = mode === ModeType.EDIT ? ref1.current.key : undefined;

      if (!w1 || !w2 || !tags.length) {
        return;
      }

      await saveWord(w1, w2, tags, key);
      await getStoredData().then(setData).then(onReset);
      await setMode(ModeType.REGULAR);
    },
    [onReset, mode]
  );

  const onEditWord = useCallback(
    async (e) => {
      const { key } = e.currentTarget.dataset;
      const [w1, w2, tags] = data.words[key];

      await setMode(ModeType.EDIT);

      ref1.current.key = key;
      ref1.current.value = w1;
      ref2.current.value = w2;

      [...ref3.current.options].forEach((option) => {
        option.selected = tags.includes(+option.value);
      });
    },
    [data.words]
  );

  const onDeleteWord = useCallback(async (e) => {
    e.stopPropagation();

    await deleteWord(e.currentTarget.dataset.key);
    await getStoredData().then(setData);
  }, []);

  const onViewWordInfo = useCallback((e) => {
    e.stopPropagation();

    setMode(ModeType.IFRAME);
    setCapturedString(e.currentTarget.innerHTML);
  }, []);

  return (
    <Wrapper>
      {filteredWords.map((i) => (
        <li
          key={i.key}
          data-key={i.key}
          onDoubleClick={onEditWord}
          onClick={onChangeMode}
        >
          <div>
            <span onClick={onViewWordInfo}>{i[0]}</span>
          </div>
          <div>
            <span onClick={onViewWordInfo}>{i[1]}</span>
          </div>

          <button onClick={onDeleteWord} data-key={i.key}>
            x
          </button>
        </li>
      ))}

      {isAddPanelVisible && (
        <AddWordPanel as="form" onSubmit={onAddWord}>
          <div className="relative">
            <input
              tabIndex={1}
              autoFocus
              type="text"
              ref={ref1}
              placeholder="Type here..."
            />
            <button tabIndex={4} type="submit">
              ✔️
            </button>
          </div>

          <input
            tabIndex={2}
            type="text"
            ref={ref2}
            placeholder="Type here..."
          />

          <select tabIndex={3} multiple ref={ref3}>
            {Object.keys(data.tags).map((key) => (
              <option key={key} value={data.tags[key]}>
                {key}
              </option>
            ))}
          </select>
        </AddWordPanel>
      )}

      {mode === ModeType.IFRAME && (
        <IFrameWrapper>
          <iframe
            title="reverso"
            src={`https://context.reverso.net/translation/russian-english/${capturedString}`}
          />
        </IFrameWrapper>
      )}

      {mode === ModeType.FILTER && (
        <Filter tagsNumber={tagsNumber}>
          <div className="left">
            <select
              multiple
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );

                setSearchTags(values);
              }}
              value={searchTags}
            >
              {Object.keys(data.tags).map((key) => (
                <option key={key} value={data.tags[key]}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          <div className="right">
            <input
              autoFocus
              type="text"
              placeholder="Type here..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />

            <select
              onChange={(e) => setSearchNumber(e.target.value)}
              value={searchNumber}
            >
              {numberFilterList.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>

            {isFilterSet && !!tagsNumber && (
              <button data-reset="true" onClick={onReset}>
                reset {filteredWordsNumber}/{wordsNumber}
              </button>
            )}
          </div>
        </Filter>
      )}

      <FilterButton
        data-mode={ModeType.FILTER}
        onClick={onChangeMode}
        isSet={isFilterSet}
      >
        F
      </FilterButton>

      <AddButton data-mode={ModeType.ADD} onClick={onChangeMode}>
        A
      </AddButton>
    </Wrapper>
  );
};

export default memo(Vocabulary);
