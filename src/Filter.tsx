import React, { useState, useEffect } from 'react';
import data from './data.json';

type MenuItem = {
  name: string;
  menu: string;
};

const Filter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<MenuItem[]>(data);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      const newFilteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(newFilteredData);
    }
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // try if commit works
  const highlightSearchTerm = (item: string, term: string) => {
    const splitItem = item.split(new RegExp(`(${term})`, 'gi'));
    return (
      <>
        {splitItem.map((chunk, index) =>
          chunk.toLowerCase() === term.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: 'yellow' }}>
              {chunk}
            </span>
          ) : (
            chunk
          )
        )}
      </>
    );
  };

  return (
    <div>
      <input type="text" 
      placeholder="Search..."  
      value={searchTerm} 
      onChange={handleSearchChange} />
      
      {filteredData.map((item, index) => (
        <div key={index}>
          <p>
            {highlightSearchTerm(item.name, searchTerm)} - {item.menu}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Filter;
