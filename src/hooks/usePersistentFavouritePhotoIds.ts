import { useEffect, useState } from 'react';

const localStorageId = 'favouritePhotoIds';

export const usePersistentFavouritePhotoIds = (): [
  number[],
  (photoId: number) => void,
  (photoId: number) => void,
] => {
  const [favouritePhotoIds, setFavouritePhotoIds] = useState<number[]>([]);

  useEffect(() => {
    const value = localStorage.getItem(localStorageId);

    if (value) {
      setFavouritePhotoIds(JSON.parse(value));
    }
  }, []);

  const handleSetFavouritePhotoIdsState = (updatedPhotoIds: number[]) => {
    localStorage.setItem(localStorageId, JSON.stringify(updatedPhotoIds));
    setFavouritePhotoIds(updatedPhotoIds);
  };

  const handleAddToFavourites = (photoId: number) =>
    handleSetFavouritePhotoIdsState([...favouritePhotoIds, photoId]);

  const handleRemoveFromFavourites = (photoId: number) =>
    handleSetFavouritePhotoIdsState(favouritePhotoIds.filter(favourite => favourite !== photoId));

  return [favouritePhotoIds, handleAddToFavourites, handleRemoveFromFavourites];
};
