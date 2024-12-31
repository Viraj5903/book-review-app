import React, { useState } from 'react';
import './AddBook.css';
import HeroSection from '../../components/HeroSection/HeroSection';
import { BookReviewAPIURL } from '../../constant';
import BookForm from '../../components/BookForm/BookForm';

/**
 * AddBook Component:
 * This component allows users to add a new book review by providing details such as title, author,
 * rating, read date, review text, and an optional image.
 * It validates the form inputs, handles form submission via POST request to the backend, 
 * and provides user feedback about the status of the submission.
 */
const AddBook = () => {
    // State variable to store the status message for user feedback (e.g., success or error message).
    const [statusMessage, setStatusMessage] = useState('');

    /**
     * Handles the form submission.
     * Sends the form data as a POST request to the backend API.
     * On success, it displays a success message, otherwise, an error message.
     *
     * @param {FormData} formData - The form data to be submitted.
     */
    const handleAddBook = async (formData) => {
        try {
            // Make a POST request to the backend API with the form data (multipart/form-data).
            const response = await fetch(BookReviewAPIURL, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // On success, display a success message.
                setStatusMessage('Book review added successfully!');
            } else {
                // On failure, show an error message.
                setStatusMessage('Failed to add book review. Please try again.');
            }
        } catch (error) {
            // If an error occurs, display a generic error message.
            console.error('Add Book Error:', error);
            setStatusMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="add-book-page">
            {/* Hero section to display the page title */}
            <HeroSection heroText="Add Book" />

            {/* BookForm component with props */}
            <BookForm
                isEdit={false}  // Indicates that this is not an edit, it's for adding a new book.
                onSubmit={handleAddBook}  // Pass the handleAddBook function to be called on form submit.
                buttonText={'Add Book'}  // Text for the submit button.
                statusMessage={statusMessage}  // Pass the status message to be displayed.
            />
        </div>
    );
};

export default AddBook;
