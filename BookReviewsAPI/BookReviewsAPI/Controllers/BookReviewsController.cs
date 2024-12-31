using BookReviewsAPI.Data;
using BookReviewsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookReviewsAPI.Controllers
{
    /// <summary>
    /// Provides endpoints for managing book reviews.
    /// This controller handles CRUD operations for BookReviews: Create, Read, Update, and Delete.
    /// </summary>
    [Route("api/[controller]")]  // Defines the base URL for this controller's endpoints (e.g., /api/bookreviews)
    [ApiController]  // Marks this class as an API controller, which means it will automatically handle model validation and response formatting
    public class BookReviewsController : ControllerBase
    {
        private readonly BookReviewDbContext _context;  // The context used to interact with the database

        /// <summary>
        /// Initializes a new instance of the <see cref="BookReviewsController"/> class.
        /// This constructor injects the BookReviewDbContext to allow interaction with the database.
        /// </summary>
        /// <param name="context">The DbContext instance used to interact with the database.</param>
        public BookReviewsController(BookReviewDbContext context)
        {
            _context = context;  // Initializes the _context field to interact with the database
        }

        /// <summary>
        /// Retrieves all book reviews from the database.
        /// </summary>
        /// <returns>A list of book reviews.</returns>
        [HttpGet]  // Marks this method as a GET request handler for the /api/bookreviews endpoint
        public async Task<ActionResult<IEnumerable<BookReviewViewModel>>> GetBookReviews()
        {
            /*// Asynchronously fetches all book reviews from the database and returns them as a list
            return await _context.BookReviews.ToListAsync();  // ToListAsync converts the result to a List asynchronously*/

            // Fetch all book reviews from the database
            var bookReviews = await _context.BookReviews.ToListAsync();

            // Map the BookReview entities to BookReviewViewModel
            var bookReviewViewModels = bookReviews.Select(br => new BookReviewViewModel
            {
                Id = br.Id,
                Title = br.Title,
                Author = br.Author,
                Rating = br.Rating,
                ReadDate = br.ReadDate,
                Review = br.Review,
                // If an image exists, convert it to a base64 string
                ImageBase64 = br.Image != null ? Convert.ToBase64String(br.Image) : null,
                // Optional: add a MIME type for the image (assuming JPEG here). The ImageMimeType refers to the MIME type (Multipurpose Internet Mail Extensions type) of the image being returned in the response.
                ImageMimeType = br.Image != null ? "image/jpeg" : null
            }).ToList();

            return bookReviewViewModels;  // Return the list of view models
        }

        /// <summary>
        /// Retrieves a specific book review by its ID.
        /// </summary>
        /// <param name="id">The ID of the book review to retrieve.</param>
        /// <returns>The requested book review, or NotFound if it does not exist.</returns>
        [HttpGet("{id}")]  // Marks this method as a GET request handler for the /api/bookreviews/{id} endpoint
        public async Task<ActionResult<BookReviewViewModel>> GetBookReview(int id)
        {
            /*// Asynchronously tries to find a book review by its ID
            var bookReview = await _context.BookReviews.FindAsync(id);  // Uses EF Core's FindAsync method to search for the entity

            // If the book review is not found, return a NotFound response
            if (bookReview == null)
            {
                return NotFound();  // Returns a 404 status code if the book review is not found
            }

            // If the book review is found, return it in the response
            return bookReview;  // Returns the found book review with a 200 OK status code*/

            // Find the book review by its ID
            var bookReview = await _context.BookReviews.FindAsync(id);

            // If the book review is not found, return a NotFound response
            if (bookReview == null)
            {
                return NotFound();  // Return 404 if not found
            }

            // Map the BookReview entity to BookReviewViewModel
            var bookReviewViewModel = new BookReviewViewModel
            {
                Id = bookReview.Id,
                Title = bookReview.Title,
                Author = bookReview.Author,
                Rating = bookReview.Rating,
                ReadDate = bookReview.ReadDate,
                Review = bookReview.Review,
                // Convert the image to base64 if available
                ImageBase64 = bookReview.Image != null ? Convert.ToBase64String(bookReview.Image) : null,
                // The ImageMimeType refers to the MIME type (Multipurpose Internet Mail Extensions type) of the image being returned in the response.
                // Add the MIME type if the image is available
                ImageMimeType = bookReview.Image != null ? "image/jpeg" : null
            };

            return bookReviewViewModel;  // Return the mapped view model
        }

        /// <summary>
        /// Creates a new book review and adds it to the database.
        /// </summary>
        /// <param name="bookReview">The book review object to create. This includes the title, author, rating, review, and read date of the book.</param>
        /// <param name="image">Optional image for the book review, can be null. If provided, the image is stored as a byte array associated with the review.</param>
        /// <returns>
        /// A response indicating the result of the creation operation. On success, it returns a 201 Created status with the created book review and a Location header pointing to the newly created review.
        /// If the model is invalid, it returns a 400 BadRequest response with validation error details.
        /// </returns>
        [HttpPost]  // Marks this method as a POST request handler for the /api/bookreviews endpoint
        public async Task<ActionResult<BookReview>> PostBookReview([FromForm] BookReview bookReview, IFormFile? image)
        {
            // Validate the model state based on data annotations.
            if (!ModelState.IsValid)
            {
                // Return a BadRequest response if the model is invalid.
                return BadRequest(ModelState);
            }

            // Check if an image was uploaded along with the book review
            if (image != null)
            {
                using (var memoryStream = new MemoryStream())  // Create a memory stream to hold the image bytes temporarily
                {
                    await image.CopyToAsync(memoryStream);  // Copy the uploaded image to the memory stream
                    bookReview.Image = memoryStream.ToArray();  // Convert the image data in the memory stream to a byte array and store it in the Image property
                }
            }

            // Add the new book review to the DbContext
            _context.BookReviews.Add(bookReview);  // Adds the new book review to the DbSet

            // Save the changes asynchronously to the database
            await _context.SaveChangesAsync();  // Commits the changes (insert operation) to the database

            // Returns a response indicating successful creation. The response includes a Location header to the created resource.
            return CreatedAtAction("GetBookReview", new { id = bookReview.Id }, bookReview);  // Returns a 201 status with the URI of the new book review and the created object
        }

        /// <summary>
        /// Updates an existing book review in the database.
        /// </summary>
        /// <param name="id">The ID of the book review to update. This should match the ID in the book review object.</param>
        /// <param name="bookReview">The updated book review data. This object should contain the new values for title, author, rating, review, and read date.</param>
        /// <param name="image">Optional image for the book review, can be null. If provided, the image is stored as a byte array associated with the review.</param>
        /// <returns>
        /// A response indicating the result of the update operation. On success, it returns a 204 NoContent status code, indicating the book review was successfully updated.
        /// If the model is invalid, it returns a 400 BadRequest response with validation error details.
        /// If the book review with the specified ID does not exist, it returns a 404 NotFound response.
        /// </returns>
        [HttpPut("{id}")]  // Marks this method as a PUT request handler for the /api/bookreviews/{id} endpoint
        public async Task<IActionResult> PutBookReview(int id, [FromForm] BookReview bookReview, IFormFile? image)
        {
            // Check if the book review with the specified ID exists in the database
            var existingReview = await _context.BookReviews.FindAsync(id);
            if (existingReview == null)
            {
                return NotFound();  // Return 404 if the review does not exist in the database
            }

            // Validate the model state based on data annotations.
            if (!ModelState.IsValid)
            {
                // Return a BadRequest response if the model is invalid.
                return BadRequest(ModelState);
            }

            // If an image is provided, update the Image property in the book review
            if (image != null)
            {
                using (var memoryStream = new MemoryStream())  // Create a memory stream to hold the uploaded image data
                {
                    await image.CopyToAsync(memoryStream);  // Copy the uploaded image data into the memory stream
                    bookReview.Image = memoryStream.ToArray();  // Convert the image data in the memory stream into a byte array
                }
            }

            // Now, update the existing review with the new values from the request
            existingReview.Title = bookReview.Title;
            existingReview.Author = bookReview.Author;
            existingReview.Rating = bookReview.Rating;
            existingReview.Review = bookReview.Review;
            existingReview.ReadDate = bookReview.ReadDate;
            if (image != null)
            {
                existingReview.Image = bookReview.Image;  // Update the image if provided
            }

            // Mark the book review entity as modified so that EF Core knows it needs to update the database record
            _context.Entry(existingReview).State = EntityState.Modified;

            try
            {
                // Attempt to save the changes to the database
                await _context.SaveChangesAsync();  // Saves the updated book review to the database asynchronously
            }
            catch (DbUpdateConcurrencyException)  // Handle any concurrency issues (if someone else modified the record at the same time)
            {
                if (!BookReviewExists(id))  // Check if the book review still exists in the database
                {
                    return NotFound();  // If the book review doesn't exist, return a 404 Not Found response
                }
                else
                {
                    throw;  // If a concurrency exception occurs but the record exists, rethrow the exception
                }
            }

            return NoContent();  // Returns a 204 NoContent response indicating the update was successful
        }

        /// <summary>
        /// Deletes a specific book review by its ID.
        /// </summary>
        /// <param name="id">The ID of the book review to delete.</param>
        /// <returns>A response indicating the result of the delete operation.</returns>
        [HttpDelete("{id}")]  // Marks this method as a DELETE request handler for the /api/bookreviews/{id} endpoint
        public async Task<IActionResult> DeleteBookReview(int id)
        {
            // Try to find the book review by its ID
            var bookReview = await _context.BookReviews.FindAsync(id);  // Asynchronously find the book review

            if (bookReview == null)  // If the book review is not found, return a 404 NotFound response
            {
                return NotFound();  // Book review with the specified ID doesn't exist
            }

            // If the book review is found, remove it from the DbContext
            _context.BookReviews.Remove(bookReview);  // Marks the book review for deletion

            // Save the changes to the database
            await _context.SaveChangesAsync();  // Commits the delete operation to the database

            return NoContent();  // Returns a 204 NoContent status code indicating successful deletion (no body returned)
        }

        /// <summary>
        /// Checks whether a book review with the specified ID exists in the database.
        /// </summary>
        /// <param name="id">The ID of the book review.</param>
        /// <returns>True if the book review exists, otherwise false.</returns>
        private bool BookReviewExists(int id)
        {
            // Checks if the book review with the specified ID exists in the database
            return _context.BookReviews.Any(e => e.Id == id);  // Returns true if a book review with the given ID exists, otherwise false
        }
    }
}
