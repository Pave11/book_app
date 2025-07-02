import React, { useState } from 'react';
import { Book } from '../api/books';

interface BookCardProps {
  book: Book;
  onToggleFavorite?: (book: Book) => void;
  isFavorite?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onToggleFavorite = () => {},
  isFavorite = false,
}) => {
  const [localFavorite, setLocalFavorite] = useState(isFavorite);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalFavorite(!localFavorite);
    onToggleFavorite(book);
  };

  return (
    <div className="h-[220px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow hover:bg-gray-70 relative">
      {/* Кнопка избранного */}
      <button
        onClick={handleToggleFavorite}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute top-2 right-2 p-2 z-10 focus:outline-none"
        aria-label={
          localFavorite ? 'Удалить из избранного' : 'Добавить в избранное'
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-all duration-300 ${
            localFavorite
              ? 'text-red-500 fill-current scale-110'
              : isHovered
                ? 'text-red-300 fill-current scale-105'
                : 'text-gray-300 fill-transparent stroke-current stroke-2'
          }`}
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      {/* Остальное содержимое карточки */}
      <div className="flex h-full">
        {/* Обложка книги */}
        <div className="w-1/3 bg-gray-100 flex items-center justify-center min-h-[180px]">
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={book.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/book-placeholder.png';
              }}
            />
          ) : (
            <div className="text-gray-500 text-center p-4">Нет обложки</div>
          )}
        </div>

        {/* Информация о книге */}
        <div className="w-2/3 max-w-[220px] p-4 flex flex-col">
          <h3 className="font-bold text-lg mb-2 line-clamp-3">{book.title}</h3>

          {book.author_name && (
            <p className="text-gray-600 mb-2 line-clamp-3">
              Автор: {book.author_name.join(', ')}
            </p>
          )}

          <div className="mt-auto">
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Подробнее на OpenLibrary
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
