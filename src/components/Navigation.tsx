import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="flex justify-between px-5 h-[50px] bg-gray-200 items-center shadow-md">
      <Link to="/main"> Книги </Link>
      <Link to="/fav"> Избранное </Link>
    </nav>
  );
}
