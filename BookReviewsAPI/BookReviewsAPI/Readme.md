# Book Reviews API Documentation

The **Book Reviews API** provides endpoints to manage book reviews. Users can perform CRUD (Create, Read, Update, and Delete) operations on book reviews, including uploading an image for each review.

## Base URL

All API endpoints are prefixed with `/api/bookreviews`.

**Base URL**: `https://localhost:7249/api/bookreviews`

---

## Authentication

This API does not require authentication for basic CRUD operations. However, authentication and authorization mechanisms (e.g., JWT, OAuth) can be added as required.

---

## Endpoints

### 1. Retrieve All Book Reviews

- **URL**: `/api/bookreviews`
- **Method**: `GET`
- **Description**: Fetch all book reviews in the system.
- **Response**:
  - **Status Code**: `200 OK`
  - **Content-Type**: `application/json`
  - **Body**: Returns an array of book reviews.

#### Response Example:
```json
[
  {
    "id": 1,
    "title": "Harry Potter",
    "author": "J K Rowling",
    "rating": 5,
    "readDate": "2023-01-15",
    "review": "A fascinating exploration of the Magic World.",
    "imageBase64": "base64encodedstring",
    "imageMimeType": "image/jpeg"
  },
  ...
]
```

### 2. Retrieve a Specific Book Review

- **URL**: `/api/bookreviews/{id}`
- **Method**: `GET`
- **Description**: Fetch a book review by its ID.
- **Response**:
  - **Status Code**: `200 OK` (if found), `404 Not Found` (if not found)
  - **Content-Type**: `application/json`
  - **Body**: A book review object, or a 404 Not Found response if the book review does not exist.

#### Response Example:
```json
{
    "id": 1,
    "title": "Harry Potter",
    "author": "J K Rowling",
    "rating": 5,
    "readDate": "2023-01-15",
    "review": "A fascinating exploration of the Magic World.",
    "imageBase64": "base64encodedstring",
    "imageMimeType": "image/jpeg"
}
```

### 3. Create a New Book Review

- **URL**: `/api/bookreviews`
- **Method**: `POST`
- **Description**: Create a new book review. Optionally, an image can be uploaded with the review.
- **Request Body**:
  - **Content-Type**: `multipart/form-data`
  - **Parameters**:
    - `title` (string): The title of the book (required).
    - `author` (string): The author of the book (required).
    - `rating` (integer): A rating for the book (1-5) (required).
    - `readDate` (string): The date the book was read (ISO 8601 format) (required).
    - `review` (string): A review of the book (required).
    - `image` (file, optional): An image to associate with the book review. If provided, the image will be stored along with the review.

- **Response**:
  - **Status Code**: `201 Created`
  - **Location Header**: URL to the created book review.
  - **Content-Type**: `application/json`
  - **Body**: The created book review object.

#### Response Example:
```json
{
    "id": 1,
    "title": "Harry Potter",
    "author": "J K Rowling",
    "rating": 5,
    "readDate": "2023-01-15",
    "review": "A fascinating exploration of the Magic World.",
    "imageBase64": "base64encodedstring",
    "imageMimeType": "image/jpeg"
}
```

### 4. Update an Existing Book Review

- **URL**: `/api/bookreviews/{id}`
- **Method**: `PUT`
- **Description**: Update an existing book review by ID. Optionally, an image can be uploaded or replaced.

- **Request Body**:
  - **Content-Type**: `multipart/form-data`
  - **Parameters**:
    - `title` (string): The title of the book (required).
    - `author` (string): The author of the book (required).
    - `rating` (integer): A rating for the book (1-5) (required).
    - `readDate` (string): The date the book was read (ISO 8601 format) (required).
    - `review` (string): A review of the book (required).
    - `image` (file, optional): An image to associate with the book review. If provided, it will replace the existing image.

- **Response**:
  - **Status Code**: `204 No Content` (on successful update), `400 Bad Request` (if the IDs don't match or invalid input), `404 Not Found` (if the book review does not exist).
  - **Content-Type**: `application/json`

### 5. Delete a Book Review

- **URL**: `/api/bookreviews/{id}`
- **Method**: `DELETE`
- **Description**: Delete a specific book review by its ID.
- ** URL Parameters**:
  - **id (interger)**: The unique identifier of the book review to delete.
- **Response**:
  - **Status Code**: `204 No Content` (on successful deletion), `404 Not Found` (if the book review does not exist).
  - **Content-Type**: `application/json`

## Model Definitions

### BookReview
Represents a book review in the system.

| Property        | Type    | Description                                               | Required |
|-----------------|---------|-----------------------------------------------------------|----------|
| `id`            | integer | The unique identifier of the review.                      | Yes      |
| `title`         | string  | The title of the book.                                    | Yes      |
| `author`        | string  | The author of the book.                                   | Yes      |
| `rating`        | integer | Rating of the book (1 to 5).                              | Yes      |
| `readDate`      | string  | The date when the book was read (ISO 8601 format).        | Yes      |
| `review`        | string  | A textual review of the book.                             | Yes      |
| `imageBase64`   | string  | Base64-encoded string of the book's image (if available). | No       |
| `imageMimeType` | string  | MIME type of the image (if available, e.g., `image/jpeg`).| No       |

### BookReviewViewModel
Represents a book review, excluding any writable properties like the image binary data.

| Property        | Type    | Description                                               | Required |
|-----------------|---------|-----------------------------------------------------------|----------|
| `id`            | integer | The unique identifier of the review.                      | Yes      |
| `title`         | string  | The title of the book.                                    | Yes      |
| `author`        | string  | The author of the book.                                   | Yes      |
| `rating`        | integer | Rating of the book (1 to 5).                              | Yes      |
| `readDate`      | string  | The date when the book was read (ISO 8601 format).        | Yes      |
| `review`        | string  | A textual review of the book.                             | Yes      |
| `imageBase64`   | string  | Base64-encoded string of the book's image (if available). | No       |
| `imageMimeType` | string  | MIME type of the image (if available, e.g., `image/jpeg`).| No       |

## Error Handling

The API uses standard HTTP status codes to indicate the outcome of the operations.

- **400 Bad Request**: The client sent invalid data (e.g., missing required fields or invalid values).
- **404 Not Found**: The requested resource (e.g., book review) was not found in the system.
- **500 Internal Server Error**: An unexpected error occurred on the server.


## Conclusion

The Book Reviews API provides a simple interface for managing book reviews. You can perform CRUD operations and optionally upload images to be associated with reviews. The API is flexible and can easily be expanded to support more features in the future.