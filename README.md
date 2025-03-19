# Navnitam - Attendance Tracking System

A modern, full-stack attendance tracking system built with React and Node.js, featuring QR code-based attendance, real-time tracking, and a beautiful user interface.

## 🌟 Features

- **QR Code-based Attendance**: Generate and scan QR codes for quick attendance marking
- **Real-time Tracking**: Monitor attendance status in real-time
- **User Management**: Admin and user roles with different access levels
- **Responsive Design**: Beautiful UI that works on all devices
- **PDF Generation**: Export attendance reports in PDF format
- **Cloud Storage**: Secure storage of attendance data and user information
- **Interactive Dashboard**: Visual representation of attendance statistics

## 🚀 Tech Stack

### Frontend
- React.js
- Material-UI
- Tailwind CSS
- Framer Motion (for animations)
- React Router DOM
- Axios for API calls
- Various React libraries for enhanced functionality

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Cloudinary for image storage
- Multer for file uploads
- CORS enabled
- Moment.js for date handling

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd navnitam
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../client
npm install
```

4. Set up environment variables:
   - Create `.env` files in both client and server directories
   - Add necessary environment variables (see `.env.example` files)

## 🚀 Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## 📱 Features in Detail

### For Administrators
- Generate QR codes for attendance
- View attendance reports
- Manage users and their roles
- Export attendance data
- Monitor real-time attendance status

### For Users
- Scan QR codes to mark attendance
- View personal attendance history
- Access attendance reports
- Update profile information

## 🔒 Security Features

- Secure authentication
- Role-based access control
- Protected API endpoints
- Secure file uploads
- Environment variable protection

## 📦 Deployment

The application is configured for deployment on Vercel:
- Frontend: React application
- Backend: Node.js server
- Database: MongoDB Atlas
- File Storage: Cloudinary

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Authors

- [Your Name/Team]

## 🙏 Acknowledgments

- Material-UI for the component library
- Tailwind CSS for styling
- All other open-source libraries used in this project 