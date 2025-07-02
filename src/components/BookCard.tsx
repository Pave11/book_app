import React from 'react';
import { Book } from '../api/books';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow hover:bg-gray-200">
      <div className="flex h-full">
        {/* Обложка книги */}
        <div className="w-1/3 bg-gray-100 flex items-center justify-center">
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={book.title}
              className="h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/book-placeholder.png';
              }}
            />
          ) : (
            <div className="text-gray-500 text-center p-4">Нет обложки</div>
          )}
        </div>

        {/* Информация о книге */}
        <div className="w-2/3 p-4 flex flex-col">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h3>

          {book.author_name && (
            <p className="text-gray-600 mb-2">
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
