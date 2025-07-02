import { useState, useEffect } from 'react';
import { Book } from '../api/books';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Book[]>(() => {
    const saved = localStorage.getItem('favoriteBooks');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (book: Book) => {
    setFavorites((prev) => {
      const isExisting = prev.some((fav) => fav.key === book.key);
      const newFavorites = isExisting
        ? prev.filter((fav) => fav.key !== book.key)
        : [...prev, book];

      localStorage.setItem('favoriteBooks', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return { favorites, toggleFavorite };
};
