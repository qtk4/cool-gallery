import {
  StyledAltText,
  StyledAuthorTag,
  StyledDivider,
  StyledFavouriteButton,
  StyledPhoto,
  StyledPhotoCaptions,
  StyledPhotoItem,
} from './styledComponents';

import { Photo } from '../types';

interface PhotoItemProps {
  photo: Photo;
  ref?: (node: HTMLDivElement) => void;
  handleRemoveFromFavourites: (photoId: number) => void;
  handleAddToFavourites: (photoId: number) => void;
  isPhotoFavourited: boolean;
}

export const PhotoItem: React.FC<PhotoItemProps> = ({
  photo,
  ref,
  handleAddToFavourites,
  handleRemoveFromFavourites,
  isPhotoFavourited,
}) => {
  const {
    id,
    alt,
    photographer,
    src: { landscape, tiny },
    width,
    height,
  } = photo;

  return (
    <StyledPhotoItem key={id} ref={ref} $placeholderUrl={tiny}>
      <figure>
        <StyledPhoto src={landscape} alt={alt} width={width} height={height} />

        <StyledPhotoCaptions>
          {alt && (
            <>
              <StyledAltText>{alt}</StyledAltText>

              <StyledDivider />
            </>
          )}

          <StyledAuthorTag>{photographer}</StyledAuthorTag>

          <StyledFavouriteButton
            onClick={() => {
              if (isPhotoFavourited) {
                handleRemoveFromFavourites(id);
              } else {
                handleAddToFavourites(id);
              }
            }}
          >
            {isPhotoFavourited ? 'Unfavourite' : 'Favourite'}
          </StyledFavouriteButton>
        </StyledPhotoCaptions>
      </figure>
    </StyledPhotoItem>
  );
};
