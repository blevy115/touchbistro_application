import React, {useState, useEffect} from 'react';
import connect from './axios/connect';
import './App.css';

const App = () =>  {
  const mathAPI = async () => {
      try {
        const response = await connect.get('/testAPI')
        setPhrase(response.data);
      } catch (err) {
        setPhrase('something went wrong');
      }
    }

  const [phrase, setPhrase] = useState('');
  useEffect(() => {
    mathAPI();
    setPhrase('hello World')
  }, [])


  return (
    <div className="App">
      <p>{phrase}</p>
    </div>
  );
}

export default App;
