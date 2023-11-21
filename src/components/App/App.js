import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignUpForm from '../SignUpForm/SignUpForm';
import Footer from '../Footer/footer';
import NavigationBar from '../NavigationBar/NavigationBar';
import HomeContent from '../Home/Home';
import './App.css';

function App() {

  return (
    <Router>
      <div className="App">
        <div className="App-header"></div>
        <NavigationBar />
        <Routes>
          <Route path={ROUTES.SIGN_UP} element={<SignUpForm />}></Route>
          <Route path={ROUTES.HOME} element={<HomeContent />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
