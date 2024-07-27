import React from 'react';
import './Searching_bar.css'

export const Searching_bar = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className='bar-container'>
      <input 
        type='text' 
        value={query} 
        onChange={handleInputChange} 
        placeholder='Type your search here...' 
      />
    </div>
  );
};
