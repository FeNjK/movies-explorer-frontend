/* import { useEffect, useState } from "react";
import { useHistory, Route, Switch, Redirect } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.js"; */

import React from 'react'; 
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App; 
