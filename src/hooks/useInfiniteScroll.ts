import { useEffect } from 'react';

export const useInfiniteScroll = (callback: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const documentHeight = document.documentElement.offsetHeight;
      const threshold = 200;

      if (documentHeight - scrollPosition < threshold) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
};
