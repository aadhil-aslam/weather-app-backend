# Weather App Backend

This is the backend service for the Weather Display Application. It provides weather data, user authentication, and reminder management functionalities.

---

## **Features**
- **User Authentication**: Secure user login and registration using Firebase Authentication.
- **Weather API Integration**: Fetches current weather and forecast data using the OpenWeatherMap API.
- **Firestore Database**: Stores user data, reminders, and preferences.
- **RESTful Endpoints**: Provides APIs for frontend communication.
  
---

## **Technologies Used**
- **Node.js** with **Express.js**: Backend framework for building REST APIs.
- **Firebase Authentication**: User authentication and token management.
- **Firestore**: NoSQL database for storing user reminders and data.
- **OpenWeatherMap API**: Weather data provider.

---

## **Setup Instructions**

### Prerequisites
- Node.js and npm installed.
- Firebase project setup (for Authentication and Firestore).
- OpenWeatherMap API key.

### **Steps to Run the Backend Locally**
1. Clone the repository:

2. Install dependencies:
    npm install

3. Create a .env file in the root directory and add the following environment variables:
    WEATHER_API_KEY=<your-openweathermap-api-key>

4. Add the firebase service account json file into config folder.

5. Set up firebaseConfig.js by replacing the ‘./config/ywather-cast-firebase-adminsdk-fbsvc-8be16ddac4.json’ with the actual path to Firebase service account credentials file.

6. Start the server: 
    npm start

The server will run on http://localhost:5000.

## API Endpoints

### Authentication
- POST /auth/signup: Register a new user.
- POST /auth/login: User login and token generation.

### Weather
- GET /weather/current?city=<city-name>: Get current weather for a city.
- GET /weather/forecast?city=<city-name>: Get 5-day forecast for a city.
- GET /weather/current?lat=<latitude>&lon=<longitude>: Get weather for a location.
- GET /weather/forecast?lat=<latitude>&lon=<longitude>: Get forecast for a location.

### Reminders
- POST /reminders: Create a new reminder.
- GET /reminders: Get all reminders for the user.
- PUT /reminders/:id: Update a reminder.
- DELETE /reminders/:id: Delete a reminder.
