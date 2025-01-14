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
    width,
    height,
    avg_color,
    src: { landscape, tiny },
  } = photo;

  return (
    <StyledPhotoItem key={id} ref={ref} $placeholderUrl={tiny} $placeholderColor={avg_color}>
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
