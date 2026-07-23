import { useMemo, useState } from 'react';
import { searchIndex } from '../data/site';

export type SearchEntry = (typeof searchIndex)[number];

/** Lets "realizacje" match "Realizacje" and "zielen" match "zieleń". */
const normalise = (value: string) =>
  value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');

export function useSiteSearch() {
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const needle = normalise(query.trim());
    if (!needle) return [];
    return searchIndex.filter((entry) => normalise(`${entry.label} ${entry.hint}`).includes(needle)).slice(0, 5);
  }, [query]);

  return { query, setQuery, matches, hasQuery: query.trim() !== '' };
}
