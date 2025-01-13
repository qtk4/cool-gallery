import styled from 'styled-components';

export const StyledAppWrapper = styled.div`
  max-width: 1260px;
  padding: 16px;
  margin: auto;
`;

const StyledUnsetButton = styled.button.attrs({ type: 'button' })`
  all: unset;
`;

export const StyledAppHeader = styled.div`
  margin-bottom: 36px;
`;

export const StyledAppHeading = styled.h1`
  text-align: center;
  font-size: 26px;
  font-weight: 900;
  margin: 24px 0 36px;
  color: #545454;
`;

export const StyledTabButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledTabButton = styled(StyledUnsetButton)`
  cursor: pointer;
  width: 116px;
  padding: 8px 12px;
  text-align: center;
  background-color: #737373;
  color: #fff;
  border-radius: 6px 0 0 6px;
  transition: var(--transition);

  &:hover {
    background-color: #545454;
  }

  &:nth-child(even) {
    border-radius: 0 6px 6px 0;
  }

  &:disabled {
    cursor: auto;
    background-color: #333333;
  }
`;

export const StyledPhotosGallery = styled.div`
  display: flex;
`;
