namespace BookReviewsAPI.Models
{
    /// <summary>
    /// Represents the view model for a book review. This model is used to structure the data that is returned 
    /// to the client via the API. It includes book information, review details, and image data (if available).
    /// </summary>
    public class BookReviewViewModel
    {
        /// <summary>
        /// Gets or sets the unique identifier for the book review.
        /// This ID is used to identify the review in the system.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the title of the book being reviewed.
        /// The title is required and should not be null.
        /// </summary>
        public string Title { get; set; } = null!;

        /// <summary>
        /// Gets or sets the name of the author of the book.
        /// The author's name is required and should not be null.
        /// </summary>
        public string Author { get; set; } = null!;

        /// <summary>
        /// Gets or sets the rating given to the book by the reviewer.
        /// This value is an integer between 1 and 5, where 1 is the lowest rating and 5 is the highest.
        /// </summary>
        public int Rating { get; set; }

        /// <summary>
        /// Gets or sets the base64-encoded image of the book review.
        /// If an image is associated with the review, it will be converted to a base64 string for easy transmission to the client.
        /// If no image is provided, this property will be null.
        /// </summary>
        public string? ImageBase64 { get; set; }  // For base64-encoded image

        /// <summary>
        /// Gets or sets the MIME type of the image associated with the book review.
        /// This property holds the content type of the image (e.g., "image/jpeg", "image/png").
        /// If no image is provided, this property will be null.
        /// </summary>
        public string? ImageMimeType { get; set; }  // Optional MIME type for the image

        /// <summary>
        /// Gets or sets the date the book was read by the reviewer.
        /// This is the date on which the reviewer completed reading the book.
        /// </summary>
        public DateOnly ReadDate { get; set; }

        /// <summary>
        /// Gets or sets the text of the review provided by the reviewer.
        /// This is a required field and holds the reviewer's thoughts, opinions, and feedback on the book.
        /// </summary>
        public string Review { get; set; } = null!;
    }
}
