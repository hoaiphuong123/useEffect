import './App.css';
import './components/mycss.css';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [color, setColor] = useState('green');
  const [time, setTime] = useState(0);
  const [data, setData] = useState([]);
  const [stop, setStop] = useState(false);

  const handlerColorStop = () => {
    setColor('red');
    setStop(!stop);
  };

  const handlerColorReset = () => {
    setTime(0);
    setColor('green');
    setStop(stop);
  };
  useEffect(() => {
    const getQues = async () => {
      if (time % 5 === 1) {
        await fetch('https://catfact.ninja/fact')
          .then((res) => res.json())
          .then((data) => {
            setData(data);
          });
      }
    };
    getQues().catch((e) => console.log(e));
  }, [time]);
  console.log(data);

  useEffect(() => {
    if (stop === true) {
      const timerId = setInterval(() => {
        setTime((prevState) => prevState + 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [stop]);

  return (
    <div className="App">
      <h1>Vi du UseEffect() Hook</h1>
      <p>Time :{time}</p>
      <div className="button">
        <button className="spa" type="button" style={{ backgroundColor: color, width: '200px', height: ' 40px' }} onClick={handlerColorStop}>
          Stop
        </button>
      </div>
      <div>
        <button className="spa" type="button" style={{ backgroundColor: '#FFE4E1', width: '200px', height: ' 40px' }} onClick={handlerColorReset}>
          Reset
        </button>
      </div>
      <p>{data.fact}</p>
    </div>
  );
}
