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
}

export const PhotoItem: React.FC<PhotoItemProps> = ({ photo, ref }) => {
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

          <StyledFavouriteButton>{'Favourite'}</StyledFavouriteButton>
        </StyledPhotoCaptions>
      </figure>
    </StyledPhotoItem>
  );
};
