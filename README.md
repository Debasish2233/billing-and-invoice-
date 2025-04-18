# Billing & Invoice Automation Platform

A full-stack application that manages SaaS billing, usage tracking, and generates invoices. The app integrates Google OAuth for user authentication, displays usage data, and supports automatic invoice generation. It also integrates with **Zapier** for workflow automation.

## Features
- Google OAuth 2.0 login for secure authentication
- Display SaaS usage and billing data in real-time
- Generate PDF invoices for users
- Integrate with **Zapier** to automate workflows (e.g., sending invoices via email)
- Built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js)

## Tech Stack
- **Frontend:** React, @react-oauth/google, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** Google OAuth
- **Utilities:** dotenv, jsonwebtoken, pdfkit, zapier-platform-rest


## Setup Instructions

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/billing-invoice-app.git
    cd billingApp
    ```

2. **Install Dependencies:**
   - **Frontend:**
     ```bash
     cd frontend
     npm install
     ```
     Create a `.env` file in `frontend` with the following content:
     ```
     REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
     ```

   - **Backend:**
     ```bash
     cd backend
     npm install
     ```
     Create a `.env` file in `backend` with the following content:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_uri
     GOOGLE_CLIENT_ID=your_google_client_id
     JWT_SECRET=your_jwt_secret
     ZAPIER_WEBHOOK_URL=your_zapier_url
     ```

3. **Run the Application:**
   - **Backend:**
     ```bash
     cd backend
     npm start
     ```

   - **Frontend:**
     ```bash
     cd frontend
     npm start
     ```

   The app should now be running at [http://localhost:3000](http://localhost:3000) for the frontend and [http://localhost:5000](http://localhost:5000) for the backend.

## Authentication Flow
1. The user clicks on the Google login button to authenticate via Google OAuth.
2. Upon successful login, the backend verifies the user and generates a JWT token.
3. The frontend stores this token and uses it to authenticate subsequent API requests.

## Invoice Generation
- PDF invoices are dynamically generated using **PDFKit** in the backend.
- Once generated, the invoices are available for download or can be emailed automatically using **Zapier**.

## API Endpoints
- **POST /api/login**: Google OAuth authentication (handled via React frontend).
- **GET /api/billing**: Fetch user billing details (secured endpoint).
- **POST /api/invoice**: Generate a new invoice (PDF generated on success).

## Environment Variables
- **Frontend `.env`:**
  - `REACT_APP_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
  
- **Backend `.env`:**
  - `PORT`: Port for the backend server (default 5000).
  - `MONGO_URI`: MongoDB connection URI.
  - `GOOGLE_CLIENT_ID`: Google OAuth Client ID for the backend.
  - `JWT_SECRET`: Secret key used for JWT token generation.
  - `ZAPIER_WEBHOOK_URL`: Zapier webhook URL for automating workflows.

## License
MIT License

## Contact
Debasish Das  
Email: ddas19682@gmail.com  
Phone: +91 7735496977

