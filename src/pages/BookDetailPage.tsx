import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { fetchBookDetails, Book } from '../api/books';

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadBook = async () => {
      try {
        setLoading(true);
        setError('');
        const bookData = await fetchBookDetails(id!);
        if (isMounted) setBook(bookData);
      } catch (err) {
        if (isMounted) setError('Не удалось загрузить информацию о книге');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBook();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const isFavorite = book
    ? favorites.some((fav) => fav.key === book.key)
    : false;

  const renderRatingStars = (rating: number | null | undefined) => {
    // Если рейтинг null или undefined, считаем его 0
    const normalizedRating = rating ?? 0;

    const fullStars = Math.floor(normalizedRating);
    const hasHalfStar = normalizedRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center mt-1">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {hasHalfStar && (
          <svg
            key="half"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-star)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-5 h-5 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        <span className="ml-1 text-gray-600 text-sm">
          ({normalizedRating.toFixed(1)})
        </span>
      </div>
    );
  };

  if (loading)
    return (
      <div className="container mx-auto max-w-4xl py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto max-w-4xl py-8 text-center text-red-500">
        {error}
      </div>
    );

  if (!book) return null;

  const {
    title = 'Без названия',
    author_name = [],
    coverUrl,
    description,
    first_publish_year,
    publisher = [],
    language = [],
    number_of_pages,
    subjects = [],
    key,
    ratings,
  } = book;

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Назад
        </button>

        <button
          onClick={() => toggleFavorite(book)}
          className={`flex items-center ${isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'} transition-colors`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isFavorite ? 'fill-current' : 'fill-transparent'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="ml-1 hidden sm:inline">
            {isFavorite ? 'В избранном' : 'В избранное'}
          </span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={`Обложка книги "${title}"`}
                className="w-full md:w-48 h-auto object-contain mx-auto shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/book-placeholder.png';
                  (e.target as HTMLImageElement).className =
                    'w-full md:w-48 bg-gray-100 object-contain mx-auto';
                }}
              />
            ) : (
              <div className="w-full md:w-48 bg-gray-100 flex items-center justify-center h-64">
                <div className="text-gray-500 text-center p-4">Нет обложки</div>
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{title}</h1>

              {author_name.length > 0 && (
                <div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Автор:</span>{' '}
                    {author_name.join(', ')}
                  </p>
                  {renderRatingStars(ratings?.average)}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
                {first_publish_year && (
                  <div>
                    <span className="font-semibold">Год издания:</span>{' '}
                    {first_publish_year}
                  </div>
                )}
                {publisher.length > 0 && (
                  <div>
                    <span className="font-semibold">Издатель:</span>{' '}
                    {publisher.join(', ')}
                  </div>
                )}
                {language.length > 0 && (
                  <div>
                    <span className="font-semibold">Язык:</span>{' '}
                    {language.join(', ')}
                  </div>
                )}
                {number_of_pages && (
                  <div>
                    <span className="font-semibold">Страниц:</span>{' '}
                    {number_of_pages}
                  </div>
                )}
              </div>
            </div>
          </div>

          {description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Описание</h2>
              <p className="text-gray-700 whitespace-pre-line">{description}</p>
            </div>
          )}

          {subjects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Темы</h2>
              <div className="flex flex-wrap gap-2">
                {subjects.slice(0, 10).map((subject, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
