import React, { useState } from 'react';

const InputComponent = ({coins,dataPass}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    dataPass({coin:selectedOption,amount:event.target.value})
    setInputValue(selectedValue); // Optionally, you can update input field value based on dropdown selection
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    dataPass({coin:selectedOption,amount:event.target.value})
  };

  
  
  const solanaNetworkCoins= [
    "sol",
    "jup",
    "gmt",
    "jto",
    "ray",
    "fida",
  ];
  return (
    <div className="component">
      <select value={selectedOption} onChange={handleDropdownChange}>
        {solanaNetworkCoins.map((item)=>(

        <option value={item}>{item}</option>
        ))}
       
      </select>
      <input type="number" value={inputValue} onChange={handleInputChange} />
    </div>
  );
};

export default InputComponent;
