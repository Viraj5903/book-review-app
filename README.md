# Review Book React Application - Setup Guide

## Prerequisites

Before you begin, ensure that you have the following installed:

- **Node.js** (LTS version recommended):  
  [Download here](https://nodejs.org)

- **Visual Studio** (for API Server setup):  
  [Download here](https://visualstudio.microsoft.com/downloads/)

- **SQL Server Express** (or any SQL Server instance):  
  [Download SQL Server Express here](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

- **.NET SDK** (for the backend API):  
  [Download .NET SDK here](https://dotnet.microsoft.com/download/dotnet)

## Steps to Set Up the Project

### 1. **Clone the Repository**
   - Begin by cloning the repository to your local machine using Git.
     ```bash
     git clone https://github.com/Viraj5903/book-review-app.git
     ```

### 2. **Set Up the API Server (Backend)**

1. **Open the Book Reviews API Project in Visual Studio**

   - Launch **Visual Studio** and open the **BookReviewsAPI** project.

2. **Install Required NuGet Packages**

   - Open the **Package Manager Console** in Visual Studio by navigating to **Tools > NuGet Package Manager > Package Manager Console**.
   - Run the following commands to install necessary packages for Entity Framework Core and SQL Server support:

     ```bash
     Install-Package Microsoft.EntityFrameworkCore.Tools
     Install-Package Microsoft.EntityFrameworkCore.SqlServer
     ```

3. **Update the Database**

   - In the **Package Manager Console**, run the following command to apply any pending migrations and update your local database (LocalDB) schema:

     ```bash
     Update-Database
     ```
  
4. **(Optional) Use a SQL Server Instance Instead of LocalDB**

   - By default, the backend API is configured to use **LocalDB**. If you'd like to use a **SQL Server instance** instead, update the connection string in the **`appsettings.json`** file.
   - Open **`appsettings.json`** and modify the `ConnectionStrings` section as shown below:

     ```json
     "ConnectionStrings": {
       "BookReviewDb": "Server=your-server-name;Database=your-database-name;User Id=your-username;Password=your-password;"
     }
     ```
   - Replace `your-server-name`, `your-database-name`, `your-username`, and `your-password` with your actual SQL Server instance details.
   - Run again the `Update-Database` command to apply the migrations to your SQL Server instance.

5. **Build and Run the Backend API**

   - After updating the database, build the project in Visual Studio and run the backend API.
   - To verify that the API is working correctly, open your browser and navigate to `http://localhost:5000` (or the appropriate URL).


### 3. **Set Up the Frontend (React Application)**

1. **Open the Book Review Project in Visual Studio Code**

   - Navigate to the **book-review-app** folder (frontend folder) and open it in **Visual Studio Code**.

2. **Install Project Dependencies**

   - Open the terminal in Visual Studio Code and run the following command to install the project dependencies:

     ```bash
     npm install
     ```

3. **Start the React Development Server**

   - Once the dependencies are installed, start the React development server by running:

     ```bash
     npm start
     ```

4. **Access the React Application**

   - The React application should now be running and accessible at `http://localhost:3000` in your web browser.

### 4. **Running the Application**

1. **Backend: Ensure the API Server is Running**

   - Verify that the API Server is running and accessible at its designated endpoint (typically `http://localhost:5000`).
   - If the backend is not running, ensure you have followed the steps to set it up correctly in **Step 2**.

2. **Frontend: Run the React Application**

   - The React frontend should now be running at `http://localhost:3000`.
   - Open a web browser and go to `http://localhost:3000` to interact with the application and test its functionality.
   - Make sure the frontend can communicate with the backend and that all features work as expected.