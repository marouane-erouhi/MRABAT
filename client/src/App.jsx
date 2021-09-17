import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.css'
import SchoolForm from './components/SchoolForm/SchoolForm';
import Home from './components/Home/Home';
function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/new-school" component={SchoolForm} />
        <Route exact path="/" component={Home} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  )
}

export default App
