import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Добавьте это
import { BookCard } from './BookCard';
import { Book } from '../api/books';

describe('BookCard', () => {
  const mockBook: Book = {
    key: '/works/OL123W',
    title: 'Test Book',
    author_name: ['Test Author'],
    coverUrl: 'test-cover.jpg',
  };

  it('renders book information', () => {
    const { getByText } = render(
      <MemoryRouter>
        {' '}
        {/* Оберните в MemoryRouter */}
        <BookCard book={mockBook} />
      </MemoryRouter>,
    );

    expect(getByText('Test Book')).toBeInTheDocument();
    expect(getByText('Автор: Test Author')).toBeInTheDocument();
  });

  it('calls onToggleFavorite when favorite button clicked', () => {
    const mockToggle = jest.fn();
    const { getByLabelText } = render(
      <MemoryRouter>
        <BookCard book={mockBook} onToggleFavorite={mockToggle} />
      </MemoryRouter>,
    );

    fireEvent.click(getByLabelText('Добавить в избранное'));
    expect(mockToggle).toHaveBeenCalledWith(mockBook);
  });
});
