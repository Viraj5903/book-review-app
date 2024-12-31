import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddBook from './pages/AddBook/AddBook';
import BookDetail from './pages/BookDetail/BookDetail';
import HomePage from './pages/HomePage/HomePage';
import NotFound from './pages/NotFound/NotFound';
import Navbar from './components/Navbar/Navbar';
import DisplayBooks from './pages/DisplayBooks/DisplayBooks';
import AboutUs from './pages/AboutUs/AboutUs';
import FeaturedBook from './pages/FeaturedBook/FeaturedBook';
import EditBook from './pages/EditBook/EditBook';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <main className='main'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/display-books" element={<DisplayBooks />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/featured-book/:id" element={<FeaturedBook />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

