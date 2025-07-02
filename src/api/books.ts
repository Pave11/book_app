export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  coverUrl?: string;
}

export const fetchBooks = async (query: string, page = 1): Promise<Book[]> => {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=12`,
  );

  if (!response.ok) throw new Error('Ошибка загрузки');

  const data = await response.json();
  const rawBooks = data.docs || [];

  return rawBooks.map((book: Book) => ({
    ...book,
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : undefined,
  }));
};
