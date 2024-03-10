import React from 'react';
import './ResultsList.css';

function ResultsList({ suburbs, onSelect, isOpen }) {
  const handleClick = (suburb) => {
    onSelect(suburb); 
  };

  return isOpen ? (
    <ul className="results-list">
      {suburbs.map((suburb) => (
        <li key={suburb.name} onClick={() => handleClick(suburb)} aria-label={suburb.name}>
          {suburb.name}
        </li>
      ))}
    </ul>
  ) : null;
}

export default ResultsList;
