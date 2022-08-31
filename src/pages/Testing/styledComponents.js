import styled from 'styled-components';

export const Wrapper = styled.div`
  p {
    font-size: 15px;
    cursor: pointer;

    &[data-hidden-index='1'] span:first-child,
    &[data-hidden-index='2'] span:last-child {
      color: transparent;
      border-bottom: 1px solid #000000;
    }

    span {
      padding: 5px;
      margin: 0 5px;
      display: inline-block;
    }
  }
`;
