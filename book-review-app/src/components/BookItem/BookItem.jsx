import { useState } from 'react';
import { BookReviewAPIURL } from '../../constant';
import './BookItem.css';
import { useNavigate } from 'react-router-dom';

/**
 * BookItem component represents an individual book review with its title, author, image, and the option to delete it.
 * It allows navigation to the book's detailed page and provides a button for deleting the review.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.book - The book object containing details like title, author, image, etc.
 * @param {Function} props.setBooks - The function used to update the list of books in the parent component.
 */
const BookItem = ({ book, setBooks }) => {
    // Hook to navigate to different routes (book details page)
    const navigate = useNavigate();

    // State to control modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * Handles the delete functionality for a book review.
     * Sends a DELETE request to the backend API and removes the book from the UI on success.
     */
    const handleDelete = async () => {
        try {
            // Make a DELETE request to the API to remove the book review
            const response = await fetch(BookReviewAPIURL + book.id, {
                method: 'DELETE',  // HTTP method for deletion
                headers: {
                    'Content-Type': 'application/json',  // Set the request content type to JSON
                },
            });

            // Check if the response was successful
            if (!response.ok) {
                throw new Error('Failed to delete book');  // Error handling if delete request fails
            }

            // Remove the deleted book from the list in the parent component's state
            setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));

            // Log success message
            console.log('Book deleted successfully');
        } catch (error) {
            // Log any errors during deletion
            console.error('Error deleting book:', error);
            alert('Failed to delete book');  // Alert user of the failure
        } finally {
            setIsModalOpen(false); // Close the modal after the action
        }
    };

    return (
        <div key={book.id} className="book-item">
            {/* Clicking the book item navigates to the book's detailed page */}
            <div onClick={() => navigate(`/books/${book.id}`)} className="book-container">
                {/* If an image is available, display it as base64-encoded; otherwise, show a placeholder */}
                {book.imageBase64 ? (
                    <img
                        src={`data:${book.imageMimeType};base64,${book.imageBase64}`}
                        alt={book.title}
                        className="book-cover"
                    />
                ) : (
                    <img src="default-book-placeholder.png" alt="Book placeholder" className="book-cover" /> // Placeholder when no image is available
                )}
                {/* Display the book's title and author */}
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author"><i>{book.author}</i></p>
            </div>


            <div className="book-actions">
                <button className='edit-button' onClick={() => navigate(`/edit-book/${book.id}`)}>Edit</button>
                {/* Button to delete the book review */}
                <button className="delete-button" onClick={() => setIsModalOpen(true)}>Delete Review</button>
            </div>

            {/* Modal for confirmation */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Are you sure you want to delete this review?</p>
                        <div className="modal-actions">
                            <button className="modal-btn confirm" onClick={handleDelete}>Yes, Delete</button>
                            <button className="modal-btn cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookItem;
