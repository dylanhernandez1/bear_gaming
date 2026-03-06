// src/context/SearchContext.jsx
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [search, setSearch] = useState(
    localStorage.getItem("bg.search") || ""
  );

  const updateSearch = (value) => {
    setSearch(value);
    localStorage.setItem("bg.search", value);
  };

  return (
    <SearchContext.Provider value={{ search, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}