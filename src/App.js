import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';


function App() {
  const numSCORES = 10;
  const [scores, setScores] = useState(Array(numSCORES * 2 + 1).fill());

  const setcell = (i, v) => setScores([...scores.slice(0, i), v, ...scores.splice(i + 1)]);
  const reset = () => setScores(Array(numSCORES * 2 + 1).fill());
  const title = "bowling counter!";

  const total = scores.map((v, i, arr) => {
    if (v == "x") return 10 + (~~arr[i + 1] || 0) + (~~arr[i + 2] || 0);
    if (v == "/") return 10 + (~~arr[i + 1] || 0);
    return ~~v;
  }).reduce((a, b) => a + b, 0)
  return (
    <div className="App">
      <h1> {title} </h1>
      <button onClick={reset} > reset </button><br /><br></br>
      <table>
        <tr>
          {scores.filter((_, i) => i < numSCORES).map((_, i) => <td> {i + 1} </td>)}
          <td>total</td>
        </tr>
        <tr>
          {scores.filter((_, i) => i < numSCORES).map((s, i) => {

            return (<td>
              <input value={scores[i * 2] ?? ""} onChange={e => setcell(i * 2, e.target.value)} />
              <input value={scores[i * 2 + 1] ?? ""} onChange={e => setcell(i * 2 + 1, e.target.value)} />
              {i == numSCORES - 1 ? <input value={scores[i * 2 + 2] ?? ""} onChange={e => setcell(i * 2 + 2, e.target.value)} /> : null}
            </td>)
          })}
          <td>{total}</td>
        </tr>
      </table>

      <p>
        how to score! </p>
      <p> strike: "X" : 10 + sum of the next two scores </p>
      <p> spare: "/" : 10 + the next score </p>
      <p> open frame: "0-9" : value of each shot </p>
      <p> 10th frame: if you roll a strike in the first shot you get 2 more shots, if you roll a spare you get 1 more shot, if you leave the 10th frame open after the 2 shots, you dont get any more shots
</p>

    </div>
  );
}


export default App
