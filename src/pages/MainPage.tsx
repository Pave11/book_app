import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BookCard } from '../components/BookCard';
import { BookSearch } from '../components/BookSearch';
import { fetchBooks, Book } from '../api/books';
import { useFavorites } from '../hooks/useFavorites';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export function MainPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState('javascript');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const seedRef = useRef(Date.now().toString());

  const loadMoreBooks = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const newBooks = await fetchBooks(query, page, 12, seedRef.current);

      setBooks((prev) => {
        const existingKeys = new Set(prev.map((b) => b.key));
        const filteredNewBooks = newBooks.filter(
          (book) => !existingKeys.has(book.key),
        );
        return [...prev, ...filteredNewBooks];
      });

      setPage((prev) => prev + 1);
      setHasMore(newBooks.length > 0);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query, page, hasMore, isLoading]);

  useEffect(() => {
    seedRef.current = Date.now().toString();
    setBooks([]);
    setPage(1);
    setHasMore(true);
    loadMoreBooks();
  }, [query]);

  useInfiniteScroll(loadMoreBooks);

  return (
    <div className="container mx-auto max-w-4xl pt-10">
      <BookSearch onSearch={setQuery} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {books.map((book, index) => (
          <BookCard
            key={`${book.key}-${index}`}
            book={book}
            isFavorite={favorites.some((fav) => fav.key === book.key)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {isLoading && (
        <div className="text-center py-6">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!hasMore && books.length > 0 && (
        <div className="text-center py-6 text-gray-500">
          Вы просмотрели все книги
        </div>
      )}
    </div>
  );
}
