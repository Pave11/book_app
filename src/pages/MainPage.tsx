import React from 'react';
import { BookCard } from '../components/BookCard';
import { BookSearh } from '../components/BookSearch';

export function MainPage() {
  return (
    <div className="container mx-auto max-w-[800px] pt-10">
      <BookSearh />

      <BookCard />
    </div>
  );
}
