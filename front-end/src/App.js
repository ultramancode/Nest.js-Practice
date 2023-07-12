import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./components/page/Signup";
import PostList from "./components/list/PostList";
import LoginPage from "./components/page/LoginPage";
import MainPage from "./components/page/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/signup" element={<Signup/>} />
        <Route path="/auth/signin" element={<LoginPage/>} />
        <Route path="/home" element={<MainPage/>} />
        <Route path="/boards" element={<PostList/>} />
      </Routes>
    </Router>
  );
}

export default App;
