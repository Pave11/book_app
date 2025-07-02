export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  coverUrl?: string;
}

export const fetchBooks = async (
  query: string,
  page = 1,
  limit = 12,
  seed?: string,
): Promise<Book[]> => {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    limit: limit.toString(),
  });

  if (seed) {
    params.append('seed', seed);
  }

  const response = await fetch(
    `https://openlibrary.org/search.json?${params.toString()}`,
  );

  if (!response.ok) throw new Error('Ошибка загрузки');
  const data = await response.json();

  const uniqueBooks = (data.docs || []).filter(
    (book: Book, index: number, self: Book[]) =>
      index === self.findIndex((b) => b.key === book.key),
  );

  return uniqueBooks.map((book: Book) => ({
    ...book,
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : undefined,
  }));
};
