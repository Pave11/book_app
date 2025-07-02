import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { Navigation } from './components/Navigation';
import { FavoritePage } from './pages/FavoritePage';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/fav" element={<FavoritePage />} />
      </Routes>
    </>
  );
}

export default App;
