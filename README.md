# Resume Builder

A modern, full-stack resume builder application with MongoDB backend that helps you maintain a master list of your projects, education, and experiences, and create tailored resumes for specific job postings.

## Features

- **Master List Management**: Maintain a comprehensive database of all your:
  - Projects (with descriptions, technologies, highlights)
  - Education (degrees, institutions, achievements)
  - Work Experiences (positions, companies, responsibilities)

- **Custom Resume Creation**: 
  - Enter job posting details for reference
  - Select relevant items from your master list
  - Customize selected content before saving
  
- **Resume Export**: Save and export your customized resumes as text files

- **Persistent Storage**: All data is stored in MongoDB database

## Technology Stack

- **Frontend**: React 18, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Styling**: CSS3 with animations
- **Deployment**: Render

## Local Development

### Prerequisites

- Node.js (v18 or higher)
- MongoDB installed locally OR MongoDB Atlas account

### Installation

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd resume-builder
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:

Create `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/resume-builder
FRONTEND_URL=http://localhost:5173
```

Create `.env.local` file in the root directory:
```env
VITE_API_URL=http://localhost:3000/api
```

4. **Start MongoDB** (if running locally):
```bash
mongod
```

5. **Run the application**:

**Option A**: Run frontend and backend separately:
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev
```

**Option B**: Run both concurrently:
```bash
npm run dev:all
```

6. **Open your browser** and navigate to `http://localhost:5173`

## Deployment to Render

### Step 1: Prepare MongoDB Database

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/resume-builder`)

### Step 2: Deploy to Render

1. **Push your code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Create Render Account**:
   - Go to https://render.com and sign up
   - Connect your GitHub account

3. **Create New Web Service**:
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `resume-builder` (or your preferred name)
     - **Region**: Choose closest to you
     - **Branch**: `main`
     - **Runtime**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free

4. **Add Environment Variables** in Render:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `<your-mongodb-atlas-connection-string>`
   - `FRONTEND_URL` = `<your-render-app-url>` (e.g., `https://resume-builder.onrender.com`)

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for the build and deployment to complete

### Step 3: Update Frontend API URL

After deployment, update the `.env.production` file if needed to match your Render URL (already configured to use relative `/api` path).

## How to Use

### 1. Master List
- Navigate to the "Master List" tab
- Add your projects, education, and experiences
- Edit or delete items as needed
- All changes are automatically saved to MongoDB

### 2. Build Resume
- Go to the "Build Resume" tab
- **Step 1**: Enter a title for your resume and optionally paste the job description
- **Step 2**: Select relevant items from your master list that match the job requirements
- **Step 3**: Customize the selected content to tailor it for the specific position
- Save your customized resume

### 3. Saved Resumes
- View all your saved resumes
- Export resumes as text files
- Delete resumes you no longer need

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Education
- `GET /api/education` - Get all education entries
- `POST /api/education` - Create new education entry
- `PUT /api/education/:id` - Update education entry
- `DELETE /api/education/:id` - Delete education entry

### Experiences
- `GET /api/experiences` - Get all experiences
- `POST /api/experiences` - Create new experience
- `PUT /api/experiences/:id` - Update experience
- `DELETE /api/experiences/:id` - Delete experience

### Resumes
- `GET /api/resumes` - Get all resumes
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

## Project Structure

```
resume-builder/
├── server/
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   └── index.js        # Express server setup
├── src/
│   ├── components/     # React components
│   ├── context/        # React context for state management
│   ├── utils/          # API utilities
│   ├── App.jsx         # Main app component
│   ├── App.css         # Styles
│   └── main.jsx        # React entry point
├── .env.example        # Example backend environment variables
├── .env.local.example  # Example frontend environment variables
├── render.yaml         # Render deployment configuration
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs) for Render
- Verify your connection string is correct
- Check that your database user has read/write permissions

### Render Deployment Issues
- Check the logs in Render dashboard
- Ensure all environment variables are set correctly
- Verify build and start commands are correct

### CORS Errors
- Ensure `FRONTEND_URL` environment variable matches your Render app URL
- Check that CORS is properly configured in `server/index.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
