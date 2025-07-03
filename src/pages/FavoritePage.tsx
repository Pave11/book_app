import React from 'react';
import { BookCard } from '../components/BookCard';
import { useFavorites } from '../hooks/useFavorites';

export function FavoritePage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="container mx-auto max-w-4xl pt-10">
      <h1 className="text-2xl font-bold mb-6">Избранные книги</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Здесь пока нет книг</p>
          <p className="text-sm text-gray-400">
            Добавляйте книги в избранное, нажимая на сердечко ♡
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((book) => (
            <BookCard
              key={book.key}
              book={book}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
