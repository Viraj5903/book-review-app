import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './BookDetail.css';
import { BookReviewAPIURL } from '../../constant';

/**
 * The `BookDetail` component fetches and displays detailed information about a specific book review.
 * It retrieves the book data based on the `id` provided in the URL parameters.
 * If the book is not found, it redirects the user to the NotFound page.
 * 
 * @component
 */
const BookDetail = () => {
    const { id } = useParams(); // Extract the book ID from the URL parameters.
    const [book, setBook] = useState(null); // State to hold the detailed book information.
    const [loading, setLoading] = useState(true); // State to indicate if data is loading.
    const [error, setError] = useState(null); // State to store error messages.
    const navigate = useNavigate(); // Hook to programmatically navigate to a different route.

    /**
     * useEffect hook that runs when the component mounts or when the `id` in the URL changes.
     * Fetches the book details from the backend API based on the provided book ID.
     * Maps the response data to the component's state variables.
     * 
     * @returns {void}
     */
    useEffect(() => {
        const fetchBookDetails = async () => {
            setLoading(true); // Set loading to true when the fetch starts.
            setError(null); // Clear any previous errors before starting the fetch.

            try {
                // Fetch the book review data from the backend API.
                const response = await fetch(`${BookReviewAPIURL}${id}`);

                // If the fetch request fails, throw an error.
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }

                // For debugging purposes, log the response.
                // console.log('Response:', response);

                if (response.status === 404) {
                    // If the book is not found, redirect the user to the NotFound page.
                    navigate('/not-found');
                    return;
                }

                // Parse the response JSON.
                const data = await response.json();

                // If no data is found (i.e., book not found), redirect to /not-found.
                if (!data) {
                    navigate('/not-found'); // Redirect to /not-found page.
                    return;
                }

                // If the image is available in base64 format, prepare the image URL.
                const imageUrl = data.imageBase64 ? `data:${data.imageMimeType};base64,${data.imageBase64}` : null;

                // Set the book details into the component's state.
                setBook({
                    title: data.title,
                    author: data.author,
                    rating: data.rating,
                    readDate: data.readDate,
                    review: data.review,
                    image: imageUrl, // Store the image URL in base64 format if available.
                });
            } catch (error) {
                // Log any errors that occur during the fetch process.
                console.error('Error fetching book details:', error);
                setError('There was an error loading the book details. Please try again later.'); // Set the error message.
            } finally {
                setLoading(false); // Set loading to false once the fetch is complete.
            }
        };

        fetchBookDetails(); // Call the function to fetch the book details.
    }, [id, navigate]); // The effect depends on the `id` parameter, so it re-runs when `id` changes.

    /**
     * Renders the star rating for the book based on the `rating` value.
     * This function creates five stars, filling them based on the given rating.
     * 
     * @param {number} rating - The rating value (1 to 5) of the book.
     * @returns {JSX.Element[]} - An array of JSX elements representing the filled or empty stars.
     */
    const renderStars = (rating) => {
        const totalStars = 5; // The total number of stars to display.
        const stars = [];

        // Loop through the total number of stars and create filled or empty stars based on the rating.
        for (let i = 1; i <= totalStars; i++) {
            if (i <= rating) {
                // If the star index is less than or equal to the rating, display a filled star.
                stars.push(<span key={i} className="star filled">★</span>);
            } else {
                // If the star index is greater than the rating, display an empty star.
                stars.push(<span key={i} className="star empty">☆</span>);
            }
        }

        // Return the array of stars to be rendered.
        return stars;
    };

    // If the book details are still loading, show a loading message.
    if (loading) {
        return <p className='book-detail-loading-message'>Loading book details...</p>;
    }

    // If there is an error, display the error message.
    if (error) {
        return <p className="book-detail-error-message">{error}</p>;
    }

    return (
        <div className="book-detail-page">
            <h1 className="book-detail-title">Book Detail</h1>
            <div className="book-detail-container">
                <div className="book-image-btn">
                    {/* Display the book image if available. If not, use a default placeholder image. */}
                    {book.image ? (
                        <img className="book-image" src={book.image} alt={book.title} />
                    ) : (
                        <img className="book-image" src="/default-book-placeholder.png" alt="Default Book Cover" />
                    )}
                </div>
                <div className="book-details">
                    {/* Display book details such as title, author, read date, rating, and review */}
                    <h2 className="book-name">{book.title}</h2>
                    <p className="book-author">Author: {book.author}</p>
                    <p className="read-date-text">Read Date: {book.readDate}</p>
                    <p className="rating">
                        Your Given Rating:
                        <span>{renderStars(book.rating)}</span> {/* Render the star rating */}
                    </p>
                    <div className="review-text">
                        <p className="review">My take on the book:</p>
                        <div className="review-text">
                            <p className="review-title">{book.review}</p>
                        </div>
                    </div>

                    <div className="buttons-details">
                        <button className="back-to-list-button" onClick={() => navigate('/display-books')}>Back To List</button>
                        <button className="edit-button" onClick={() => navigate(`/edit-book/${id}`)}>Edit Review</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
