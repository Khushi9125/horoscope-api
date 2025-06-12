# 🔮 Personalized Horoscope API

A Node.js backend service that provides daily horoscopes based on a user's zodiac sign.

---

## 📦 Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT for Authentication
- bcrypt for password hashing

---

## 🚀 Setup Instructions

1. **Clone the repo or unzip the folder**
   - If using GitHub:
     ```bash
     git clone https://github.com/your-username/horoscope-api.git
     cd horoscope-api
     ```
   - If using a ZIP file, just unzip and navigate into the folder.

2. **Install dependencies**
   ```bash
   npm install

3. **Set up environment variables**
    - Create a .env file in the root directory with the following:

        <!-- MONGO_URI=mongodb://localhost:27017/horoscope-api
        JWT_SECRET=your_jwt_secret_here -->

4. **Start MongoDB**
    - brew services start mongodb/brew/mongodb-community@7.0

5. **Run the app**
    - node app.js

---

*You should see:*
    - 🚀 Server started on http://localhost:3000

---

## API Endpoints-

1. **Auth**
- *POST* /auth/signup
    Create a new user with name, email, password, and birthdate. Zodiac sign is auto-detected.
- *POST* /auth/login
    Login using email and password. Returns a *JWT token*.

2. **Horoscope** 
(Requires JWT token in Authorization: Bearer <token> header)
- *GET* /horoscope/today
    Returns today’s horoscope based on the user’s zodiac sign.

- *GET* /horoscope/history
    Returns the last 7 days of horoscope history.


## 🧠 Design Decisions

- **JWT Auth**: Used for stateless and secure API access.
- **Zodiac Detection**: Birthdate is parsed during signup using a helper utility to determine the zodiac sign automatically.
- **Mock Horoscope**: Horoscope texts are stored in a local file (`utils/mockHoroscopes.js`) to simulate real API/database responses.
- **Rate Limiting**: Middleware is applied globally to prevent abuse and excessive requests.

