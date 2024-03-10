import React, { forwardRef } from 'react';
import './Input.css'

const Input = forwardRef(({ onSearchTermChange, value }, ref) => {
  const handleChange = (event) => {
    onSearchTermChange(event.target.value);
  };

  return (
      <input
        ref={ref}
        type="text"
        placeholder="Enter letters to search suburbs"
        aria-label='Enter letters to search suburbs'
        value={value}
        onChange={handleChange}
      />
  );
});

export default Input;

