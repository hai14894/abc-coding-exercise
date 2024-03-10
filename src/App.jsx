import React, { useState, useRef } from 'react';
import Input from '../src/components/Input/Input';
import Button from '../src/components/Button/Button';
import ResultsList from '../src/components/ResultsList/ResultsList';
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suburbs, setSuburbs] = useState([]);
  const [isResultsListOpen, setIsResultsListOpen] = useState(false); 
  const inputRef = useRef(null);

  const handleSearchTermChange = async (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    // open the ResultsList whenever a new search term is entered
    setIsResultsListOpen(true); 

    try {
      const response = await fetch(`http://localhost:8010/proxy/suburbs.json?q=${newSearchTerm}`);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      const filteredSuburbs = data.filter((suburb) => suburb.name.toLowerCase().startsWith(newSearchTerm.toLowerCase()));
      const uniqueSuburbs = [...new Set(filteredSuburbs.map((suburb) => suburb.name.toLowerCase()))].map((name) => ({
        name,
      }));

      setSuburbs(uniqueSuburbs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectSuggestion = async (suburb) => {
    setSearchTerm(suburb.name);
    // close the ResultsList when an option is selected
    setIsResultsListOpen(false); 
    // focus input after selecting a suburb
    if(inputRef.current){
      inputRef.current.focus();
    }
  };

  return (
    <div className="app">
      <div className="search-bar">
        <span>Suburb</span>
        <Input ref={inputRef} onSearchTermChange={handleSearchTermChange} value={searchTerm} />
        <Button onClick={() => alert(`Your most recent suburb selection: ${searchTerm}`)} />
      </div>
      {isResultsListOpen && suburbs.length > 0 && (
        <ResultsList
          suburbs={suburbs}
          onSelect={handleSelectSuggestion}
          onSearchTermChange={handleSearchTermChange}
          isOpen={isResultsListOpen}
        />
      )}
    </div>
  );
}

export default App;
