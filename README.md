# Biyaa - Modern Islamic Matrimonial Platform

![Biyaa Logo](./public/images/wedding.png)

**Biyaa** is a modern, responsive Islamic matrimonial platform built with Next.js 15, designed to help Muslims find their ideal life partners while maintaining Islamic values and principles.

## 🌟 Features

### Core Functionality
- **Comprehensive Biodata Management** - Create detailed Islamic biodata profiles
- **Advanced Search & Filtering** - Find compatible matches using Typesense search
- **Multilingual Support** - Full Bengali and English language support
- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Islamic Focused** - Designed specifically for Muslim matrimonial needs

### User Features
- 📝 **Multi-step Biodata Creation** - 10 comprehensive sections covering all aspects
- 🔍 **Smart Search** - Location-based filtering with division/district/upazilla support
- ❤️ **Favorites System** - Like/unlike biodata profiles
- 👤 **User Dashboard** - Complete profile management
- 🌐 **Bilingual Interface** - Seamless language switching
- 📱 **Mobile Optimized** - Perfect experience on all devices

### Technical Features
- 🔐 **Secure Authentication** - Firebase Auth with Google Sign-in
- 🚀 **Real-time Search** - Powered by Typesense for instant results
- 🎨 **Modern UI/UX** - Built with Tailwind CSS and shadcn/ui
- 📊 **State Management** - Redux Toolkit for efficient state handling
- 🌍 **Internationalization** - Complete i18n implementation

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling with validation

### Backend & Services
- **Firebase Auth** - Authentication system
- **Firestore** - NoSQL database
- **Typesense** - Search engine
- **Next.js API Routes** - Server-side API endpoints

### UI Components
- **shadcn/ui** - Modern React components
- **Radix UI** - Accessible component primitives
- **React Icons** - Icon library
- **Sonner** - Toast notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Firebase project setup
- Typesense instance (cloud or self-hosted)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/minhaz23-oss/biyaa.git
   cd biyaa
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=your_service_account_email
   FIREBASE_PRIVATE_KEY=your_service_account_private_key
   
   # Typesense Configuration
   TYPESENSE_API_KEY=your_typesense_api_key
   TYPESENSE_HOST=your_typesense_host
   TYPESENSE_PORT=443
   TYPESENSE_PROTOCOL=https
   
   # Admin Configuration
   ADMIN_SECRET_KEY=your_admin_secret_key
   ```

4. **Firebase Setup**
   - Create a Firebase project
   - Enable Authentication (Email/Password and Google)
   - Set up Firestore database
   - Add your service account credentials

5. **Typesense Setup**
   - Set up Typesense Cloud or self-hosted instance
   - Create the biodata collection using the admin API

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
biyaa/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (root)/            # Public routes
│   ├── (search)/          # Search functionality
│   ├── (user)/            # User dashboard
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── userComponents/   # User-specific components
│   └── providers/        # Context providers
├── contexts/             # React contexts
├── firebase/             # Firebase configuration
├── lib/                  # Utility functions
│   ├── actions/         # Server actions
│   ├── hooks/           # Custom hooks
│   ├── typesense/       # Typesense integration
│   └── utils/           # Helper functions
├── redux/               # Redux store and slices
├── translations/        # i18n translation files
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## 🎯 Usage

### For Users
1. **Sign Up/Sign In** - Create account or sign in with Google
2. **Create Biodata** - Fill out comprehensive 10-step biodata form
3. **Search Profiles** - Use advanced filtering to find compatible matches
4. **Manage Favorites** - Like/unlike profiles and manage your preferences
5. **Update Profile** - Edit biodata and account settings

### For Administrators
- **Data Management** - Bulk import/export biodata
- **Search Sync** - Synchronize Firestore data with Typesense
- **Analytics** - Monitor platform usage and statistics

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Data Management
npm run inject-biodata     # Inject sample biodata
npm run cleanup-biodata    # Clean up test data
npm run biodata-stats      # Show biodata statistics
```

## 🌐 Internationalization

Biyaa supports both Bengali and English languages:
- **Bengali (bn)** - Uses Mina font for authentic Bengali typography
- **English (en)** - Uses Parkinsans font for modern English text
- **Dynamic switching** - Users can toggle languages instantly
- **Complete translation** - All UI elements are fully translated

## 🔒 Security Features

- **Firebase Authentication** - Secure user authentication
- **Session Management** - HTTP-only cookies for session security
- **Input Validation** - Comprehensive form validation using Zod
- **Environment Variables** - Sensitive data stored securely
- **API Protection** - Protected API routes with authentication

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Perfect experience on tablets
- **Desktop Ready** - Full-featured desktop interface
- **Touch Friendly** - Optimized for touch interactions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Islamic Community** - For inspiration and guidance
- **Open Source Libraries** - For providing excellent tools
- **Beta Users** - For valuable feedback and testing

## 📞 Support

For support and queries:
- **Email**: info@biyaa.com
- **Phone**: +880 1234 567890
- **Issues**: [GitHub Issues](https://github.com/minhaz23-oss/biyaa/issues)

---

**Made with ❤️ for the Muslim community**
