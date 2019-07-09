import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import About from './screens/About';
import Nav from './components/Nav';

function App() {
  return (
    <Router>
      <>
        <Nav key="3" />
        <Route key="0" exact path='/' component={Home} />
        <Route key="1" exact path='/dont-click-me-twice-react' component={Home} />
        <Route key="2" exact path='/dont-click-me-twice-react/About' component={About} />
      </>
    </Router>
  );
}

export default App;
