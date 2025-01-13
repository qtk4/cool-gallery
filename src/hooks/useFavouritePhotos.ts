import { useEffect, useState } from 'react';
import { Photo } from '../types';
import { apiKey, baseAPIUrl } from '../constants';

interface PhotosCache {
  [photoId: number]: Photo;
}

export const useFavouritePhotos = (photoIds: number[]) => {
  const [favouritePhotos, setFavouritePhotos] = useState<Photo[]>([]);
  const [isLoadingFavourites, setIsLoadingFavourites] = useState(true);
  const [isApiErrorFavourites, setIsApiErrorFavourites] = useState(false);
  const [cache, setCache] = useState<PhotosCache>({});

  useEffect(() => {
    const fetchPictures = async () => {
      setIsLoadingFavourites(true);
      setIsApiErrorFavourites(false);
      const newPhotos: Photo[] = [];

      const idsToFetch = photoIds.filter(id => !cache[id]);

      try {
        const requests = idsToFetch.map(id =>
          fetch(`${baseAPIUrl}/photos/${id}`, {
            headers: {
              Authorization: apiKey,
            },
          }).then(response => {
            if (!response.ok) {
              throw new Error(`Error fetching photo with ID ${id}: ${response.statusText}`);
            }

            return response.json();
          }),
        );

        const fetchedPhotos: Photo[] = await Promise.all(requests);

        fetchedPhotos.forEach(picture => {
          setCache(prevCache => ({ ...prevCache, [picture.id]: picture }));

          newPhotos.push(picture);
        });

        setFavouritePhotos(prevPhotos => [
          ...newPhotos,
          ...prevPhotos.filter(({ id }) => photoIds.includes(id)),
        ]);
      } catch (error) {
        setIsApiErrorFavourites(true);
      } finally {
        setIsLoadingFavourites(false);
      }
    };

    fetchPictures();
  }, [JSON.stringify(photoIds)]);

  return { favouritePhotos, isLoadingFavourites, isApiErrorFavourites };
};
