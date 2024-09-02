import * as React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Nav from "./components/Nav";
import Login from "./Login";
import Gallery from "./Gallery";
import './App.css'

function App() {

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/gallery' element={<Gallery />} />
      </Routes>
    </Router>
  )
}

export default App
