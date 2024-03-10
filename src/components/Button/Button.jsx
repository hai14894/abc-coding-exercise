import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Button.css'

const Button = React.forwardRef(({ onClick }, ref) => (
  <button ref={ref} className="search-button" onClick={onClick} aria-label="Search for suburbs">
    <FontAwesomeIcon icon={faArrowRight} />
  </button>
));

export default Button;
