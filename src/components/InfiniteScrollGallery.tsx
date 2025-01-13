import { useCallback, useRef } from 'react';

import { Photo } from '../types';
import { PhotoItem } from './PhotoItem';

interface InfiniteScrollGalleryProps {
  isLoading: boolean;
  isNextPageAvailable: boolean;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  photos: Photo[];
  favouritePhotoIds: number[];
  handleRemoveFromFavourites: (photoId: number) => void;
  handleAddToFavourites: (photoId: number) => void;
}

export const InfiniteScrollGallery: React.FC<InfiniteScrollGalleryProps> = ({
  isLoading,
  isNextPageAvailable,
  setPageNumber,
  photos,
  favouritePhotoIds,
  handleAddToFavourites,
  handleRemoveFromFavourites,
}) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPhotoElement = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && isNextPageAvailable) {
          setPageNumber(prevPage => prevPage + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, isNextPageAvailable],
  );

  return photos.map((photo, index) => {
    const { id } = photo;

    const isPhotoFavourited = favouritePhotoIds.includes(id);

    const ref = photos.length === index + 1 ? lastPhotoElement : undefined;

    return (
      <PhotoItem
        key={id}
        photo={photo}
        ref={ref}
        isPhotoFavourited={isPhotoFavourited}
        handleAddToFavourites={handleAddToFavourites}
        handleRemoveFromFavourites={handleRemoveFromFavourites}
      />
    );
  });
};
