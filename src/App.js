import React, { useState, useEffect } from 'react';
import './Counter.css';

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [fileName, setFileName] = useState('');
  const [saves, setSaves] = useState([]);

  useEffect(() => {
    // Load previous saves from localStorage if any
    const savedCounts = localStorage.getItem('saves');
    if (savedCounts) {
      setSaves(JSON.parse(savedCounts));
    }
  }, []);

  useEffect(() => {
    // Save the saves state to localStorage
    localStorage.setItem('saves', JSON.stringify(saves));
  }, [saves]);

  const incrementCounter = () => setCounter(counter + 1);
  const decrementCounter = () => setCounter(counter - 1);
  const resetCounter = () => setCounter(0);

  const saveCount = () => {
    if (fileName.trim() === '') {
      alert('Please provide a name for the save.');
      return;
    }
    const newSave = { name: fileName, count: counter };
    setSaves([...saves, newSave]);
    setFileName('');
  };

  return (
    <div className="counter-container">
      <p className="counter-text">Counter: {counter}</p>
      <button className="counter-button increment-button" onClick={incrementCounter}>+</button>
      <button className="counter-button" onClick={decrementCounter}>-</button>
      <button className="counter-button" onClick={resetCounter}>Reset</button>
      <button className="counter-button" onClick={saveCount}>Save</button>
      <input 
        type="text" 
        value={fileName} 
        onChange={(e) => setFileName(e.target.value)} 
        placeholder="Save name"
      />
      
      <div className="saves-section">
        <h2>Saves</h2>
        <ul>
          {saves.map((save, index) => (
            <li key={index}>
              {save.name}: {save.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Counter;
