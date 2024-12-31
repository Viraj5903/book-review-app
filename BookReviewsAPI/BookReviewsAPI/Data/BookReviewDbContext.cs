using BookReviewsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BookReviewsAPI.Data
{
    /// <summary>
    /// Represents the database context for managing book review data.
    /// It inherits from <see cref="DbContext"/> and provides access to the BookReviews table.
    /// </summary>
    public class BookReviewDbContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BookReviewDbContext"/> class.
        /// </summary>
        /// <param name="options">The options to be used by the <see cref="DbContext"/>.</param>
        public BookReviewDbContext(DbContextOptions<BookReviewDbContext> options) : base(options)
        {
        }

        /// <summary>
        /// Gets or sets the <see cref="DbSet{BookReview}"/> representing the BookReviews table in the database.
        /// </summary>
        public DbSet<BookReview> BookReviews { get; set; } = null!;

        /// <summary>
        /// Configures the model (e.g., table names, column types, relationships).
        /// </summary>
        /// <param name="modelBuilder">The model builder used to configure the model.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the BookReview entity to map it to the BookReviews table.
            modelBuilder.Entity<BookReview>(entity =>
            {
                entity.ToTable("BookReviews");  // Map to "BookReviews" table in the database.
                entity.HasKey(e => e.Id);       // Set "Id" as the primary key for the table.
                // We can configure further details, such as max length, required fields, etc.
                entity.Property(e => e.Title).HasMaxLength(255).IsRequired();   // Title is required.
                entity.Property(e => e.Author).HasMaxLength(255).IsRequired();  // Author is required.
                entity.Property(e => e.Review).IsRequired();                    // Review text is required.
            });
        }
    }
}
