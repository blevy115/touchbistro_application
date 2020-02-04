import React, {useState, useEffect} from 'react';
import connect from './axios/connect';
import './App.css';

function App(props) {
  const mathAPI = async (number) => {
      try {
        if (number > 100000000) {
          setPhrase('Number too large, try a smaller number');
          return;
        }
        if (number > 1000000) setPhrase("Calculating...");
        const response = await connect.get('/findMedianPrime', {
          params: {
            number
          }
        })
        setResult(response.data.result);
        setPhrase("There's the Median Prime, enter another number to try again.");
      } catch (err) {
        setPhrase('Something went wrong');
      }
    }

  const [phrase, setPhrase] = useState('');
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    setPhrase('Welcome, Please Enter a number, we will find the Median Prime Number less than it.')
  }, [])

  return (
    <div className="App">
      <p>{phrase}</p>
      <form onSubmit={(event) => {
        event.preventDefault()
        mathAPI(number)
      }}>
        <input type="number" name="number" value={number} onChange={inputField=> setNumber(inputField.target.value)}/>
        <button tupe="submit">Find My Prime</button>
      </form>
      <p>{result}</p>
    </div>
  );
}

export default App;
