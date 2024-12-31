
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './FeaturedBook.css';

/**
 * FeaturedBook Component - Displays details of a specific book.
 * This component fetches book information from the Google Books API
 * based on the book ID retrieved from the URL parameters.
 *
 * @returns {JSX.Element} The rendered component.
 */
const FeaturedBook = () => {
    const { id } = useParams(); // Get the book ID from the URL parameters
    const [book, setBook] = useState(null); // State to store book information
    const apiKey = 'AIzaSyCWMKoPj4vLH_FSAMA8jQhwDQJ1FiMG-Ao';

    /**
     * useEffect Hook - Fetches the book details when the component mounts
     * or when the book ID changes.
     */
    useEffect(() => {
        /**
         * Fetches book details from the Google Books API.
         * Updates the component's state with the fetched book information.
         * Logs an error if the fetch fails.
         */
        const fetchBook = async () => {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
                );

                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch book');
                }

                const data = await response.json();
                setBook(data.volumeInfo); // Update state with book information
            } catch (error) {
                console.error('Error fetching book:', error); // Log any errors
            }
        };

        fetchBook(); // Invoke the function to fetch book details
    }, [id, apiKey]); // Dependencies: id and apiKey

    /**
     * Truncates the description text for display.
     * Strips HTML tags and limits the number of words to 60.
     *
     * @param {string} description - The full description of the book.
     * @returns {string} The truncated description or an empty string if no description is provided.
     */
    const truncateDescription = (description) => {
        if (!description) return ''; // Return empty string if no description is provided

        // Remove HTML tags using regex and split into words
        const plainTextDescription = description.replace(/<\/?[^>]+(>|$)/g, '');
        const words = plainTextDescription.split(' ');

        // Return truncated description if more than 60 words
        return words.length > 60 ? `${words.slice(0, 60).join(' ')}...` : plainTextDescription;
    };

    return (
        <div className="featured-book-page">
            {book ? (
                <div className='content-wrapper'>
                    <div className="book-image-container">
                        <img className="book-cover" src={book.imageLinks?.thumbnail} alt={book.title} />
                    </div>
                    <div className="book-details">
                        <h1 className="book-title">{book.title}</h1>
                        <p className="description">{truncateDescription(book.description)}</p>
                        <p><strong>Authors:</strong> {book.authors?.join(', ')}</p>
                        <p><strong>Published Date:</strong> {book.publishedDate}</p>
                        <p><strong>Page Count:</strong> {book.pageCount}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p> // Show loading message while fetching data
            )}
        </div>
    );
};

export default FeaturedBook;
