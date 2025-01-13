import { Photo } from '../types';
import { PhotoItem } from './PhotoItem';

interface FavouritePhotosProps {
  favouritePhotos: Photo[];
  handleRemoveFromFavourites: (photoId: number) => void;
  handleAddToFavourites: (photoId: number) => void;
}

export const FavouritePhotos: React.FC<FavouritePhotosProps> = ({
  favouritePhotos,
  handleAddToFavourites,
  handleRemoveFromFavourites,
}) =>
  favouritePhotos.map(photo => (
    <PhotoItem
      key={photo.id}
      handleAddToFavourites={handleAddToFavourites}
      handleRemoveFromFavourites={handleRemoveFromFavourites}
      isPhotoFavourited
      photo={photo}
    />
  ));
