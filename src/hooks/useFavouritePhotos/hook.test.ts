import { renderHook, waitFor } from '@testing-library/react';

import { Photo } from '../../types';
import { useFavouritePhotos } from './hook';
import { baseAPIUrl } from '../../constants';

global.fetch = jest.fn();

describe('useFavouritePhotos', () => {
  const mockPhoto: Photo = {
    id: 123,
    width: 180,
    height: 320,
    url: 'https://www.test.much/photo/test-image-123/',
    photographer: 'Jimno Jumbo',
    photographer_url: 'https://www.test.much/jimbo',
    photographer_id: 456,
    avg_color: '#fff',
    src: {
      original: 'htttps://images.test.much/photos/123/',
      large2x: 'htttps://images.test.much/photos/123/',
      large: 'htttps://images.test.much/photos/123/',
      medium: 'htttps://images.test.much/photos/123/',
      small: 'htttps://images.test.much/photos/123/',
      portrait: 'htttps://images.test.much/photos/123/',
      landscape: 'htttps://images.test.much/photos/123/',
      tiny: 'htttps://images.test.much/photos/123/',
    },
    liked: false,
    alt: 'test image',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with loading state', async () => {
    const { result, unmount } = renderHook(() => useFavouritePhotos([]));

    await waitFor(() => {
      expect(result.current.isLoadingFavourites).toBe(true);
      expect(result.current.isApiErrorFavourites).toBe(false);
      expect(result.current.favouritePhotos).toEqual([]);
    });

    unmount();
  });

  it('should fetch and set favourite photos successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockPhoto),
    });

    const { result, unmount } = renderHook(() => useFavouritePhotos([123]));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`${baseAPIUrl}/photos/123`, {
        headers: {
          Authorization: 'api_key_123',
        },
      });

      expect(result.current.isLoadingFavourites).toBe(false);
      expect(result.current.isApiErrorFavourites).toBe(false);
      expect(result.current.favouritePhotos).toEqual([mockPhoto]);
    });

    unmount();
  });

  it('should handle fetch errors', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    const { result, unmount } = renderHook(() => useFavouritePhotos([456]));

    await waitFor(() => {
      expect(result.current.isLoadingFavourites).toBe(false);
      expect(result.current.isApiErrorFavourites).toBe(true);
      expect(result.current.favouritePhotos).toEqual([]);
    });

    unmount();
  });

  it('should cache fetched photos', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ id: 2 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ id: 1 }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ id: 5 }),
      });

    const { result, unmount, rerender } = renderHook(photoIds => useFavouritePhotos(photoIds), {
      initialProps: [1, 2],
    });

    await waitFor(() => {
      expect(result.current.favouritePhotos.length).toBe(2);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    rerender([1, 2, 5]);

    await waitFor(() => {
      expect(result.current.favouritePhotos.length).toBe(3);
      expect(fetch).toHaveBeenCalledTimes(3);
    });

    unmount();
  });
});
