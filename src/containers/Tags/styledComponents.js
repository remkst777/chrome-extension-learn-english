import styled from 'styled-components';
import Panel from '../../components/Panel';

export const Tag = styled.div`
  border-radius: 5px;
  border: 2px solid rgba(0, 123, 255, 0.25);
  text-transform: uppercase;
  padding: 2px 8px;
  display: inline-flex;
  margin: 10px 5px 0 5px;
  cursor: pointer;
  font-size: 12px;
`;

export const AddTagButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: #ffffff;
  cursor: pointer;
`;

export const AddTagPanel = styled(Panel)`
  input {
    width: 100%;
  }
`;
