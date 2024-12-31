import './TopPickBookItem.css';

/**
 * Represents a single book item in the Top Picks section. This component displays
 * the book's cover image, title, and author(s). It also triggers an `onClick` event
 * when the book is clicked.
 * 
 * @param {Object} props - The properties passed to this component.
 * @param {Object} props.book - The book object containing details such as title, authors, and image links.
 * @param {Function} props.onClick - The function to call when the book item is clicked.
 * 
 * @returns {JSX.Element} The rendered TopPickBookItem component.
 */
const TopPickBookItem = ({ book, onClick }) => {
    // Determine the image URL by checking different possible image sizes (extraLarge, large, medium, thumbnail).
    const imageUrl =
        book.volumeInfo.imageLinks?.extraLarge ||
        book.volumeInfo.imageLinks?.large ||
        book.volumeInfo.imageLinks?.medium ||
        book.volumeInfo.imageLinks?.thumbnail;

    return (
        <div className="book-item" onClick={onClick}>
            {/* Render the book cover image */}
            <img className="book-cover" src={imageUrl} alt={book.volumeInfo.title} />
            {/* Render the book title */}
            <h3 className="book-title">{book.volumeInfo.title}</h3>
            {/* Render the book authors, if available */}
            <p className="book-author">{book.volumeInfo.authors?.join(', ')}</p>
        </div>
    );
};

export default TopPickBookItem;
