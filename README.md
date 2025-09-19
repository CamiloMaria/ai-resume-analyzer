# AI Resume Analyzer

A smart resume analysis tool that helps job seekers optimize their resumes for specific job applications using AI-powered feedback.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🤖 **AI-Powered Analysis** - Get detailed feedback on your resume using advanced AI
- 📊 **ATS Score Rating** - Check how well your resume performs with Applicant Tracking Systems
- 🎯 **Job-Specific Feedback** - Tailor analysis based on specific job descriptions and company roles
- 📝 **Comprehensive Scoring** - Get detailed scores for:
  - ATS compatibility
  - Tone and style
  - Content quality
  - Structure and formatting
  - Skills relevance
- 📁 **Resume Management** - Track multiple resume submissions and their analysis results
- 🖼️ **Visual Preview** - View resume thumbnails and full PDF previews
- 💾 **Cloud Storage** - Powered by Puter.js for secure file storage and management
- 📱 **Responsive Design** - Modern UI built with React Router and TailwindCSS

## How It Works

1. **Upload Your Resume** - Drop your PDF resume file into the analyzer
2. **Job Context** - Provide company name, job title, and job description for targeted analysis
3. **AI Analysis** - The system converts your resume to image format and analyzes it using AI
4. **Detailed Feedback** - Receive comprehensive scores and improvement suggestions across multiple categories
5. **Track Progress** - View all your analyzed resumes in one dashboard

## Technology Stack

- **Frontend**: React 19 with React Router 7
- **Styling**: TailwindCSS with custom animations
- **File Processing**: PDF.js for PDF handling and conversion
- **AI Integration**: Puter.js AI services for resume analysis
- **Storage**: Puter.js file system and key-value store
- **Authentication**: Puter.js auth system
- **State Management**: Zustand
- **Build Tool**: Vite
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, pnpm, or yarn

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

### Building for Production

Create a production build:

```bash
pnpm run build
```

Start the production server:

```bash
pnpm start
```

## Project Structure

```
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── FileUploader.tsx # Drag & drop PDF uploader
│   │   ├── ResumeCard.tsx   # Resume preview cards
│   │   ├── ScoreCircle.tsx  # Score visualization
│   │   └── Navbar.tsx       # Navigation component
│   ├── routes/              # Application routes
│   │   ├── home.tsx         # Dashboard with resume list
│   │   ├── upload.tsx       # Resume upload and analysis
│   │   ├── resume.tsx       # Individual resume analysis view
│   │   └── wipe.tsx         # Data management utility
│   ├── lib/                 # Utility functions
│   │   ├── utils.ts         # Helper functions (formatSize, etc.)
│   │   ├── puter.ts         # Puter.js integration
│   │   └── pdf2img.ts       # PDF to image conversion
│   ├── types/               # TypeScript type definitions
│   ├── constants/           # App constants and AI prompts
│   └── app.css             # Global styles
├── public/                  # Static assets
│   ├── images/             # Background images and icons
│   └── icons/              # UI icons
└── build/                  # Production build output
```

## API Integration

This application uses [Puter.js](https://puter.com) for:

- **File Storage**: Secure PDF and image storage
- **AI Services**: Resume analysis and feedback generation
- **Key-Value Store**: Resume metadata and analysis results
- **Authentication**: User management and data privacy

## Deployment

### Docker Deployment

Build and run using Docker:

```bash
docker build -t ai-resume-analyzer .
docker run -p 3000:3000 ai-resume-analyzer
```

### Platform Deployment

The containerized application can be deployed to:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway
- Vercel
- Netlify

### DIY Deployment

For manual deployment, build the application and deploy the output:

```bash
pnpm run build
```

Deploy the `build/` directory contents to your hosting platform.

## Features in Detail

### Resume Analysis Categories

1. **ATS Compatibility** - Evaluates how well your resume works with Applicant Tracking Systems
2. **Tone & Style** - Analyzes professional language and writing style
3. **Content Quality** - Reviews the substance and relevance of your experience
4. **Structure & Format** - Checks layout, organization, and readability
5. **Skills Relevance** - Matches your skills against job requirements

### File Management

- Supports PDF files up to 20MB
- Automatic PDF to image conversion for AI analysis
- Secure cloud storage with Puter.js
- Resume history and tracking

---

Built with ❤️ using React Router and powered by Puter.js AI services.