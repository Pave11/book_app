import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '../hooks/useFavorites';
import { Book } from '../api/books';

describe('useFavorites', () => {
  const mockBook: Book = {
    key: '/works/OL123W',
    title: 'Test Book',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('adds and removes favorites', () => {
    const { result } = renderHook(() => useFavorites());

    // Add to favorites
    act(() => {
      result.current.toggleFavorite(mockBook);
    });
    expect(result.current.favorites).toEqual([mockBook]);

    // Remove from favorites
    act(() => {
      result.current.toggleFavorite(mockBook);
    });
    expect(result.current.favorites).toEqual([]);
  });

  it('loads favorites from localStorage', () => {
    localStorage.setItem('favoriteBooks', JSON.stringify([mockBook]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([mockBook]);
  });
});
