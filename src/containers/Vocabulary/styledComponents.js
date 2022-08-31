import styled from 'styled-components';
import AddButton from '../../components/AddButton';
import Panel from '../../components/Panel';

export const Wrapper = styled.ul`
  height: 300px;
  overflow: auto;
  position: relative;

  li {
    display: flex;
    height: 40px;
    position: relative;

    &:nth-child(even) {
      background: rgba(0, 123, 255, 0.1);
    }

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      font-size: 11px;
      padding: 5px;
      word-break: break-word;

      span {
        cursor: pointer;

        &:hover {
          color: rgb(0, 123, 255);
        }
      }
    }

    button {
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 123, 255, 0.2);
      width: 14px;
      height: 14px;
      font-size: 10px;
      cursor: pointer;
      padding-bottom: 2px;
      border-bottom-right-radius: 50%;
    }
  }
`;

export const FilterButton = styled(AddButton)`
  right: 40px;
  ${({ isSet }) => (isSet ? { background: 'rgba(0,123,255,0.1)' } : '')}
`;

export const IFrameWrapper = styled(Panel)`
  left: -15%;
  bottom: -10%;
  width: 130%;
  transform: scale(0.8);

  iframe {
    width: 100%;
    height: 250px;
  }
`;

export const Filter = styled(Panel)`
  display: flex;
  align-items: self-start;

  > * {
    width: 50%;

    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  select {
    width: 100%;
    padding: 2px 4px;
    height: 50px;
    text-transform: uppercase;
  }

  .right select {
    height: auto;
  }

  input,
  select,
  button {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 5px;
    font-size: 10px;
  }

  button[data-reset='true'] {
    padding: 4px;
    cursor: pointer;
    background: #e8e9eb;
    color: #2330f2;
    text-transform: uppercase;
  }
`;

export const AddWordPanel = styled(Panel)`
  input,
  select {
    width: 100%;
    margin-bottom: 5px;
  }

  input {
    font-size: 10px;
    height: 20px;
  }

  select {
    text-transform: uppercase;
    font-size: 10px;
    width: 50%;
  }

  button {
    position: absolute;
    top: 4px;
    right: 4px;
    background: #ffffff;
    cursor: pointer;
  }
`;
