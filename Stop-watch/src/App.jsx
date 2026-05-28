
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const[count, setCount] = useState(0)
  const[running, setRunning] = useState(false)
  
  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [running]);
  return (
    <>
      <div className=" m-0 p-0">
        <h1 className="fs-1 fw-bolder text-center p-4 bg-primary text-white font-bold">Stopwatch</h1>
        <div className="d-flex justify-content-center">
        <p className=" text-center bg-secondary d-inline-block mx-auto   fs-2 p-4 rounded-lg" >{count} </p>
        </div>
        <div className="d-flex gap-3 justify-content-center mt-4">
        <button className="bg-warning fs-4 hover:bg-success text-white font-bold py-2 px-4 rounded" onClick={() => setRunning(!running)}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button className="bg-warning fs-4 hover:bg-success text-white font-bold py-2 px-4 rounded ml-2" onClick={() => {setCount(0); setRunning(false)}}>
          Reset
        </button>
        </div>
      </div>
    </>
  )
}

export default App
