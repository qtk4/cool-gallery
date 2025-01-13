import { useCallback, useRef } from 'react';
import { Photo } from '../types';
import { PhotoItem } from './PhotoItem';

interface InfiniteScrollGalleryProps {
  isLoading: boolean;
  hasMore: boolean;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  photos: Photo[];
}

export const InfiniteScrollGallery: React.FC<InfiniteScrollGalleryProps> = ({
  isLoading,
  hasMore,
  setPageNumber,
  photos,
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
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPage => prevPage + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore],
  );

  return photos.map((photo, index) => {
    const { id } = photo;

    const ref = photos.length === index + 1 ? lastPhotoElement : undefined;

    return <PhotoItem key={id} photo={photo} ref={ref} />;
  });
};
