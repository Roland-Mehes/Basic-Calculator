import React, { useState } from 'react';
import styles from './calculator.module.css';

const Calculator = () => {
  const [summs, setSumms] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Function to handle button clicks
  const handleButtonClick = (value) => {
    if (value === 'C') {
      setSumms('_');
      return;
    }
    // if (summs.length === 12) {
    //   return;
    // }

    const operators = ['+', 'x', '÷', '±', '%', '*', '/', '-'];
    const lastChar = summs.trim().slice(-1);

    // Edgecase handling
    if (summs === '_' && operators.includes(value)) return; // Ignoring operators if there is no number in input
    if (operators.includes(lastChar) && operators.includes(value)) return; // Ignoring multipe operator

    // Ignoring multiple decimal numbers like 5.10.3
    if (summs === '0' && value !== '.' && !isNaN(value)) {
      setSumms(value);
      return;
    }
    if (value === '.' && lastChar === '.') return;
    if (
      value === '.' &&
      summs
        .split(/[\+\-\*\/]/)
        .pop()
        .includes('.')
    ) {
      return;
    }
    // ------------------------------------------
    if (value === '±') {
      setSumms((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
      return;
    }
    if (value === '%') {
      setSumms((prev) => (parseFloat(prev) / 100).toString());
      return;
    }
    if (value === '÷') {
      setSumms((prev) => prev + ' / ');
      return;
    }
    if (value === 'x') {
      setSumms((prev) => prev + ' * ');
      return;
    }
    if (value === '-' || value === '+') {
      setSumms((prev) => prev + ` ${value} `);
      return;
    }
    if (value === '=') {
      try {
        if (summs === '_') {
          return;
        }
        if (/\/\s*0(?!\d)/.test(summs)) {
          setSumms('Error');
          return;
        }
        setSumms(eval(summs).toString());
      } catch {
        setSumms('Error');
      }
      return;
    }

    if (summs === '_' || summs === 'Error') {
      setSumms(value.toString());
    } else {
      setSumms((prev) => prev + value);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <h2>Calculator</h2>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.displayContainer}>
          <h1 className={summs === '' || summs === '_' ? styles.blinking : ''}>
            {summs || '_'}
          </h1>
        </div>
        {/* Displayed value */}
        <div className={styles.buttonContainer}>
          {/* Left Buttons/Number Buttons */}
          <div className={styles.numbers}>
            {[
              'C',
              '±',
              '%',
              '7',
              '8',
              '9',
              '4',
              '5',
              '6',
              '1',
              '2',
              '3',
              '0',
              '.',
            ].map((val) => (
              <button
                key={val}
                className={`${styles.button} ${
                  val === '0' ? styles.zeroButton : ''
                }`}
                onClick={() => handleButtonClick(val)}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Operators */}
          <div className={styles.operators}>
            {['÷', 'x', '-', '+', '='].map((operator) => (
              <button
                key={operator}
                className={styles.button}
                onClick={() => handleButtonClick(operator)}
              >
                {operator}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
