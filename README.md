# 🌐 Social Media App - TypeScript

A full-stack social media application built from scratch using modern web technologies. This platform enables users to create posts, interact through likes and comments, follow other users, manage their profiles, search for content, and send private messages.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

---

## ✨ Features

### 🔐 Authentication & User Management
- User registration and secure login
- Profile creation and customization
- User profile pages with bio and activity feed

### 📱 Social Interactions
- **Posts**: Create, edit, and delete posts
- **Likes**: Like/unlike posts from other users
- **Comments**: Engage in conversations through comments
- **Follow System**: Follow/unfollow other users
- **Feed**: Personalized feed showing posts from followed users

### 💬 Messaging
- Private messaging between users
- Real-time message notifications
- Conversation history

### 🔍 Discovery
- Search functionality to find users and posts
- Explore trending content
- User recommendations

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building interactive user interfaces
- **TypeScript** - Type-safe JavaScript for better code quality
- **Supabase Client** - Real-time database client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Fast, minimalist web framework
- **TypeScript** - Type-safe backend development
- **Supabase** - Backend-as-a-Service (database, authentication, storage)

### Development Tools
- **ts-node** - TypeScript execution environment
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

---

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **Supabase account** (for database and authentication)

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/andrew-miroiu/Social-Media-App-TypeScript.git
cd Social-Media-App-TypeScript
```

### 2. Install Client Dependencies

```bash
cd client
npm install
```

**Core Dependencies:**
```bash
npm install @supabase/supabase-js react react-dom
```

**Development Dependencies:**
```bash
npm install -D @types/react @types/react-dom
```

### 3. Install Server Dependencies

```bash
cd ../server
npm install
```

**Core Dependencies:**
```bash
npm install express cors dotenv
```

**Development Dependencies:**
```bash
npm install -D @types/express @types/cors @types/node typescript ts-node
```

### 4. Environment Configuration

Create a `.env` file in both `client` and `server` directories:

**Client `.env`:**
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Server `.env`:**
```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

> **Note:** Get your Supabase credentials from your [Supabase Dashboard](https://app.supabase.com)

### 5. Database Setup

Set up your Supabase database with the following tables:

- **users** - Store user profile information
- **posts** - Store all user posts
- **likes** - Track post likes
- **follows** - Manage follow relationships
- **messages** - Store private messages
- **comments** - Store post comments

### 6. Run the Application

**Start the Backend Server:**
```bash
cd server
npm run dev
```

**Start the Frontend Client:**
```bash
cd client
npm start
```

The application should now be running at:
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000`

---

## 📂 Project Structure

```
Social-Media-App-TypeScript/
│
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Utility functions
│   ├── public/
│   └── package.json
│
├── server/                # Backend Express application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Utility functions
│   ├── index.ts
│   └── package.json
│
└── README.md
```

---

## 🔑 Key Features Implementation

### Authentication Flow
- Supabase handles user authentication
- JWT tokens for secure API requests
- Protected routes on both frontend and backend

### Real-time Updates
- Leverages Supabase real-time subscriptions
- Instant updates for new posts and messages
- Live notification system

### RESTful API
- Clean and organized API endpoints
- Proper error handling
- Type-safe request/response handling

---

## 🌟 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/search` - Search users

### Posts
- `GET /api/posts` - Get all posts (feed)
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post

### Messages
- `GET /api/messages` - Get conversations
- `POST /api/messages` - Send message
- `GET /api/messages/:userId` - Get conversation with user

### Follows
- `POST /api/follows/:userId` - Follow user
- `DELETE /api/follows/:userId` - Unfollow user
- `GET /api/follows/followers/:userId` - Get followers
- `GET /api/follows/following/:userId` - Get following

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Andrew Miroiu**

- GitHub: [@andrew-miroiu](https://github.com/andrew-miroiu)
- Repository: [Social-Media-App-TypeScript](https://github.com/andrew-miroiu/Social-Media-App-TypeScript)

---

## 🙏 Acknowledgments

- Supabase for providing an excellent backend-as-a-service platform
- React and TypeScript communities for amazing documentation
- All contributors who help improve this project

---

## 📧 Contact & Support

If you have any questions or need support, please open an issue in the GitHub repository.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Andrew Miroiu

</div>
