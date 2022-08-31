import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 10px;
  height: 300px;
  overflow: auto;

  button {
    padding: 0px 5px;
    cursor: pointer;
    background: none;

    &:hover {
      color: rgb(0, 123, 255);
    }
  }

  .top-hint {
    margin-bottom: 2px;
  }

  input {
    margin: 0;
  }

  label {
    margin-left: 5px;
  }

  form > div {
    margin-bottom: 10px;
  }
`;
