import _ from 'lodash';
import React, { useEffect, useState, useCallback, useRef } from 'react';

import { saveWord } from '../../utils/data';
import { getSettingsByParam } from '../../utils/settings';
import { Wrapper, Iframe, Form } from './styledComponents';

const popupHeight = 400;
const popupWidth = 350;

const Content = () => {
  const refInputTo = useRef();
  const refInputFrom = useRef();

  const [isOpened, setIsOpened] = useState(false);
  const [capturedString, setCapturedString] = useState('');
  const [capturedCoords, setCapturedCoords] = useState([0, 0]);

  const clarifiedClientX = Math.min(
    window.innerWidth - popupWidth,
    capturedCoords[0]
  );

  const clarifiedClientY = Math.min(
    window.innerHeight - popupHeight,
    capturedCoords[1]
  );

  const onOpenPopup = useCallback((e) => {
    const tagName = e.target.tagName?.toLowerCase?.();

    if (['a', 'input', 'textarea'].includes(tagName)) {
      return;
    }

    const selection = window.getSelection();
    const capturedString = _.isObject(selection)
      ? selection.toString()
      : selection;

    if (capturedString) {
      setIsOpened(true);
      setCapturedCoords([e.clientX, e.clientY]);
      setCapturedString(capturedString);

      refInputTo.current.value = capturedString;
    }
  }, []);

  const popupHandler = useCallback(
    async (e) => {
      const selection = await getSettingsByParam('selection');
      const dblClick = await getSettingsByParam('dblClick');

      const isForbidden = !dblClick || (!selection && e.type === 'mouseup');

      setIsOpened((prev) => (prev ? false : prev));

      if (isForbidden) {
        return;
      }

      onOpenPopup(e);
    },
    [onOpenPopup]
  );

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    const w1 = refInputTo.current.value?.trim();
    const w2 = refInputFrom.current.value?.trim();

    const isW1Eng = !!w1.match(/[a-z]+/gim);

    if (!w1 || !w2) {
      return;
    }

    saveWord(isW1Eng ? w1 : w2, isW1Eng ? w2 : w1).then(() =>
      setIsOpened(false)
    );

    refInputTo.current.value = '';
    refInputFrom.current.value = '';
  }, []);

  useEffect(() => {
    window.addEventListener('dblclick', popupHandler);
    return () => {
      window.removeEventListener('dblclick', popupHandler);
    };
  }, [popupHandler]);

  useEffect(() => {
    document.body.addEventListener('mouseup', popupHandler);
    return () => {
      document.removeEventListener('mouseup', popupHandler);
    };
  }, [popupHandler]);

  return (
    <Wrapper
      isOpened={isOpened}
      clientX={clarifiedClientX}
      clientY={clarifiedClientY}
    >
      <div className="relative">
        <Iframe
          title="reverso"
          src={`https://context.reverso.net/translation/russian-english/${capturedString}`}
        />

        <Form onSubmit={onSubmit}>
          <div>
            <input type="text" ref={refInputTo} placeholder="Type here..." />
          </div>

          <div className="relative">
            <input type="text" placeholder="Type here..." ref={refInputFrom} />
            <button type="submit">✔️</button>
          </div>
        </Form>
      </div>
    </Wrapper>
  );
};

export default Content;
