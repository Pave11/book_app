import React, { useState, useEffect } from 'react';
import { BookCard } from '../components/BookCard';
import { BookSearch } from '../components/BookSearch';
import { fetchBooks, Book } from '../api/books';
import { useFavorites } from '../hooks/useFavorites';

export function MainPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('javascript');
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    fetchBooks(query).then(setBooks);
  }, [query]);

  return (
    <div className="container mx-auto max-w-[800px] pt-10">
      <BookSearch onSearch={setQuery} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {books.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            isFavorite={favorites.some((fav) => fav.key === book.key)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
