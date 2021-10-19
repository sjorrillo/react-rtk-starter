import React from 'react';
import logo from '../assets/img/logo.svg';
import { Counter } from '../features/counter/Counter';
import './app.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img alt="logo" className="App-logo" src={logo} />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            rel="noopener noreferrer"
            target="_blank"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            rel="noopener noreferrer"
            target="_blank"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
