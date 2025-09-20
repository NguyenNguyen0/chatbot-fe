# 🤖 N.AI - Chatbot Frontend

A modern, responsive AI chatbot web application built with React and Vite, featuring real-time streaming responses and advanced markdown rendering capabilities.

![Demo](/assets/N.aidemo2.gif "save conversation in database")
![Demo](/assets/N.ai%20demo1.gif "streaming real time response")

## 🖥️ Overview

N.AI is a sophisticated frontend web application that provides an interactive chat interface with AI-powered responses. The application streams AI responses in real-time, renders markdown content dynamically, and persists user conversations in a database for seamless chat history management.

## ✨ Key Features

- **⚡ Real-time AI Streaming**: Live streaming of AI responses as they're generated
- **📝 Advanced Markdown Rendering**: Full support for markdown formatting in chat messages
- **💾 Conversation Persistence**: Save and retrieve user conversations from database
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **🔒 User Authentication**: Secure user management system
- **🕒 Message History**: Complete chat history with search and navigation
- **🎨 Modern UI/UX**: Clean, intuitive interface with smooth animations

## 🔗 Backend Repository

This frontend connects to the N.AI backend service. You can find the backend repository here:
**[N.AI Backend Repository](https://github.com/NguyenNguyen0/chatbot-be)**

## 🛠️ Tech Stack

- **⚛️ React 19** - Modern React with latest features
- **⚡ Vite 6** - Lightning-fast build tool and dev server
- **🛠️ Redux Toolkit** - Predictable state management
- **🎨 TailwindCSS v4** - Utility-first CSS framework
- **🌐 React Router v7** - Client-side routing and navigation
- **📡 Axios** - HTTP client for API communication
- **📝 React Markdown** - Markdown rendering with syntax highlighting
- **💡 React Syntax Highlighter** - Code block syntax highlighting
- **🔤 React Icons** - Comprehensive icon library
- **🔔 React Toastify** - Toast notifications

## 🚀 Getting Started

### 🛠️ Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Backend Service** - Make sure the [N.AI Backend](https://github.com/NguyenNguyen0/chatbot-be) is running

### 📦 Installation

1. **📂 Clone the repository**
```bash
git clone https://github.com/NguyenNguyen0/chatbot-fe.git
cd chatbot-fe
```

2. **📦 Install dependencies**
```bash
npm install
# or
yarn install
```

3. **⚙️ Configure environment**
   - Set up your backend API endpoint in the configuration files
   - Ensure the backend service is running and accessible

4. **🚀 Start the development server**
```bash
npm run dev
# or
yarn dev
```

5. **🌐 Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - Start chatting with the AI!

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run format` - Format code with Prettier

## 🌍 Production Deployment

To build the project for production:

```bash
npm run build
```

This generates a `dist` directory with optimized, production-ready files that can be served by any static file server.

## 🏗️ Project Architecture

This frontend application is designed to work seamlessly with the N.AI backend:

- **🔗 Real-time Communication**: WebSocket connections for streaming AI responses
- **🛠️ State Management**: Redux Toolkit for managing chat state and user sessions  
- **🌐 API Integration**: RESTful API calls for user authentication and conversation persistence
- **📦 Component Architecture**: Modular, reusable React components organized by feature

## 🤝 Contributing

1. **🍴 Fork the repository**
2. **🌿 Create your feature branch** (`git checkout -b feature/amazing-feature`)
3. **💾 Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **📤 Push to the branch** (`git push origin feature/amazing-feature`)
5. **🔀 Open a Pull Request**

## 📄 License

This project is licensed under the terms specified in the LICENSE file. See the [LICENSE](LICENSE) file for details.
