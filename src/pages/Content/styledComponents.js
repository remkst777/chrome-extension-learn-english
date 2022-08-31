import styled from 'styled-components';
/* eslint import/no-webpack-loader-syntax: off */
import reset from '!!raw-loader!../../styles/reset.css';

export const Wrapper = styled.div`
  position: fixed;
  transform: scale(0.8);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  background-color: #ffffff;
  top: ${({ clientY }) => `${clientY}px`};
  left: ${({ clientX }) => `${clientX}px`};
  z-index: 10000;
  padding: 14px 18px;
  font-size: 16px;
  display: ${({ isOpened }) => (isOpened ? 'block' : 'none')};

  ${reset}
`;

export const Iframe = styled.iframe`
  border: none !important;
  width: 340px;
  height: 360px;
  padding-top: 50px !important;
`;

export const Form = styled.form`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #ffffff;

  & input {
    width: 100%;
    height: 42px;
    font-size: 18px;
    padding: 4px 36px 4px 8px;
    box-sizing: border-box;
    margin: 0 0 5px 0;
    border: 1px solid #000;
  }

  & button {
    position: absolute;
    right: 5px;
    top: 5px;
    border-radius: 50%;
    background: #ffffff;
    border: 1px solid #000;
    width: 30px;
    text-align: center;
    height: 30px;
    cursor: pointer;
  }
`;
