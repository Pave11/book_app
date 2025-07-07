import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePage } from '../pages/FavoritePage';

jest.mock('../hooks/useFavorites', () => ({
  useFavorites: () => ({
    favorites: [],
    toggleFavorite: jest.fn(),
  }),
}));

describe('FavoritePage', () => {
  it('shows empty state when no favorites', () => {
    const { getByText } = render(<FavoritePage />);
    expect(getByText('Здесь пока нет книг')).toBeInTheDocument();
  });
});
