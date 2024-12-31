import "./EditBook.css";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../../components/BookForm/BookForm";
import { useEffect, useState } from "react";
import { BookReviewAPIURL } from "../../constant";
import HeroSection from "../../components/HeroSection/HeroSection";

/**
 * EditBook component for editing an existing book's review.
 * Fetches the book data based on the provided bookId, and renders a form 
 * to update the book details. Displays a success or error message based 
 * on the result of the submission.
 * 
 * @returns {JSX.Element} The EditBook component.
 */
const EditBook = () => {
    // Retrieve the bookId from the URL parameters
    const { id } = useParams();

    // State variables for managing book data, loading state, error, and status messages
    const [bookData, setBookData] = useState(null); // Stores fetched book data
    const [statusMessage, setStatusMessage] = useState(''); // Stores the status message (e.g., success/error)
    const [loading, setLoading] = useState(true); // Manages loading state
    const [error, setError] = useState(null); // Stores error messages if fetching fails

    const navigate = useNavigate(); // Hook for navigation after successful edit

    /**
     * Fetches the book details from the API when the component is mounted or 
     * when the bookId changes.
     */
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                // Fetch book details using the bookId from the API
                const response = await fetch(`${BookReviewAPIURL}${id}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch book data');
                }

                // Parse the JSON response and update the state
                const data = await response.json();
                console.log(data);
                setBookData(data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                setError('Failed to load book data. Please try again later.');
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchBookData();
    }, [id]); // Dependency array ensures this runs when bookId changes

    /**
     * Handles the form submission for editing a book's review.
     * Sends the updated data to the server and shows a status message.
     * 
     * @param {FormData} formData - The form data submitted by the user.
     */
    const handleEditBook = async (formData) => {
        try {

            console.log(formData);

            // Send the PUT request to update the book details
            const response = await fetch(`${BookReviewAPIURL}${id}`, {
                method: 'PUT',
                body: formData, // Pass the form data in the request body
            });

            if (response.ok) {
                alert('Book review updated successfully!');
                // On success, show a success message
                setStatusMessage('Book review updated successfully!');

                // Redirect to the list page after successful update
                setTimeout(() => {
                    navigate('/display-books'); // Redirect to the books list page
                }, 3000); // Delay the redirect to show the success message
            } else {

                response.json().then((data) => {
                    console.log(data);
                }).catch((error) => {
                    console.log(error);
                });

                // On failure, show an error message
                setStatusMessage('Failed to update book review. Please try again.');
            }
        } catch (error) {
            setStatusMessage('An error occurred. Please try again later.');
        }
    };

    // Display loading message while fetching book data
    if (loading) {
        return <p className='book-edit-loading-message'>Loading book details...</p>;
    }

    // If there's an error fetching the book data, show the error message
    if (error) {
        return <p className="book-edit-error-message">{error}</p>;
    }

    return (
        <div>

            {/* Hero section to display the page title */}
            <HeroSection heroText="Edit Book" />

            <BookForm
                isEdit={true} // Flag to indicate this is an edit form
                buttonText="Update Book Review" // Button text for updating the book review
                bookData={bookData} // Pre-fill form with the existing book data
                onSubmit={handleEditBook} // Function to handle form submission
                statusMessage={statusMessage} // Display status message (success/error)
                onStatusChange={setStatusMessage} // Update the status message
            />
        </div>
    );
};

export default EditBook;
