import styled from 'styled-components';

export const StyledAppWrapper = styled.div`
  max-width: 1260px;
  padding: 16px;
  margin: auto;

  --color-white: #fefefd;
  --color-light-grey: #737373;
  --color-grey: #545454;
  --color-dark-grey: #333333;

  --transition: 0.5s ease;
  --gallery-gap: 32px;

  --photos-per-row: 1;

  @media only screen and (768px <= width) {
    --photos-per-row: 2;
  }

  @media only screen and (1024px <= width) {
    --photos-per-row: 3;
  }

  @media only screen and (1920px <= width) {
    --photos-per-row: 4;
  }

  @media only screen and (2560px <= width) {
    --photos-per-row: 5;
  }
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
  color: var(--color-grey);
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
  background-color: var(--color-light-grey);
  color: var(--color-white);
  border-radius: 6px 0 0 6px;
  transition: var(--transition);

  &:hover {
    background-color: var(--color-grey);
  }

  &:nth-child(even) {
    border-radius: 0 6px 6px 0;
  }

  &:disabled {
    cursor: auto;
    background-color: var(--color-dark-grey);
  }
`;

export const StyledPhotosGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--gallery-gap);
`;

export const StyledPhotoItem = styled.div<{ $placeholderUrl: string }>`
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  flex: 0 0 calc((100% - (var(--gallery-gap) * (var(--photos-per-row) - 1))) / var(--photos-per-row));

  &::before {
    content: '';
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
    position: absolute;
    transition: var(--transition);
    background-color: var(--color-light-grey);
    background-image: ${({ $placeholderUrl }) => `url(${$placeholderUrl})`};
    background-repeat: no-repeat;
    background-size: cover;
  }

  &:hover {
    &::before {
      filter: brightness(0.4);
    }
  }
`;

export const StyledPhoto = styled.img.attrs({
  loading: 'lazy',
})`
  max-width: 100%;
  vertical-align: middle;
  height: auto;
  aspect-ratio: 3/2;
  object-fit: cover;
  transition: var(--transition);

  ${StyledPhotoItem}:hover & {
    filter: brightness(0.4);
  }
`;

export const StyledPhotoCaptions = styled.figcaption`
  opacity: 0;
  width: 75%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 16px;

  transition: var(--transition);

  display: flex;
  flex-direction: column;
  align-items: center;

  ${StyledPhotoItem}:hover & {
    opacity: 1;
  }
`;
export const StyledAltText = styled.span`
  text-align: center;
  color: var(--color-white);
  font-weight: 600;
  letter-spacing: -0.2px;
  line-height: 1;
`;

export const StyledDivider = styled.div`
  margin: 8px 0;
  height: 1px;
  width: 30%;
  background-color: var(--color-white);
`;

export const StyledAuthorTag = styled.span`
  color: var(--color-white);
  margin-bottom: 16px;
  font-weight: normal;
  font-style: italic;
`;

export const StyledFavouriteButton = styled(StyledUnsetButton)`
  width: 88px;
  text-align: center;
  cursor: pointer;
  border-radius: 50px;
  border: 1px solid var(--color-white);
  padding: 12px 16px;
  background-color: transparent;
  color: var(--color-white);
  font-weight: normal;
  transition: var(--transition);
  font-size: 16px;

  &:hover {
    background-color: var(--color-white);
    color: var(--color-dark-grey);
  }
`;

export const StyledScrollToTop = styled(StyledUnsetButton)<{ $visible: boolean }>`
  display: block;
  cursor: pointer;

  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};

  position: fixed;
  bottom: 16px;
  right: 16px;

  background-color: var(--color-grey);
  color: var(--color-white);
  width: 50px;
  aspect-ratio: 1;
  text-align: center;
  border-radius: 50%;
  font-weight: 900;

  transition: var(--transition);

  &:hover {
    background-color: var(--color-dark-grey);
  }
`;

export const StyledLoader = styled.div`
  position: fixed;
  bottom: 16px;
  left: calc(50% - 29px);

  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: var(--color-dark-grey) transparent;
  animation: spin 1s infinite;

  @keyframes spin {
    to {
      transform: rotate(0.5turn);
    }
  }
`;

export const StyledError = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;

  padding: 6px 8px;
  border-radius: 3px;

  font-size: 16px;

  background-color: #ba0517;
  color: var(--color-white);
`;
