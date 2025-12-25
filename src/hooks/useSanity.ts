import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity/client';

interface UseSanityResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useSanityQuery<T>(query: string, params?: Record<string, unknown>): UseSanityResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await sanityClient.fetch<T>(query, params);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erreur de chargement'));
        console.error('Sanity fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, JSON.stringify(params)]);

  return { data, loading, error };
}
