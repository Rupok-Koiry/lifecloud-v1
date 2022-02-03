import { useState, createContext, useContext } from 'react';

export const SearchContext = createContext({});
export const SearchProvider = ({ children }) => {
  const [searchText, setSearchText] = useState();

  const value = {
    searchText,
    setSearchText,
  };
  // console.log(searchText,'searchtext')
  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export function useSearch() {
  return useContext(SearchContext);
}
