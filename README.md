**Problem Statement: Attendee Session Booking System**

**Introduction:**
Create a backend system to facilitate the booking and management of sessions for university wardens. The system allows wardens to log in, view available sessions, book sessions, and manage their booked and pending sessions.

**Features:**

1. **User Authentication:**

   - Wardens can authenticate using their university ID and password.
   - Upon successful authentication, the system generates a unique token (UUID) for the warden.
   - This token is used for authentication in all subsequent API calls.

2. **Viewing Available Sessions:**

   - Wardens can view a list of free sessions available with other wardens.
   - Sessions are 1-hour long and are available on Thursdays and Fridays at 10 AM every week.

3. **Booking a Session:**

   - Wardens can select and book a free session.
   - Upon successful booking, the session status is updated to "booked."

4. **Viewing Pending Sessions:**

   - After logging in, wardens can view a list of pending sessions.
   - Pending sessions include the warden's name and slot details.
   - Initially, the list includes only sessions booked by the warden.

5. **Managing Sessions:**

   - Another warden (Warden C) can log in, view available slots, and book a session.
   - The system keeps track of booked and pending sessions for each warden.

6. **Update Pending Sessions:**
   - If a warden logs in after the session time booked by another warden (e.g., Warden A), the system updates the pending session list to exclude the past session.

**API Endpoints:**

1. `POST /warden/login` - User authentication and token generation.
2. `GET /sessions/free` - Get a list of free sessions.
3. `POST /sessions/book` - Book a session.
4. `GET /sessions/pending` - Get a list of pending sessions.
5. `POST /warden/logout` - Log out and invalidate the authentication token.

**Readme:**

1. **Setup:**

   - Clone the repository.
   - Install dependencies using `npm install`.
   - Set up a MongoDB database and update the connection string in the configuration.

2. **Run the Application:**

   - Start the server using `npm start`.

3. **API Documentation:**

   - Detailed API documentation is available in the `docs` directory.
   - Use Postman or any API testing tool to interact with the endpoints.

4. **Database Configuration:**

   - Configure the MongoDB connection in the `.env` file.
   - Run database migrations using `npm run migrate` (if applicable).

5. **Contributing:**

   - Fork the repository, create a new branch for your changes, and submit a pull request.

6. **Issues and Bug Reports:**
   - Report any issues or bugs using the GitHub issue tracker.
  
Happy coding! 🚀
