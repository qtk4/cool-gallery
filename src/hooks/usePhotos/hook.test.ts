import { renderHook, waitFor } from '@testing-library/react';
import { usePhotos } from './hook';

global.fetch = jest.fn();

describe('usePhotos', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch photos successfully', async () => {
    const mockResponse = {
      photos: [{ id: 1 }, { id: 2 }],
      next_page: 'next_url',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const { result, unmount } = renderHook(() => usePhotos(1));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isApiError).toBe(false);
      expect(result.current.photos).toEqual(mockResponse.photos);
      expect(result.current.isNextPageAvailable).toBe(true);
    });

    unmount();
  });

  it('should handle API errors', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    const { result, unmount } = renderHook(() => usePhotos(1));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isApiError).toBe(true);
    });

    unmount();
  });

  it('should handle empty photos response', async () => {
    const mockResponse = {
      photos: [],
      next_page: null,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const { result, unmount } = renderHook(() => usePhotos(1));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.photos).toEqual([]);
      expect(result.current.isNextPageAvailable).toBe(false);
    });

    unmount();
  });

  it('shouponse', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          photos: [{ id: 1 }, { id: 2 }],
          next_page: 'next_url',
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({
          photos: [{ id: 3 }, { id: 4 }],
          next_page: 'next_url',
        }),
      });

    const { result, rerender, unmount } = renderHook(pageId => usePhotos(pageId), { initialProps: 1 });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.photos).toEqual([{ id: 1 }, { id: 2 }]);
      expect(result.current.isNextPageAvailable).toBe(true);
    });

    rerender(2);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.photos).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
      expect(result.current.isNextPageAvailable).toBe(true);
    });

    unmount();
  });
});
