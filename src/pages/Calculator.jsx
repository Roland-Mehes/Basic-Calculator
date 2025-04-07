import React, { useState, useRef, useEffect } from 'react';
import styles from './calculator.module.css';

const Calculator = () => {
  const [summs, setSumms] = useState('');
  const displayRef = useRef(null);

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollLeft = displayRef.current.scrollWidth;
    }
  }, [summs]);

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setSumms('_');
      return;
    }

    const operators = ['+', 'x', '÷', '%', '-', '*', '/'];
    const lastChar = summs.trim().slice(-1);

    // Ignore if the input ends with an operator
    if (
      operators.includes(lastChar) &&
      operators.includes(value) &&
      value !== '±'
    )
      return;

    if (value === '±') {
      let parts = summs.trim().split(' ');
      let lastPart = parts[parts.length - 1];

      if (!isNaN(lastPart) || /^\(-\d+(\.\d+)?\)$/.test(lastPart)) {
        if (lastPart.startsWith('(-') && lastPart.endsWith(')')) {
          //If the number negative take down the (- )
          parts[parts.length - 1] = lastPart.slice(2, -1); // e.g. "(-5)" -> "5"
        } else {
          // IF the number is positive add (- )
          parts[parts.length - 1] = `(-${lastPart})`;
        }
        setSumms(parts.join(' '));
      }

      return;
    }

    // Handle other button presses (numbers and operators)
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
        setSumms(eval(summs.replace(/x/g, '*').replace(/÷/g, '/')).toString());
      } catch {
        setSumms('Error');
      }
      return;
    }

    // Add number or other operator to summs
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
        <div className={styles.displayContainer} ref={displayRef}>
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
