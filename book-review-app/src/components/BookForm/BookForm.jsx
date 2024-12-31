import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './BookForm.css';

/**
 * BookForm component for adding or editing a book.
 * The form includes fields for title, author, rating, read date, review, and an optional image.
 * It validates inputs and submits the form data when valid.
 * 
 * @param {Object} props - The properties passed to this component.
 * @param {Object} [props.bookData] - Data to prepopulate the form for editing an existing book.
 * @param {Function} props.onSubmit - Function to handle form submission.
 * @param {string} props.buttonText - Text for the submit button.
 * @param {boolean} props.isEdit - Flag indicating whether the form is for editing an existing book.
 * @param {string} props.statusMessage - Message to display after form submission.
 * 
 * @returns {JSX.Element} A JSX element representing the book form.
 */
const BookForm = ({ bookData, onSubmit, buttonText, isEdit, statusMessage }) => {

    // State variables for storing form data and validation errors
    const [title, setTitle] = useState('');  // Title of the book
    const [author, setAuthor] = useState('');  // Author of the book
    const [rating, setRating] = useState(1);  // Rating of the book (1 to 5)
    const [readDate, setReadDate] = useState('');  // Initialize as empty string instead of null
    const [review, setReview] = useState('');  // Review text
    const [image, setImage] = useState(null);  // Optional image for the book review
    const [errors, setErrors] = useState({
        titleError: '',
        authorError: '',
        ratingError: '',
        readDateError: '',
        reviewError: '',
        imageError: ''
    });  // Object to store validation error messages

    // Hook to initialize the form with book data (for editing an existing book)
    const navigate = useNavigate();  // To navigate to another page (back to list)

    // Effect hook to prepopulate the form with existing book data (if editing)
    useEffect(() => {
        if (bookData) {
            setTitle(bookData.title || '');  // Populate title field from bookData
            setAuthor(bookData.author || '');  // Populate author field from bookData
            setRating(bookData.rating || 1);  // Populate rating field from bookData
            setReadDate(bookData.readDate || '');  // Populate readDate from bookData
            setReview(bookData.review || '');  // Populate review from bookData
            setImage(bookData.image || null);  // Populate image (if any)
        }
    }, [bookData]);  // Re-run this effect when bookData changes (for editing an existing book)

    // Validation functions for each field in the form
    /**
     * Validates the title field. Ensures that the title is not empty.
     * 
     * @param {string} title - The title of the book.
     * @returns {boolean} - Returns true if valid, false if invalid.
     */
    const validateTitle = (title) => {
        if (title.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, titleError: 'Title is required.' }));
            return false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, titleError: '' }));
            return true;
        }
    };

    /**
     * Validates the author field. Ensures that the author's name only contains letters and spaces.
     * 
     * @param {string} author - The name of the author.
     * @returns {boolean} - Returns true if valid, false if invalid.
     */
    const validateAuthor = (author) => {
        const authorRegex = /^[A-Za-z\s]+$/;  // Regular expression for alphabetic characters only

        if (author.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, authorError: 'Author name is required.' }));
            return false;
        } else if (!authorRegex.test(author)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                authorError: 'Author name should contain only alphabetic characters.'
            }));
            return false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, authorError: '' }));
            return true;
        }
    };

    /**
     * Validates the rating field. Ensures that the rating is between 1 and 5.
     * 
     * @param {number} rating - The rating for the book (1 to 5).
     * @returns {boolean} - Returns true if valid, false if invalid.
     */
    const validateRating = (rating) => {
        if (rating < 1 || rating > 5) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ratingError: 'Rating must be between 1 and 5.'
            }));
            return false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, ratingError: '' }));
            return true;
        }
    };

    /**
     * Validates the read date field. Ensures that the read date is not in the future.
     * 
     * @param {string} date - The date when the book was read.
     * @returns {boolean} - Returns true if valid, false if invalid.
     */
    const validateReadDate = (date) => {
        const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format

        if (!date) {
            setErrors((prevErrors) => ({ ...prevErrors, readDateError: 'Read date is required.' }));
            return false;
        } else if (date > today) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                readDateError: 'Read date cannot be in the future.'
            }));
            return false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, readDateError: '' }));
            return true;
        }
    };

    /**
     * Validates the review text. Ensures that the review is not empty.
     * 
     * @param {string} review - The review text.
     * @returns {boolean} - Returns true if valid, false if invalid.
     */
    const validateReview = (review) => {
        if (review.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, reviewError: 'Review is required.' }));
            return false;
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, reviewError: '' }));
            return true;
        }
    };

    /**
     * Handles the image file input. Validates the image size and stores the selected image file.
     * 
     * @param {Event} e - The file input change event.
     */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {  // Validate image size (max 5MB)
            setImage(file);  // Store the selected image file
            setErrors((prevErrors) => ({ ...prevErrors, imageError: '' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, imageError: 'Image size must be less than 5MB.' }));
        }
    };

    /**
     * Handles form submission. Validates the form fields, creates a FormData object with the form data,
     * and sends it to the backend (via POST or PUT depending on Add or Edit mode).
     * If the submission is successful, the form is reset for adding a new book, and a success message is shown.
     * If any errors occur during the process, they are logged to the console.
     * 
     * @param {Event} e - The form submit event.
     */
    const handleSubmit = async (e) => {

        // Prevent the default form submission
        e.preventDefault();

        // Validate the form fields
        const isValid =
            validateTitle(title) &&
            validateAuthor(author) &&
            validateRating(rating) &&
            validateReadDate(readDate) &&
            validateReview(review);

        if (!isValid) return;  // If the form is invalid, don't proceed with submission

        // Create a FormData object to send both text fields and the optional image as multipart/form-data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('rating', rating);
        formData.append('readDate', readDate);
        formData.append('review', review);
        if (image) formData.append('image', image);  // Append the image file if provided

        try {
            // Call the onSubmit function (this can be POST or PUT depending on Add or Edit)
            onSubmit(formData);

            // Reset the form fields
            if (!isEdit) {
                setTitle('');  // Reset title field
                setAuthor('');  // Reset author field
                setRating(1);  // Reset rating field
                setReadDate('');  // Reset read date field
                setReview('');  // Reset review field
                setImage(null);  // Reset image field
            }
        } catch (error) {
            console.error('Book FormError:', error);  // Log any errors that occur during submission
        }
    }

    return (
        <div className="book-form-container">

            {/* Conditionally render the status message */}
            {statusMessage && <p className="status-message">{statusMessage}</p>}

            <form className="book-form" onSubmit={handleSubmit}>
                {/* Input for book title */}
                <div className="input-field">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            validateTitle(e.target.value);
                        }}
                        onBlur={() => validateTitle(title)}
                        required
                    />
                </div>
                {errors.titleError && <p className="validation-error-message">{errors.titleError}</p>}

                {/* Input for author */}
                <div className="input-field">
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={(e) => {
                            setAuthor(e.target.value);
                            validateAuthor(e.target.value);
                        }}
                        onBlur={() => validateAuthor(author)}
                        required
                    />
                </div>
                {errors.authorError && <p className="validation-error-message">{errors.authorError}</p>}

                {/* Input for rating */}
                <div className="input-field">
                    <label>Rating (1-5):</label>
                    <input
                        type="number"
                        name="rating"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => {
                            setRating(e.target.value);
                            validateRating(e.target.value);
                        }}
                        onBlur={() => validateRating(rating)}
                        required
                    />
                </div>
                {errors.ratingError && <p className="validation-error-message">{errors.ratingError}</p>}

                {/* Input for read date */}
                <div className="input-field">
                    <label>Read Date:</label>
                    <input
                        type="date"
                        name="read-date"
                        max={new Date().toISOString().split('T')[0]} // Set max date to today
                        value={readDate}
                        onChange={(e) => {
                            setReadDate(e.target.value);
                            validateReadDate(e.target.value);
                        }}
                        onBlur={() => validateReadDate(readDate)}
                        required
                    />
                </div>
                {errors.readDateError && <p className="validation-error-message">{errors.readDateError}</p>}

                {/* Input for review */}
                <div className="review-textarea">
                    <label>Review:</label>
                    <textarea
                        name="review"
                        value={review}
                        rows={3}
                        onChange={(e) => {
                            setReview(e.target.value);
                            validateReview(e.target.value);
                        }}
                        onBlur={() => validateReview(review)}
                        required
                    ></textarea>
                </div>
                {errors.reviewError && <p className="validation-error-message">{errors.reviewError}</p>}

                {/* File input for optional image */}
                <div className="input-image">
                    <label>Upload Image (Optional):</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                {errors.imageError && <p className="validation-error-message">{errors.imageError}</p>}

                <div className="buttons-container">
                    {/* Submit button */}
                    <button className="submit-btn" type="submit">{buttonText}</button>

                    {/* Back */}
                    <button className="back-btn" onClick={() => navigate('/display-books')}>Back To List</button>
                </div>
            </form>
        </div>
    );
}

export default BookForm;