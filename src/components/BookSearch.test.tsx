import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BookSearch } from '../components/BookSearch';

describe('BookSearch', () => {
  it('calls onSearch with input value when form submitted', () => {
    const mockSearch = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <BookSearch onSearch={mockSearch} />,
    );

    const input = getByPlaceholderText('Поиск книг...');
    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.click(getByText('Найти'));

    expect(mockSearch).toHaveBeenCalledWith('react');
  });

  it('uses default value when input is empty', () => {
    const mockSearch = jest.fn();
    const { getByText } = render(<BookSearch onSearch={mockSearch} />);

    fireEvent.click(getByText('Найти'));
    expect(mockSearch).toHaveBeenCalledWith('javascript');
  });
});
