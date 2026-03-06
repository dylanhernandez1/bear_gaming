import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "bg.filters";

const DEFAULT_FILTERS = {
  tags: [],
  minRating: 0,
  maxPrice: null,
  minHours: 0,
  maxHours: Infinity,
};

// Infinity doesn't survive JSON serialization — store it as null and restore on load
function serialize(filters) {
  return JSON.stringify({
    ...filters,
    maxHours: filters.maxHours === Infinity ? null : filters.maxHours,
  });
}

function deserialize(str) {
  try {
    const parsed = JSON.parse(str);
    return {
      ...DEFAULT_FILTERS,
      ...parsed,
      maxHours: parsed.maxHours === null ? Infinity : parsed.maxHours,
    };
  } catch {
    return DEFAULT_FILTERS;
  }
}

function loadFilters() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? deserialize(saved) : DEFAULT_FILTERS;
}

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(loadFilters);

  const updateFilters = (partial) => {
    setFilters((prev) => {
      const next = { ...prev, ...partial };
      localStorage.setItem(STORAGE_KEY, serialize(next));
      return next;
    });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    localStorage.setItem(STORAGE_KEY, serialize(DEFAULT_FILTERS));
  };

  const hasActiveFilters =
    filters.tags.length > 0 ||
    filters.minRating > 0 ||
    filters.maxPrice !== null ||
    filters.minHours > 0 ||
    filters.maxHours !== Infinity;

  return (
    <FilterContext.Provider value={{ filters, updateFilters, resetFilters, hasActiveFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used inside FilterProvider");
  return ctx;
}