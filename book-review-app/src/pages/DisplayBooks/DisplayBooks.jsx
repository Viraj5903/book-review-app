import React, { useEffect, useState } from 'react';
import './DisplayBooks.css';
import HeroSection from '../../components/HeroSection/HeroSection';
import BookItem from '../../components/BookItem/BookItem';
import { BookReviewAPIURL } from '../../constant';

/**
 * DisplayBooks component fetches the list of books from the API and displays them on the page.
 * If no books are found, it will display a "No books available" message.
 * If there is an error during the fetch, it will display the error message.
 * Each book item is rendered as a separate component and displayed within the books container.
 */
const DisplayBooks = () => {
    const [books, setBooks] = useState([]);  // State to hold the list of books
    const [error, setError] = useState('');  // State to hold any error message during fetch
    const [loading, setLoading] = useState(true);  // State to handle loading status

    useEffect(() => {
        /**
         * Fetches the list of book reviews from the backend API and updates the state.
         * This runs once on component mount.
         */
        const fetchBooksData = async () => {
            try {
                setLoading(true); // Set loading to true before starting the fetch
                const response = await fetch(BookReviewAPIURL); // Correct API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch books data');  // Error handling if response is not OK
                }
                const data = await response.json();  // Parse JSON response
                setBooks(data);  // Update state with the fetched books data
                setError('');  // Clear any previous error if the fetch is successful
            } catch (error) {
                console.error('Error fetching books:', error);  // Log error if fetch fails
                setError('There was an error loading the books. Please try again later.');;  // Set the error message in state
            } finally {
                setLoading(false); // Set loading to false once the fetch is complete (success or failure)
            }
        };

        fetchBooksData();  // Call the fetch function to load the books data when component mounts
    }, []);  // Empty dependency array ensures the effect runs only once on mount


    return (
        <div className="books-page">
            {/* Hero section displaying page title */}
            <HeroSection heroText="Books" />

            {/* Display loading spinner while books data is being fetched */}
            {loading && (
                <div className="loading-message">
                    <div className="spinner"></div>
                    <p>Loading books...</p>
                </div>
            )}

            {/* Display error message if there's any error during fetch */}
            {error && !loading && <div className="error-message">{error}</div>}

            {/* Show "No books available" if the books array is empty and there's no error */}
            {books.length === 0 && !loading && !error ? (
                <div className="no-books-message">No books available</div>
            ) : (
                <div className="books-container">
                    {/* Map through the books array and render each book using BookItem component */}
                    {books.map((book) => (
                        <BookItem key={book.id} book={book} setBooks={setBooks} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DisplayBooks;
