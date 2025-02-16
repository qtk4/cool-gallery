import { useEffect, useState } from 'react';

import { Photo, PhotosResponseResult } from '../../types';
import { baseAPIUrl } from '../../constants';

export const usePhotos = (pageNumber: number) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApiError, setisApiError] = useState(false);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState(false);

  const getPhotos = async (pageNumber: number) => {
    try {
      const response = await fetch(`${baseAPIUrl}/curated?page=${pageNumber}`, {
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching pictures for page ${pageNumber}: ${response.status}`);
      }

      const { photos, next_page }: PhotosResponseResult = await response.json();

      setPhotos(prev => [...prev, ...photos]);
      setIsNextPageAvailable(!!next_page);
    } catch (error) {
      setisApiError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setisApiError(false);

    getPhotos(pageNumber);
  }, [pageNumber]);

  return { isLoading, isApiError, photos, isNextPageAvailable };
};
