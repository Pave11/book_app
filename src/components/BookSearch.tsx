import React, { useState } from 'react';

interface BookSearchProps {
  onSearch: (query: string) => void;
}

export const BookSearch: React.FC<BookSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim() === '' ? '*' : searchQuery);
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск книг..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Найти
      </button>
    </form>
  );
};
