const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Simple session storage (in production, use Redis or database)
const sessions = new Map();

// Authentication middleware
function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    const session = sessions.get(token);
    
    if (!session) {
        return res.status(401).json({ error: 'Invalid or expired session' });
    }
    
    req.user = session;
    next();
}

// Pastor-only middleware
function authenticatePastor(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    const session = sessions.get(token);
    
    if (!session) {
        return res.status(401).json({ error: 'Invalid or expired session' });
    }
    
    if (session.role !== 'pastor') {
        return res.status(403).json({ error: 'Pastor access required' });
    }
    
    req.user = session;
    next();
}

// Login endpoint
app.post('/api/auth/login', (req, res) => {
    const { password, role } = req.body;
    
    // Simple password validation (in production, use proper authentication)
    const validPasswords = {
        member: '12345',
        pastor: '54321'
    };
    
    if (!password || !role || !validPasswords[role]) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    if (password !== validPasswords[role]) {
        return res.status(401).json({ error: 'Invalid password' });
    }
    
    // Generate session token
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const session = {
        role: role,
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString()
    };
    
    sessions.set(token, session);
    
    // Clean up old sessions (older than 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    for (const [oldToken, oldSession] of sessions.entries()) {
        if (new Date(oldSession.lastActivity) < oneDayAgo) {
            sessions.delete(oldToken);
        }
    }
    
    res.json({
        success: true,
        token: token,
        role: role,
        message: `${role === 'pastor' ? 'Pastor' : 'Member'} login successful`
    });
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        sessions.delete(token);
    }
    
    res.json({ success: true, message: 'Logged out successfully' });
});

// Check authentication status
app.get('/api/auth/status', (req, res) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.json({ authenticated: false });
    }
    
    const token = authHeader.replace('Bearer ', '');
    const session = sessions.get(token);
    
    if (!session) {
        return res.json({ authenticated: false });
    }
    
    // Update last activity
    session.lastActivity = new Date().toISOString();
    sessions.set(token, session);
    
    res.json({
        authenticated: true,
        role: session.role,
        loginTime: session.loginTime
    });
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
const sermonsDir = path.join(uploadsDir, 'sermons');
const audioDir = path.join(sermonsDir, 'audio');
const videoDir = path.join(sermonsDir, 'video');
const documentsDir = path.join(sermonsDir, 'documents');
const imagesDir = path.join(sermonsDir, 'images');

[uploadsDir, sermonsDir, audioDir, videoDir, documentsDir, imagesDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = sermonsDir;
        
        // Determine upload directory based on file type
        if (file.fieldname === 'coverPhoto') {
            uploadPath = imagesDir;
        } else if (file.fieldname === 'audio') {
            uploadPath = audioDir;
        } else if (file.fieldname === 'video') {
            uploadPath = videoDir;
        } else if (file.fieldname === 'document') {
            uploadPath = documentsDir;
        }
        
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    },
    fileFilter: function (req, file, cb) {
        // Check file types
        const allowedTypes = {
            'coverPhoto': ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            'audio': ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4'],
            'video': ['video/mp4', 'video/webm', 'video/ogg', 'video/avi'],
            'document': ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        };
        
        const fieldTypes = allowedTypes[file.fieldname];
        if (fieldTypes && fieldTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type for ${file.fieldname}`), false);
        }
    }
});

// In-memory storage for sermons (in production, use a database)
let sermons = [];
let sermonIdCounter = 1;

// In-memory storage for news (in production, use a database)
let news = [];
let newsIdCounter = 1;

// In-memory storage for members (in production, use a database)
let members = [];
let memberIdCounter = 1;

// Load existing sermons from file if it exists
const sermonsFile = path.join(__dirname, 'sermons.json');
if (fs.existsSync(sermonsFile)) {
    try {
        const data = fs.readFileSync(sermonsFile, 'utf8');
        sermons = JSON.parse(data);
        if (sermons.length > 0) {
            sermonIdCounter = Math.max(...sermons.map(s => s.id)) + 1;
        }
    } catch (error) {
        console.error('Error loading sermons:', error);
    }
}

// Load existing news from file if it exists
const newsFile = path.join(__dirname, 'news.json');
if (fs.existsSync(newsFile)) {
    try {
        const data = fs.readFileSync(newsFile, 'utf8');
        news = JSON.parse(data);
        if (news.length > 0) {
            newsIdCounter = Math.max(...news.map(n => n.id)) + 1;
        }
    } catch (error) {
        console.error('Error loading news:', error);
    }
}

// Save sermons to file
function saveSermons() {
    try {
        fs.writeFileSync(sermonsFile, JSON.stringify(sermons, null, 2));
    } catch (error) {
        console.error('Error saving sermons:', error);
    }
}

// Save news to file
function saveNews() {
    try {
        fs.writeFileSync(newsFile, JSON.stringify(news, null, 2));
    } catch (error) {
        console.error('Error saving news:', error);
    }
}

// Load members from file
function loadMembers() {
    try {
        const membersFile = path.join(__dirname, 'data', 'members.json');
        if (fs.existsSync(membersFile)) {
            const data = fs.readFileSync(membersFile, 'utf8');
            members = JSON.parse(data);
            memberIdCounter = Math.max(...members.map(m => m.id), 0) + 1;
        }
    } catch (error) {
        console.error('Error loading members:', error);
        members = [];
    }
}

// Save members to file
function saveMembers() {
    try {
        const membersFile = path.join(__dirname, 'data', 'members.json');
        fs.writeFileSync(membersFile, JSON.stringify(members, null, 2));
    } catch (error) {
        console.error('Error saving members:', error);
    }
}

// Routes

// Get all sermons
app.get('/api/sermons', (req, res) => {
    const { visibility, status } = req.query;
    let filteredSermons = [...sermons];
    
    if (visibility) {
        filteredSermons = filteredSermons.filter(s => s.visibility === visibility);
    }
    
    if (status) {
        filteredSermons = filteredSermons.filter(s => s.status === status);
    }
    
    res.json(filteredSermons);
});

// Get sermon by ID
app.get('/api/sermons/:id', (req, res) => {
    const sermon = sermons.find(s => s.id === parseInt(req.params.id));
    if (sermon) {
        res.json(sermon);
    } else {
        res.status(404).json({ error: 'Sermon not found' });
    }
});

// Upload sermon (Pastor only)
app.post('/api/sermons/upload', authenticatePastor, upload.fields([
    { name: 'coverPhoto', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'document', maxCount: 1 }
]), (req, res) => {
    console.log('📥 Sermon upload request received');
    console.log('📋 Form data:', {
        title: req.body.title,
        date: req.body.date,
        pastor: req.body.pastor,
        visibility: req.body.visibility,
        status: req.body.status
    });
    console.log('📁 Files received:', req.files ? Object.keys(req.files) : 'No files');
    
    try {
        const sermonData = {
            id: sermonIdCounter++,
            title: req.body.title,
            date: req.body.date,
            description: req.body.description || '',
            scripture: req.body.scripture || '',
            transcript: req.body.transcript || '',
            category: req.body.category || 'worship',
            visibility: req.body.visibility || 'public',
            featured: req.body.featured === 'true',
            status: req.body.status || 'published',
            pastor: req.body.pastor || 'Pastor Paul',
            uploadDate: new Date().toISOString(),
            files: {}
        };

        // Process uploaded files
        if (req.files) {
            console.log('📁 Processing uploaded files...');
            
            if (req.files.coverPhoto) {
                console.log('📷 Processing cover photo:', req.files.coverPhoto[0].originalname);
                sermonData.files.coverPhoto = {
                    filename: req.files.coverPhoto[0].filename,
                    originalName: req.files.coverPhoto[0].originalname,
                    path: `/uploads/sermons/images/${req.files.coverPhoto[0].filename}`,
                    size: req.files.coverPhoto[0].size
                };
            }
            
            if (req.files.audio) {
                console.log('🎵 Processing audio file:', req.files.audio[0].originalname);
                sermonData.files.audio = {
                    filename: req.files.audio[0].filename,
                    originalName: req.files.audio[0].originalname,
                    path: `/uploads/sermons/audio/${req.files.audio[0].filename}`,
                    size: req.files.audio[0].size
                };
            }
            
            if (req.files.video) {
                console.log('🎥 Processing video file:', req.files.video[0].originalname);
                sermonData.files.video = {
                    filename: req.files.video[0].filename,
                    originalName: req.files.video[0].originalname,
                    path: `/uploads/sermons/video/${req.files.video[0].filename}`,
                    size: req.files.video[0].size
                };
            }
            
            if (req.files.document) {
                console.log('📄 Processing document file:', req.files.document[0].originalname);
                sermonData.files.document = {
                    filename: req.files.document[0].filename,
                    originalName: req.files.document[0].originalname,
                    path: `/uploads/sermons/documents/${req.files.document[0].filename}`,
                    size: req.files.document[0].size
                };
            }
        } else {
            console.log('📁 No files uploaded');
        }

        // Determine available formats
        sermonData.formats = [];
        if (sermonData.transcript) sermonData.formats.push('transcript');
        if (sermonData.files.audio) sermonData.formats.push('audio');
        if (sermonData.files.video) sermonData.formats.push('video');
        if (sermonData.files.document) sermonData.formats.push('document');

        console.log('📊 Sermon formats available:', sermonData.formats);
        console.log('💾 Saving sermon to database...');

        sermons.push(sermonData);
        saveSermons();

        console.log('✅ Sermon saved successfully!');
        console.log('📤 Sending response to client...');

        res.json({
            success: true,
            message: 'Sermon uploaded successfully',
            sermon: sermonData
        });

    } catch (error) {
        console.error('Error uploading sermon:', error);
        res.status(500).json({ error: 'Failed to upload sermon' });
    }
});

// Update sermon (Pastor only)
app.put('/api/sermons/:id', authenticatePastor, (req, res) => {
    const sermonIndex = sermons.findIndex(s => s.id === parseInt(req.params.id));
    if (sermonIndex !== -1) {
        sermons[sermonIndex] = { ...sermons[sermonIndex], ...req.body };
        saveSermons();
        res.json({ success: true, sermon: sermons[sermonIndex] });
    } else {
        res.status(404).json({ error: 'Sermon not found' });
    }
});

// Delete sermon (Pastor only)
app.delete('/api/sermons/:id', authenticatePastor, (req, res) => {
    const sermonIndex = sermons.findIndex(s => s.id === parseInt(req.params.id));
    if (sermonIndex !== -1) {
        const sermon = sermons[sermonIndex];
        
        // Delete associated files
        if (sermon.files) {
            Object.values(sermon.files).forEach(file => {
                if (file && file.filename) {
                    const filePath = path.join(__dirname, file.path);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
            });
        }
        
        sermons.splice(sermonIndex, 1);
        saveSermons();
        res.json({ success: true, message: 'Sermon deleted successfully' });
    } else {
        res.status(404).json({ error: 'Sermon not found' });
    }
});

// News API Routes

// Clean up expired news
function cleanupExpiredNews() {
    const now = new Date();
    const originalLength = news.length;
    
    news = news.filter(item => {
        if (!item.expiryDate) return true; // Keep items with no expiry
        const expiryDate = new Date(item.expiryDate);
        return expiryDate > now; // Keep items that haven't expired
    });
    
    const removedCount = originalLength - news.length;
    if (removedCount > 0) {
        console.log(`🗑️ Cleaned up ${removedCount} expired news items`);
        saveNews();
    }
}

// Get all news
app.get('/api/news', (req, res) => {
    // Clean up expired news before returning
    cleanupExpiredNews();
    
    const { status } = req.query;
    let filteredNews = [...news];
    
    if (status) {
        filteredNews = filteredNews.filter(n => n.status === status);
    }
    
    res.json(filteredNews);
});

// Get news by ID
app.get('/api/news/:id', (req, res) => {
    const newsItem = news.find(n => n.id === parseInt(req.params.id));
    if (newsItem) {
        res.json(newsItem);
    } else {
        res.status(404).json({ error: 'News not found' });
    }
});

// Create news (Pastor only)
app.post('/api/news', authenticatePastor, (req, res) => {
    console.log('📰 News creation request received');
    console.log('📋 News data:', {
        title: req.body.title,
        category: req.body.category,
        priority: req.body.priority,
        expiry: req.body.expiry
    });
    
    try {
        const publishDate = new Date().toISOString();
        let expiryDate = null;
        
        // Calculate expiry date if not "never"
        if (req.body.expiry && req.body.expiry !== 'never') {
            const days = parseInt(req.body.expiry);
            expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + days);
            expiryDate = expiryDate.toISOString();
        }
        
        const newsData = {
            id: newsIdCounter++,
            title: req.body.title,
            date: req.body.date,
            category: req.body.category || 'general',
            content: req.body.content,
            priority: req.body.priority || 'normal',
            featured: req.body.featured || false,
            sendEmail: req.body.sendEmail || false,
            status: req.body.status || 'published',
            publishDate: publishDate,
            expiryDate: expiryDate,
            author: req.body.author || 'Pastor Paul'
        };

        console.log('📅 Expiry date calculated:', expiryDate);

        news.push(newsData);
        saveNews();

        console.log('✅ News saved successfully');

        res.json({
            success: true,
            message: 'News created successfully',
            news: newsData
        });

    } catch (error) {
        console.error('❌ Error creating news:', error);
        res.status(500).json({ error: 'Failed to create news' });
    }
});

// Update news (Pastor only)
app.put('/api/news/:id', authenticatePastor, (req, res) => {
    console.log('📝 News update request received for ID:', req.params.id);
    
    const newsIndex = news.findIndex(n => n.id === parseInt(req.params.id));
    if (newsIndex !== -1) {
        // Handle expiry date calculation
        let updateData = { ...req.body };
        
        if (req.body.expiry && req.body.expiry !== 'never') {
            const days = parseInt(req.body.expiry);
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + days);
            updateData.expiryDate = expiryDate.toISOString();
        } else if (req.body.expiry === 'never') {
            updateData.expiryDate = null;
        }
        
        news[newsIndex] = { ...news[newsIndex], ...updateData };
        saveNews();
        
        console.log('✅ News updated successfully');
        res.json({ success: true, news: news[newsIndex] });
    } else {
        console.log('❌ News not found for update');
        res.status(404).json({ error: 'News not found' });
    }
});

// Delete news (Pastor only)
app.delete('/api/news/:id', authenticatePastor, (req, res) => {
    const newsIndex = news.findIndex(n => n.id === parseInt(req.params.id));
    if (newsIndex !== -1) {
        news.splice(newsIndex, 1);
        saveNews();
        res.json({ success: true, message: 'News deleted successfully' });
    } else {
        res.status(404).json({ error: 'News not found' });
    }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 100MB.' });
        }
    }
    
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Scheduled cleanup of expired news (runs every hour)
setInterval(() => {
    cleanupExpiredNews();
}, 60 * 60 * 1000); // 1 hour

// Start server
app.listen(PORT, () => {
    console.log(`Church website backend server running on port ${PORT}`);
    console.log(`Upload directory: ${uploadsDir}`);
    console.log(`Sermons loaded: ${sermons.length}`);
    console.log(`News items loaded: ${news.length}`);
    console.log('🕐 Scheduled news cleanup enabled (runs every hour)');
});
