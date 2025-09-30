# 🌍 AleartECO - Climate Alert & Emergency Preparedness Platform

A comprehensive web application designed to provide personalized climate alerts, emergency preparedness tools, and community-driven climate information sharing.

## 🚀 Features

### 📍 **Personalized Location-Based Alerts**
- Real-time geolocation integration
- Weather API integration for accurate forecasts
- Customizable notification preferences
- Location-aware emergency alerts

### 🔐 **Authentication & User Management**
- Google OAuth 2.0 integration
- Secure user registration and login
- Protected routes and user sessions
- User profile management
- Persistent authentication state

### 🚨 **Emergency SOS System**
- One-click emergency alert system
- GPS location sharing with emergency contacts
- Local emergency services directory
- Emergency contact management

### 👥 **Community Hub**
- Social feed for local climate updates
- Crowdsourced event reporting
- Community engagement features
- Real-time information sharing

### 📚 **Educational Center**
- Interactive climate change courses
- Gamified learning with points and achievements
- Downloadable emergency preparedness resources
- Interactive quizzes and challenges

### ⚙️ **User Profile & Settings**
- Comprehensive notification preferences
- Privacy and security controls
- Multilingual support (ready for expansion)
- Accessibility features

## 🛠️ Technical Stack

**Frontend:**
- **React 18** with Vite
- **Tailwind CSS** with custom components
- **React Router v6** for routing
- **Context API** for state management
- **Lucide React** for icons
- **JWT Decode** for token handling

**Backend:**
- **Node.js** with Express.js
- **JWT Authentication** with refresh tokens
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **express-rate-limit** for API protection
- **helmet** for security headers
- **cors** for cross-origin requests
- **JSON file storage** (easily replaceable with database)

**Authentication:**
- **Google OAuth 2.0** integration
- **Manual registration/login** with email validation
- **Secure JWT tokens** with 7-day expiration
- **Password requirements**: 8+ chars, uppercase, lowercase, number

**PWA Features:**
- Service Worker with offline support
- Push notifications
- Background sync
- App shortcuts
- Responsive design

## 📱 Progressive Web App (PWA)

AleartECO is built as a Progressive Web App with:
- ✅ Offline functionality
- ✅ Installable on devices
- ✅ Push notifications
- ✅ Background sync
- ✅ App shortcuts
- ✅ Responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/alearteco.git
   cd alearteco
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   
   **Root directory (.env):**
   ```env
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   
   **Backend directory (backend/.env):**
   ```env
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   ```

   **Google OAuth Setup:**
   1. Go to [Google Cloud Console](https://console.cloud.google.com/)
   2. Create a new project or select existing one
   3. Enable Google+ API
   4. Create OAuth 2.0 credentials
   5. Add `http://localhost:3006` to authorized origins
   6. Copy the Client ID to your `.env` file

4. **Start the backend server**
   ```bash
   cd backend
   node server.js
   ```

5. **Start the development server**
   ```bash
   # In a new terminal, from the root directory
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3006`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🚀 API Documentation

### Authentication Endpoints

**Base URL:** `http://localhost:5000/api`

#### POST `/auth/register`
Register a new user with email and password.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id": "...", "name": "...", "email": "..." },
    "token": "jwt_token_here",
    "tokenType": "Bearer"
  }
}
```

#### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### POST `/auth/google`
Authenticate with Google OAuth.

**Request Body:**
```json
{
  "googleToken": "google_jwt_token",
  "userData": {
    "email": "john@gmail.com",
    "name": "John Doe",
    "picture": "profile_url"
  }
}
```

#### GET `/auth/me`
Get current authenticated user (requires Bearer token).

#### POST `/auth/logout`
Logout current user (requires Bearer token).

#### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "AleartECO Backend API is running",
  "timestamp": "2025-09-30T..."
}
```

## 📁 Project Structure

```
alearteco/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── offline.html           # Offline page
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── WeatherWidget.jsx
│   │   ├── Toast.jsx
│   │   ├── Modal.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/                 # Main application pages
│   │   ├── Home.jsx
│   │   ├── Alerts.jsx
│   │   ├── Emergency.jsx
│   │   ├── Community.jsx
│   │   ├── Education.jsx
│   │   └── Profile.jsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── useLocation.js
│   │   └── useNotifications.jsx
│   ├── services/              # API and external services
│   │   ├── weatherService.js
│   │   └── storageService.js
│   ├── utils/                 # Utility functions
│   │   └── helpers.js
│   ├── styles/                # CSS and styling
│   │   └── index.css
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── vite.config.js           # Vite configuration
```

## 🔧 Configuration

### Weather API Setup
1. Sign up for an API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Add your API key to the `.env` file
3. The app will fall back to mock data if no API key is provided

### Customization
- **Colors**: Modify `tailwind.config.js` to change the color scheme
- **Features**: Add new pages in the `src/pages/` directory
- **Components**: Create reusable components in `src/components/`

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you need help or have questions:
- 📧 Email: support@alearteco.com
- 💬 Discord: [Join our community](https://discord.gg/alearteco)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/alearteco/issues)

## 🚀 Roadmap

- [ ] Weather API integration
- [ ] Real-time database integration
- [ ] SMS/Email alert system
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] AI-powered risk assessment
- [ ] Integration with government alert systems

---

**Stay Safe. Stay Informed. Stay Connected.** 🌍

Made with ❤️ for climate resilience and community safety.