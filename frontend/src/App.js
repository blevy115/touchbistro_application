import React, {useState, useEffect} from 'react';
import connect from './axios/connect';
import './App.css';

function App(props) {
  const mathAPI = async (number) => {
      try {
        if (number > 100000000) {
          setPhrase('Number too large, try a smaller number');
          return;
        };
        if (number > 1000000) setPhrase("Calculating...");
        const response = await connect.get('/findMedianPrime', {
          params: {
            number
          }
        });
        if (response.data.error) {
          setPhrase(response.data.error);
          setResult('');
        } else {
          setResult(response.data.result);
          setPhrase("There's the Median Prime, Enter another number to try again.");
        };
      } catch (err) {
        setPhrase('Something went wrong');
      };
    };

  const [phrase, setPhrase] = useState('');
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    setPhrase('Welcome, Please Enter a number, we will find the Median Prime Number less than it.')
  }, []);

  return (
    <div className="App">
      <p aria-label="phrase">{phrase}</p>
      <form onSubmit={(event) => {
        event.preventDefault()
        mathAPI(number);
      }}>
        <input
          placeholder="Enter Number"
          type="number"
          name="number"
          aria-label="number"
          value={number}
          autoComplete="off"
          onChange={inputField=> setNumber(inputField.target.value)}
        />
        <button
          type="submit"
          name="submit"
          aria-label="submit"
          disabled={!number || phrase === 'Calculating...'}
        >Find My Prime</button>
      </form>
      { result ? <p id="result" aria-label="result">Result: {result}</p> : null }
    </div>
  );
};

export default App;
