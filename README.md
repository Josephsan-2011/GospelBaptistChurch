# Gospel Baptist Church Website

A modern church website with sermon management, member portal, and real file upload capabilities.

## Features

- **Public Sermons Page**: Browse and search public sermons
- **Members-Only Content**: Exclusive sermons and resources for church members
- **Pastor Dashboard**: Upload and manage sermons with real file uploads
- **News & Announcements**: Church news management system
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Multi-language Support**: English and Myanmar language support

## Backend Server Setup

The website now includes a Node.js backend server for real file uploads and sermon management.

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Backend Server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

3. **Access the Website**
   - Frontend: http://localhost:8000 (Python server)
   - Backend API: http://localhost:3000 (Node.js server)

### Backend Features

- **Real File Uploads**: Upload audio, video, documents, and images
- **File Storage**: Organized file storage in `/uploads/sermons/` directory
- **API Endpoints**: RESTful API for sermon management
- **File Serving**: Serve uploaded files directly from the server
- **Data Persistence**: Sermon data stored in `sermons.json`

### API Endpoints

- `GET /api/sermons` - Get all sermons (with optional filters)
- `GET /api/sermons/:id` - Get specific sermon
- `POST /api/sermons/upload` - Upload new sermon with files
- `PUT /api/sermons/:id` - Update sermon
- `DELETE /api/sermons/:id` - Delete sermon and associated files

### File Upload Support

- **Audio Files**: MP3, WAV, OGG, M4A
- **Video Files**: MP4, WebM, OGG, AVI
- **Documents**: PDF, DOC, DOCX
- **Images**: JPEG, PNG, GIF, WebP
- **File Size Limit**: 100MB per file

## Sermon Upload Process

1. **Pastor Login**: Access the members area
2. **Fill Form**: Enter sermon details (title, date, description, etc.)
3. **Upload Files**: Select audio, video, document, or image files
4. **Set Visibility**: Choose public, members-only, or private
5. **Submit**: Files are uploaded to the server and sermon is saved

## File Organization

```
uploads/
└── sermons/
    ├── audio/      # Audio files
    ├── video/      # Video files
    ├── documents/  # PDF, DOC files
    └── images/     # Cover photos
```

## Development

### Running Both Servers

1. **Terminal 1 - Backend Server**
   ```bash
   npm run dev
   ```

2. **Terminal 2 - Frontend Server**
   ```bash
   python3 -m http.server 8000
   ```

### Testing File Uploads

1. Navigate to the members area
2. Use the sermon upload form
3. Select real files (audio, video, documents)
4. Submit the form
5. Check the `/uploads/sermons/` directory for uploaded files

## Production Deployment

For production deployment, consider:

- **Database**: Replace JSON storage with a proper database (MySQL, PostgreSQL)
- **File Storage**: Use cloud storage (AWS S3, Google Cloud Storage)
- **Security**: Add authentication and authorization
- **HTTPS**: Enable SSL/TLS encryption
- **Environment Variables**: Configure ports and settings via environment variables

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Change the port in `server.js` or kill the process using the port

2. **File Upload Fails**
   - Check file size (max 100MB)
   - Verify file type is supported
   - Ensure uploads directory has write permissions

3. **CORS Errors**
   - Backend server includes CORS middleware
   - Ensure frontend is accessing the correct backend URL

4. **Files Not Loading**
   - Check that the backend server is running
   - Verify file paths in the database
   - Check browser console for errors

## Support

For technical support or questions, please contact the church administration.

---

**Gospel Baptist Church**  
6222 University Ave, Des Moines, IA 50311  
Email: desmoinesgbc@gmail.com  
Phone: +1 515 346 5562
