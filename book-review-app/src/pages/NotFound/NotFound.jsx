
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

/**
 * NotFound Component - Displays a 404 page when the requested page is not found.
 * It also provides a button to navigate back to the previous page.
 *
 * @returns {JSX.Element} The JSX element representing the 404 page.
 */
const NotFound = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate between routes

    /**
     * Handles the click event for the "Go Back" button.
     * Navigates to the previous page in the browser history.
     */
    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="notfound-container">
            <h2>404 - Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <button className="go-back-button" onClick={handleGoBack}>
                Go Back
            </button>
        </div>
    );
};

export default NotFound;
