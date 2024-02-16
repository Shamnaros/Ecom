import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Favorites from './favorite';
import Forms from './form';
import Home from './home';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/add" element={<Forms />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
