# Smart Parking System

## Overview
The **Smart Parking System** is a MERN stack-based web application that provides a seamless solution for managing parking spaces efficiently. It allows users to find and book parking slots in real-time while enabling parking owners to manage their parking areas effectively. The system includes an admin panel for managing users, bookings, and transactions.

## Features
- **Role-Based Access**:
  - **Admin**: Manages users, parking slots, bookings, and transactions.
  - **Parking Owner**: Adds and manages parking slots, sets pricing, and tracks bookings.
  - **User**: Searches for available slots, books parking, and makes payments.
  - **Security**: Verifies and monitors parking usage.
- **Real-Time Slot Tracking**
- **Online Booking & Payment Integration**
- **Navigation Assistance**
- **Admin Dashboard for Parking Lot Management**
- **Responsive UI for Web & Mobile**

## Tech Stack
- **Frontend**: React.js (Vite), Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Stripe/Razorpay
- **Database**: MongoDB with Mongoose

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+)
- MongoDB
- npm or yarn

### Steps to Run the Project

#### Clone the Repository
```sh
git clone https://github.com/AshishChaudhari07/Smart_Parking_System.git
cd Smart_Parking_System
```

#### Install Dependencies
##### Backend
```sh
cd backend
npm install
```
##### Frontend
```sh
cd frontend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `backend` directory and add the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
```

#### Run the Server
```sh
cd backend
npm start
```

#### Run the Frontend
```sh
cd frontend
npm run dev
```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/parking-slots` | Fetch available parking slots |
| POST | `/api/bookings` | Book a parking slot |
| GET | `/api/bookings/:id` | Fetch booking details |

## Future Enhancements
- AI-based parking recommendations
- IoT integration for real-time occupancy detection
- Mobile app support

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, contact [Ashish Chaudhary](mailto:your-ashishchaudhari19112003@gmail.com).

### GitHub Repository
[Smart Parking System GitHub](https://github.com/AshishChaudhari07/Smart_Parking_System)
