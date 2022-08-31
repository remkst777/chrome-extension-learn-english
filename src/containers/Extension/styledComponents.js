import styled from 'styled-components';

const color = '#e8e9eb';

export const Navigation = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid ${color};
  box-sizing: border-box;

  & button {
    flex: 1;
    background: #ffffff;
    border: none;
    cursor: pointer;
    padding: 8px;
    height: 40px;

    &:not(:last-child) {
      border-right: 1px solid ${color};
    }

    &[data-is-active='true'] {
      background: ${color};
    }

    &:hover {
      background: ${color};
    }
  }
`;
