using System.ComponentModel.DataAnnotations;

namespace BookReviewsAPI.Models
{
    /// <summary>
    /// Represents a book review entity in the system. This class is used to store information about a book 
    /// such as its title, author, rating, review content, and other relevant details.
    /// </summary>
    public class BookReview
    {
        [Key]
        /// <summary>
        /// Gets or sets the unique identifier for the book review.
        /// This is typically auto-incremented by the database.
        /// </summary>
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required.")]
        /// <summary>
        /// Gets or sets the title of the book being reviewed.
        /// The title is required and cannot be null or empty.
        /// </summary>
        public string Title { get; set; } = null!;

        [Required(ErrorMessage = "Author is required.")]
        /// <summary>
        /// Gets or sets the name of the author of the book.
        /// The author's name is required and cannot be null or empty.
        /// </summary>
        public string Author { get; set; } = null!;

        [Required(ErrorMessage = "Rating is required.")]
        [Range(1, 5)]
        /// <summary>
        /// Gets or sets the rating given to the book by the reviewer.
        /// The rating is an integer value, typically from 1 to 5, where 1 is the lowest and 5 is the highest.
        /// </summary>
        public int Rating { get; set; }

        /// <summary>
        /// Gets or sets the image associated with the book review.
        /// This property is optional and can be null if no image is provided.
        /// The image is stored as a byte array, which can represent various image formats like PNG or JPEG.
        /// </summary>
        public byte[]? Image { get; set; }

        [Required(ErrorMessage = "ReadDate is required.")]
        /// <summary>
        /// Gets or sets the date when the book was read by the reviewer.
        /// This property stores the date the review was written, and it cannot be null.
        /// </summary>
        public DateOnly ReadDate { get; set; }

        [Required(ErrorMessage = "Review is required.")]
        /// <summary>
        /// Gets or sets the review text written by the reviewer about the book.
        /// The review is required and cannot be null or empty.
        /// This property holds the reviewer's opinion and analysis of the book.
        /// </summary>
        public string Review { get; set; } = null!;
    }
}