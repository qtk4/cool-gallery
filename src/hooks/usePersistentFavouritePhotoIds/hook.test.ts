import { renderHook, act } from '@testing-library/react';

import { usePersistentFavouritePhotoIds } from './hook';
import { localStorageId } from '../../constants';

describe('usePersistentFavouritePhotoIds', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with an empty array when no data in localStorage', () => {
    const { result } = renderHook(() => usePersistentFavouritePhotoIds());

    expect(result.current[0]).toEqual([]);
  });

  it('should load favourite photo IDs from localStorage', () => {
    const initialFavouriteIds = [1, 2, 3];
    localStorage.setItem(localStorageId, JSON.stringify(initialFavouriteIds));

    const { result } = renderHook(() => usePersistentFavouritePhotoIds());

    expect(result.current[0]).toEqual(initialFavouriteIds);
  });

  it('should add a photo ID to favourites', () => {
    const { result } = renderHook(() => usePersistentFavouritePhotoIds());

    act(() => {
      result.current[1](4);
    });

    expect(result.current[0]).toEqual([4]);
    expect(localStorage.getItem(localStorageId)).toEqual(JSON.stringify([4]));
  });

  it('should remove a photo ID from favourites', () => {
    const initialFavourites = [1, 2, 3];
    localStorage.setItem(localStorageId, JSON.stringify(initialFavourites));

    const { result } = renderHook(() => usePersistentFavouritePhotoIds());

    act(() => {
      result.current[2](2);
    });

    expect(result.current[0]).toEqual([1, 3]);
    expect(localStorage.getItem(localStorageId)).toEqual(JSON.stringify([1, 3]));
  });

  it('should handle adding duplicates', () => {
    const { result } = renderHook(() => usePersistentFavouritePhotoIds());

    act(() => {
      result.current[1](5);
      result.current[1](5);
    });

    expect(result.current[0]).toEqual([5]);
    expect(localStorage.getItem(localStorageId)).toEqual(JSON.stringify([5]));
  });
});
