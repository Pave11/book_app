export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  coverUrl?: string;
  description?: string;
  first_publish_year?: number;
  publisher?: string[];
  language?: string[];
  number_of_pages?: number;
  subjects?: string[];
  ratings?: {
    average?: number;
    count?: number;
  };
}

export const fetchBooks = async (
  query: string,
  page = 1,
  limit = 12,
  seed?: string,
): Promise<Book[]> => {
  try {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString(),
      fields: 'key,title,author_name,cover_i,first_publish_year',
    });

    if (seed) params.append('seed', seed);

    const response = await fetch(
      `https://openlibrary.org/search.json?${params}`,
    );
    if (!response.ok) throw new Error('Failed to fetch books');

    const data = await response.json();
    return (data.docs || [])
      .filter(
        (book: Book, index: number, self: Book[]) =>
          index === self.findIndex((b) => b.key === book.key),
      )
      .map((book: Book) => ({
        ...book,
        coverUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : undefined,
      }));
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchBookDetails = async (id: string): Promise<Book> => {
  try {
    const [bookResponse, ratingsResponse] = await Promise.all([
      fetch(`https://openlibrary.org/works/${id}.json`),
      fetch(`https://openlibrary.org/works/${id}/ratings.json`),
    ]);

    if (!bookResponse.ok) throw new Error('Failed to fetch book details');

    const bookData = await bookResponse.json();
    const ratingsData = ratingsResponse.ok ? await ratingsResponse.json() : {};

    const getDescription = (desc: any): string => {
      if (typeof desc === 'string') return desc;
      if (desc?.value) return desc.value;
      return 'Описание отсутствует';
    };

    let authorsNames: string[] = [];
    if (bookData.authors?.length > 0) {
      const authorsDetails = await Promise.all(
        bookData.authors.map(async (author: any) => {
          const res = await fetch(
            `https://openlibrary.org${author.author.key}.json`,
          );
          return res.json();
        }),
      );
      authorsNames = authorsDetails.map((a) => a.name);
    }

    return {
      key: `/works/${id}`,
      title: bookData.title,
      description: getDescription(bookData.description),
      first_publish_year: bookData.first_publish_year,
      subjects: bookData.subjects || [],
      author_name: authorsNames,
      publisher: bookData.publishers || [],
      language: bookData.languages || [],
      number_of_pages: bookData.number_of_pages,
      cover_i: bookData.covers?.[0],
      coverUrl: bookData.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-L.jpg`
        : undefined,
      ratings: {
        average: ratingsData.summary?.average,
        count: ratingsData.summary?.count,
      },
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};
