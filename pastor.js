// Pastor dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check pastor authentication first
    if (!checkPastorAuth()) {
        return;
    }
    
    initFileUploads();
    initSermonForm();
    loadUploadedSermons();
    initNewsForm();
    loadPublishedNews();
    initCalendarManagement();
});

// Check pastor authentication
async function checkPastorAuth() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    
    if (!token || !role) {
        alert('Please log in as pastor to access this page.');
        window.location.href = 'index.html';
        return false;
    }
    
    // Verify token with server
    try {
        const response = await fetch('http://localhost:3000/api/auth/status', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (!data.authenticated) {
            alert('Session expired. Please log in again.');
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            window.location.href = 'index.html';
            return false;
        }
        
        // Check if user has pastor role
        if (data.role !== 'pastor') {
            alert('Access denied. Pastor privileges required.');
            window.location.href = 'index.html';
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Auth check error:', error);
        alert('Authentication error. Please try again.');
        window.location.href = 'index.html';
        return false;
    }
}

// Logout function
async function logout() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        try {
            await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

// Initialize file upload functionality
function initFileUploads() {
    const uploadAreas = [
        { id: 'coverPhotoArea', inputId: 'coverPhoto', previewId: 'coverPhotoPreview', type: 'image' },
        { id: 'videoArea', inputId: 'sermonVideo', previewId: 'videoPreview', type: 'video' },
        { id: 'audioArea', inputId: 'sermonAudio', previewId: 'audioPreview', type: 'audio' },
        { id: 'documentArea', inputId: 'sermonDocument', previewId: 'documentPreview', type: 'document' }
    ];

    uploadAreas.forEach(area => {
        const uploadArea = document.getElementById(area.id);
        const fileInput = document.getElementById(area.inputId);
        const previewArea = document.getElementById(area.previewId);

        if (uploadArea && fileInput && previewArea) {
            uploadArea.addEventListener('click', () => fileInput.click());
            
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    handleFileUpload(file, previewArea, area.type);
                }
            });

            // Drag and drop functionality
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '#000';
                uploadArea.style.backgroundColor = '#f0f0f0';
            });

            uploadArea.addEventListener('dragleave', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '';
                uploadArea.style.backgroundColor = '';
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '';
                uploadArea.style.backgroundColor = '';
                
                const file = e.dataTransfer.files[0];
                if (file) {
                    fileInput.files = e.dataTransfer.files;
                    handleFileUpload(file, previewArea, area.type);
                }
            });
        }
    });
}

// Handle file upload and preview
function handleFileUpload(file, previewArea, type) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        previewArea.innerHTML = '';
        previewArea.classList.add('show');

        const fileInfo = document.createElement('div');
        fileInfo.className = 'file-info';
        fileInfo.innerHTML = `
            <strong>${file.name}</strong><br>
            Size: ${formatFileSize(file.size)}<br>
            Type: ${file.type}
        `;

        switch (type) {
            case 'image':
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;
                previewArea.appendChild(img);
                break;
                
            case 'video':
                const video = document.createElement('video');
                video.src = e.target.result;
                video.controls = true;
                video.preload = 'metadata';
                previewArea.appendChild(video);
                break;
                
            case 'audio':
                const audio = document.createElement('audio');
                audio.src = e.target.result;
                audio.controls = true;
                audio.preload = 'metadata';
                previewArea.appendChild(audio);
                break;
                
            case 'document':
                const docIcon = document.createElement('i');
                docIcon.className = 'fas fa-file-alt';
                docIcon.style.fontSize = '3rem';
                docIcon.style.color = '#666';
                docIcon.style.marginBottom = '1rem';
                previewArea.appendChild(docIcon);
                break;
        }

        previewArea.appendChild(fileInfo);
    };

    reader.readAsDataURL(file);
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Initialize sermon form functionality
function initSermonForm() {
    const form = document.getElementById('sermonUploadForm');
    const saveDraftBtn = document.getElementById('saveDraft');
    const previewBtn = document.getElementById('previewSermon');

    if (form) {
        form.addEventListener('submit', handleSermonSubmit);
    }

    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => handleSermonSubmit(null, true));
    }

    if (previewBtn) {
        previewBtn.addEventListener('click', previewSermon);
    }
}

// Handle sermon form submission
function handleSermonSubmit(e, isDraft = false) {
    if (e) e.preventDefault();

    const formData = new FormData();
    const form = document.getElementById('sermonUploadForm');
    
    // Get form data
    const title = document.getElementById('sermonTitle').value;
    const date = document.getElementById('sermonDate').value;
    const description = document.getElementById('sermonDescription').value;
    const scripture = document.getElementById('sermonScripture').value;
    const transcript = document.getElementById('sermonTranscript').value;
    const category = document.getElementById('sermonCategory').value;
    const visibility = document.getElementById('sermonVisibility').value;
    const featured = document.getElementById('featuredSermon').checked;

    // Validate required fields
    if (!title || !date) {
        alert('Please fill in all required fields (Title and Date)');
        return;
    }

    // Add form data
    formData.append('title', title);
    formData.append('date', date);
    formData.append('description', description);
    formData.append('scripture', scripture);
    formData.append('transcript', transcript);
    formData.append('category', category);
    formData.append('visibility', visibility);
    formData.append('featured', featured);
    formData.append('status', isDraft ? 'draft' : 'published');

    // Add files
    const coverPhoto = document.getElementById('coverPhoto').files[0];
    const video = document.getElementById('sermonVideo').files[0];
    const audio = document.getElementById('sermonAudio').files[0];
    const sermonDocument = document.getElementById('sermonDocument').files[0];

    if (coverPhoto) formData.append('coverPhoto', coverPhoto);
    if (video) formData.append('video', video);
    if (audio) formData.append('audio', audio);
    if (sermonDocument) formData.append('document', sermonDocument);

    // Simulate upload (in real implementation, this would send to server)
    simulateUpload(formData, isDraft);
}

// Upload sermon to server
async function simulateUpload(formData, isDraft) {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        alert('Authentication required. Please log in again.');
        window.location.href = 'index.html';
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('#sermonUploadForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Uploading...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('http://localhost:3000/api/sermons/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Reset form
            document.getElementById('sermonUploadForm').reset();
            clearFilePreviews();

            // Show success message
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            const status = isDraft ? 'saved as draft' : 'uploaded successfully';
            const visibility = formData.get('visibility');
            let visibilityMessage = '';
            
            if (visibility === 'public') {
                visibilityMessage = 'The sermon will appear on the public Sermons page.';
            } else if (visibility === 'private') {
                visibilityMessage = 'The sermon is private and only visible to you.';
            }
            
            alert(`Sermon ${status}!\n\n${visibilityMessage}`);
            
            // Reload sermons list
            loadUploadedSermons();
        } else {
            throw new Error(data.error || 'Upload failed');
        }
    } catch (error) {
        console.error('Upload error:', error);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert(`Upload failed: ${error.message}`);
    }
}

// Clear file previews
function clearFilePreviews() {
    const previews = document.querySelectorAll('.file-preview');
    previews.forEach(preview => {
        preview.innerHTML = '';
        preview.classList.remove('show');
    });
}

// Preview sermon
function previewSermon() {
    const title = document.getElementById('sermonTitle').value;
    const date = document.getElementById('sermonDate').value;
    const description = document.getElementById('sermonDescription').value;
    const transcript = document.getElementById('sermonTranscript').value;

    if (!title || !date) {
        alert('Please fill in Title and Date to preview');
        return;
    }

    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Sermon Preview - ${title}</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                h1 { color: #333; }
                .meta { color: #666; margin-bottom: 20px; }
                .description { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
                .transcript { line-height: 1.6; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <div class="meta">
                <strong>Date:</strong> ${date}<br>
                <strong>Category:</strong> ${document.getElementById('sermonCategory').value}
            </div>
            ${description ? `<div class="description"><strong>Description:</strong> ${description}</div>` : ''}
            ${transcript ? `<div class="transcript"><strong>Transcript:</strong><br>${transcript}</div>` : ''}
        </body>
        </html>
    `);
}

// Load uploaded sermons
async function loadUploadedSermons() {
    const sermonsList = document.getElementById('uploadedSermonsList');
    if (!sermonsList) return;

    const token = localStorage.getItem('authToken');
    
    if (!token) {
        sermonsList.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">Authentication required.</p>';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/sermons', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const sermons = await response.json();
        
        if (sermons.length === 0) {
            sermonsList.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">No sermons uploaded yet.</p>';
            return;
        }

        sermonsList.innerHTML = sermons.map(sermon => `
            <div class="sermon-item">
                <h4>${sermon.title}</h4>
                <div class="sermon-meta">
                    <div><strong>Date:</strong> ${sermon.date}</div>
                    <div><strong>Category:</strong> ${sermon.category}</div>
                    <div><strong>Visibility:</strong> ${sermon.visibility}</div>
                    <div><strong>Uploaded:</strong> ${new Date(sermon.uploadDate).toLocaleDateString()}</div>
                </div>
                <span class="status-badge ${sermon.status}">${sermon.status}</span>
                ${sermon.description ? `<p style="margin: 10px 0; font-size: 0.9rem;">${sermon.description}</p>` : ''}
                <div class="sermon-actions">
                    <button class="btn btn-primary" onclick="editSermon(${sermon.id})">Edit</button>
                    <button class="btn btn-secondary" onclick="deleteSermon(${sermon.id})">Delete</button>
                    <button class="btn btn-secondary" onclick="viewSermon(${sermon.id})">View</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading sermons:', error);
        sermonsList.innerHTML = '<p style="text-align: center; color: #ff0000; grid-column: 1 / -1;">Error loading sermons. Please try again.</p>';
    }
}

// Edit sermon
function editSermon(id) {
    const sermons = JSON.parse(localStorage.getItem('uploadedSermons') || '[]');
    const sermon = sermons.find(s => s.id === id);
    
    if (sermon) {
        // Populate form with sermon data
        document.getElementById('sermonTitle').value = sermon.title;
        document.getElementById('sermonDate').value = sermon.date;
        document.getElementById('sermonDescription').value = sermon.description || '';
        document.getElementById('sermonScripture').value = sermon.scripture || '';
        document.getElementById('sermonTranscript').value = sermon.transcript || '';
        document.getElementById('sermonCategory').value = sermon.category;
        document.getElementById('sermonVisibility').value = sermon.visibility;
        document.getElementById('featuredSermon').checked = sermon.featured;
        
        // Scroll to form
        document.querySelector('.pastor-upload-section').scrollIntoView({ behavior: 'smooth' });
        
        alert('Sermon data loaded into form. Update and submit to save changes.');
    }
}

// Delete sermon
async function deleteSermon(id) {
    if (!confirm('Are you sure you want to delete this sermon?')) {
        return;
    }
    
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        alert('Authentication required. Please log in again.');
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/sermons/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Sermon deleted successfully!');
            loadUploadedSermons();
        } else {
            throw new Error(data.error || 'Delete failed');
        }
    } catch (error) {
        console.error('Delete error:', error);
        alert(`Delete failed: ${error.message}`);
    }
}

// View sermon
function viewSermon(id) {
    const sermons = JSON.parse(localStorage.getItem('uploadedSermons') || '[]');
    const sermon = sermons.find(s => s.id === id);
    
    if (sermon) {
        const viewWindow = window.open('', '_blank');
        viewWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${sermon.title} - Gospel Baptist Church</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                    h1 { color: #333; }
                    .meta { color: #666; margin-bottom: 20px; }
                    .description { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
                    .transcript { line-height: 1.6; }
                    .files { margin: 20px 0; }
                    .file-item { display: inline-block; margin: 10px; padding: 10px; background: #f0f0f0; border-radius: 5px; }
                </style>
            </head>
            <body>
                <h1>${sermon.title}</h1>
                <div class="meta">
                    <strong>Date:</strong> ${sermon.date}<br>
                    <strong>Category:</strong> ${sermon.category}<br>
                    <strong>Status:</strong> ${sermon.status}
                </div>
                ${sermon.description ? `<div class="description"><strong>Description:</strong> ${sermon.description}</div>` : ''}
                ${sermon.scripture ? `<div><strong>Scripture:</strong> ${sermon.scripture}</div>` : ''}
                ${sermon.transcript ? `<div class="transcript"><strong>Transcript:</strong><br>${sermon.transcript}</div>` : ''}
                <div class="files">
                    <h3>Attached Files:</h3>
                    ${sermon.files.hasCoverPhoto ? '<div class="file-item">📷 Cover Photo</div>' : ''}
                    ${sermon.files.hasVideo ? '<div class="file-item">🎥 Video</div>' : ''}
                    ${sermon.files.hasAudio ? '<div class="file-item">🎵 Audio</div>' : ''}
                    ${sermon.files.hasDocument ? '<div class="file-item">📄 Document</div>' : ''}
                </div>
            </body>
            </html>
        `);
    }
}

// Initialize news form functionality
function initNewsForm() {
    const form = document.getElementById('newsForm');
    const saveDraftBtn = document.getElementById('saveNewsDraft');
    const previewBtn = document.getElementById('previewNews');

    if (form) {
        form.addEventListener('submit', handleNewsSubmit);
    }

    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => handleNewsSubmit(null, true));
    }

    if (previewBtn) {
        previewBtn.addEventListener('click', previewNews);
    }
}

// Handle news form submission
async function handleNewsSubmit(e, isDraft = false) {
    if (e) e.preventDefault();

    const token = localStorage.getItem('authToken');
    
    if (!token) {
        alert('Authentication required. Please log in again.');
        window.location.href = 'index.html';
        return;
    }

    const title = document.getElementById('newsTitle').value;
    const date = document.getElementById('newsDate').value;
    const category = document.getElementById('newsCategory').value;
    const content = document.getElementById('newsContent').value;
    const priority = document.getElementById('newsPriority').value;
    const featured = document.getElementById('newsFeatured').checked;
    const sendEmail = document.getElementById('newsEmail').checked;

    // Validate required fields
    if (!title || !date || !content) {
        alert('Please fill in all required fields (Title, Date, and Content)');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                date: date,
                category: category,
                content: content,
                priority: priority,
                featured: featured,
                sendEmail: sendEmail,
                status: isDraft ? 'draft' : 'published'
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Reset form
            document.getElementById('newsForm').reset();

            // Show success message
            const status = isDraft ? 'saved as draft' : 'published successfully';
            alert(`News ${status}!`);
            
            // Reload news list
            loadPublishedNews();
        } else {
            throw new Error(data.error || 'News submission failed');
        }
    } catch (error) {
        console.error('News submission error:', error);
        alert(`News submission failed: ${error.message}`);
    }
}

// Preview news
function previewNews() {
    const title = document.getElementById('newsTitle').value;
    const date = document.getElementById('newsDate').value;
    const category = document.getElementById('newsCategory').value;
    const content = document.getElementById('newsContent').value;
    const priority = document.getElementById('newsPriority').value;

    if (!title || !date || !content) {
        alert('Please fill in Title, Date, and Content to preview');
        return;
    }

    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>News Preview - ${title}</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                h1 { color: #333; }
                .meta { color: #666; margin-bottom: 20px; }
                .content { line-height: 1.6; }
                .badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; margin: 0.5rem; }
                .priority-${priority} { background: ${priority === 'urgent' ? '#f8d7da' : priority === 'important' ? '#fff3cd' : '#f8f9fa'}; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <div class="meta">
                <strong>Date:</strong> ${date}<br>
                <strong>Category:</strong> ${category}<br>
                <strong>Priority:</strong> <span class="badge priority-${priority}">${priority}</span>
            </div>
            <div class="content">${content}</div>
        </body>
        </html>
    `);
}

// Load published news
async function loadPublishedNews() {
    const newsList = document.getElementById('publishedNewsList');
    if (!newsList) return;

    const token = localStorage.getItem('authToken');
    
    if (!token) {
        newsList.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">Authentication required.</p>';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/news', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const news = await response.json();
        
        if (news.length === 0) {
            newsList.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">No news published yet.</p>';
            return;
        }

        // Sort news by date (newest first) and featured status
        news.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return new Date(b.date) - new Date(a.date);
        });

        newsList.innerHTML = news.map(item => `
            <div class="news-item ${item.featured ? 'featured' : ''} ${item.priority}">
                <h4>${item.title}</h4>
                <div class="news-meta">
                    <div><strong>Date:</strong> ${item.date}</div>
                    <div><strong>Category:</strong> <span class="category-badge">${item.category}</span></div>
                    <div><strong>Priority:</strong> <span class="priority-badge ${item.priority}">${item.priority}</span></div>
                    <div><strong>Status:</strong> <span class="status-badge ${item.status}">${item.status}</span></div>
                    <div><strong>Published:</strong> ${new Date(item.publishDate).toLocaleDateString()}</div>
                </div>
                <div class="news-content">${item.content}</div>
                <div class="news-actions">
                    <button class="btn btn-primary" onclick="editNews(${item.id})">Edit</button>
                    <button class="btn btn-secondary" onclick="deleteNews(${item.id})">Delete</button>
                    <button class="btn btn-secondary" onclick="viewNews(${item.id})">View</button>
                    ${item.featured ? '<span class="badge" style="background: #ff6b35; color: white;">📌 Featured</span>' : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading news:', error);
        newsList.innerHTML = '<p style="text-align: center; color: #ff0000; grid-column: 1 / -1;">Error loading news. Please try again.</p>';
    }
}

// Edit news
function editNews(id) {
    const news = JSON.parse(localStorage.getItem('publishedNews') || '[]');
    const newsItem = news.find(n => n.id === id);
    
    if (newsItem) {
        // Populate form with news data
        document.getElementById('newsTitle').value = newsItem.title;
        document.getElementById('newsDate').value = newsItem.date;
        document.getElementById('newsCategory').value = newsItem.category;
        document.getElementById('newsContent').value = newsItem.content;
        document.getElementById('newsPriority').value = newsItem.priority;
        document.getElementById('newsFeatured').checked = newsItem.featured;
        document.getElementById('newsEmail').checked = newsItem.sendEmail;
        
        // Scroll to form
        document.querySelector('.pastor-news-section').scrollIntoView({ behavior: 'smooth' });
        
        alert('News data loaded into form. Update and submit to save changes.');
    }
}

// Delete news
async function deleteNews(id) {
    if (!confirm('Are you sure you want to delete this news item?')) {
        return;
    }
    
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        alert('Authentication required. Please log in again.');
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/news/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('News deleted successfully!');
            loadPublishedNews();
        } else {
            throw new Error(data.error || 'Delete failed');
        }
    } catch (error) {
        console.error('Delete error:', error);
        alert(`Delete failed: ${error.message}`);
    }
}

// View news
function viewNews(id) {
    const news = JSON.parse(localStorage.getItem('publishedNews') || '[]');
    const newsItem = news.find(n => n.id === id);
    
    if (newsItem) {
        const viewWindow = window.open('', '_blank');
        viewWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${newsItem.title} - Gospel Baptist Church</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                    h1 { color: #333; }
                    .meta { color: #666; margin-bottom: 20px; }
                    .content { line-height: 1.6; }
                    .badge { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; margin: 0.5rem; }
                    .priority-${newsItem.priority} { background: ${newsItem.priority === 'urgent' ? '#f8d7da' : newsItem.priority === 'important' ? '#fff3cd' : '#f8f9fa'}; }
                    .featured { background: #ff6b35; color: white; }
                </style>
            </head>
            <body>
                <h1>${newsItem.title}</h1>
                <div class="meta">
                    <strong>Date:</strong> ${newsItem.date}<br>
                    <strong>Category:</strong> <span class="badge">${newsItem.category}</span><br>
                    <strong>Priority:</strong> <span class="badge priority-${newsItem.priority}">${newsItem.priority}</span><br>
                    <strong>Status:</strong> ${newsItem.status}<br>
                    <strong>Author:</strong> ${newsItem.author}<br>
                    <strong>Published:</strong> ${new Date(newsItem.publishDate).toLocaleDateString()}
                    ${newsItem.featured ? '<br><span class="badge featured">📌 Featured</span>' : ''}
                </div>
                <div class="content">${newsItem.content}</div>
            </body>
            </html>
        `);
    }
}

// ========================================
// CALENDAR MANAGEMENT FUNCTIONS
// ========================================

// Initialize calendar management
function initCalendarManagement() {
    const addEventBtn = document.getElementById('addCalendarEventBtn');
    const refreshBtn = document.getElementById('refreshCalendarBtn');
    const modal = document.getElementById('calendarEventModal');
    const form = document.getElementById('calendarEventForm');
    const deleteBtn = document.getElementById('deleteCalendarEventBtn');
    const cancelBtn = document.getElementById('cancelCalendarEventBtn');
    
    if (addEventBtn) {
        addEventBtn.addEventListener('click', () => openCalendarEventModal());
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => loadCalendarEvents());
    }
    
    if (form) {
        form.addEventListener('submit', (e) => handleCalendarEventSubmit(e));
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => deleteCalendarEvent());
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => closeCalendarEventModal());
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCalendarEventModal();
            }
        });
    }
    
    // Close modal when clicking close button
    const closeBtn = modal?.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => closeCalendarEventModal());
    }
    
    // Load initial events
    loadCalendarEvents();
}

// Open calendar event modal
function openCalendarEventModal(eventId = null) {
    const modal = document.getElementById('calendarEventModal');
    const form = document.getElementById('calendarEventForm');
    const title = document.getElementById('calendarModalTitle');
    const deleteBtn = document.getElementById('deleteCalendarEventBtn');
    
    if (eventId) {
        // Edit mode
        const event = getCalendarEventById(eventId);
        if (event) {
            populateCalendarEventForm(event);
            title.textContent = 'Edit Event';
            deleteBtn.style.display = 'inline-block';
            currentEditingEventId = eventId;
        }
    } else {
        // Add mode
        resetCalendarEventForm();
        title.textContent = 'Add New Event';
        deleteBtn.style.display = 'none';
        currentEditingEventId = null;
    }
    
    modal.style.display = 'block';
}

// Close calendar event modal
function closeCalendarEventModal() {
    const modal = document.getElementById('calendarEventModal');
    modal.style.display = 'none';
    resetCalendarEventForm();
    currentEditingEventId = null;
}

// Reset calendar event form
function resetCalendarEventForm() {
    const form = document.getElementById('calendarEventForm');
    if (form) {
        form.reset();
        document.getElementById('calendarEventDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('calendarEventTime').value = '12:00';
        document.getElementById('calendarEventColor').value = '#FF0000';
        document.getElementById('calendarEventDuration').value = '1';
        document.getElementById('calendarEventAllDay').checked = false;
    }
}

// Populate calendar event form with existing data
function populateCalendarEventForm(event) {
    document.getElementById('calendarEventTitle').value = event.title;
    document.getElementById('calendarEventDate').value = event.start.split('T')[0];
    document.getElementById('calendarEventTime').value = event.start.split('T')[1].substring(0, 5);
    document.getElementById('calendarEventDescription').value = event.description || '';
    document.getElementById('calendarEventColor').value = event.color || '#FF0000';
    
    if (event.allDay) {
        document.getElementById('calendarEventAllDay').checked = true;
        document.getElementById('calendarEventTime').disabled = true;
        document.getElementById('calendarEventDuration').disabled = true;
    } else {
        document.getElementById('calendarEventAllDay').checked = false;
        document.getElementById('calendarEventTime').disabled = false;
        document.getElementById('calendarEventDuration').disabled = false;
        
        // Calculate duration
        const start = new Date(event.start);
        const end = new Date(event.end);
        const durationHours = (end - start) / (1000 * 60 * 60);
        document.getElementById('calendarEventDuration').value = durationHours;
    }
}

// Handle calendar event form submission
async function handleCalendarEventSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const eventData = {
        title: formData.get('title'),
        date: formData.get('date'),
        time: formData.get('time'),
        description: formData.get('description'),
        color: formData.get('color'),
        duration: parseFloat(formData.get('duration')),
        allDay: formData.get('allDay') === 'on'
    };
    
    try {
        if (currentEditingEventId) {
            // Update existing event
            await updateCalendarEvent(currentEditingEventId, eventData);
        } else {
            // Add new event
            await addCalendarEvent(eventData);
        }
        
        closeCalendarEventModal();
        loadCalendarEvents();
        showSuccessMessage(currentEditingEventId ? 'Event updated successfully!' : 'Event added successfully!');
    } catch (error) {
        console.error('Calendar event error:', error);
        alert(`Failed to save event: ${error.message}`);
    }
}

// Add new calendar event
async function addCalendarEvent(eventData) {
    const newEvent = {
        id: Date.now().toString(),
        title: eventData.title,
        start: eventData.allDay ? eventData.date : `${eventData.date}T${eventData.time}:00`,
        end: eventData.allDay ? eventData.date : `${eventData.date}T${eventData.time}:00`,
        description: eventData.description,
        color: eventData.color,
        allDay: eventData.allDay
    };
    
    if (!eventData.allDay) {
        const startTime = new Date(newEvent.start);
        const endTime = new Date(startTime.getTime() + (eventData.duration * 60 * 60 * 1000));
        newEvent.end = endTime.toISOString();
    }
    
    // Save to localStorage
    const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
    events.push(newEvent);
    localStorage.setItem('calendarEvents', JSON.stringify(events));
    
    // Update calendar page if it's open
    if (window.calendarManager) {
        window.calendarManager.addEvent(newEvent);
    }
    
    return newEvent;
}

// Update existing calendar event
async function updateCalendarEvent(eventId, eventData) {
    const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
    const eventIndex = events.findIndex(e => e.id === eventId);
    
    if (eventIndex === -1) {
        throw new Error('Event not found');
    }
    
    const updatedEvent = {
        ...events[eventIndex],
        title: eventData.title,
        start: eventData.allDay ? eventData.date : `${eventData.date}T${eventData.time}:00`,
        end: eventData.allDay ? eventData.date : `${eventData.date}T${eventData.time}:00`,
        description: eventData.description,
        color: eventData.color,
        allDay: eventData.allDay
    };
    
    if (!eventData.allDay) {
        const startTime = new Date(updatedEvent.start);
        const endTime = new Date(startTime.getTime() + (eventData.duration * 60 * 60 * 1000));
        updatedEvent.end = endTime.toISOString();
    }
    
    events[eventIndex] = updatedEvent;
    localStorage.setItem('calendarEvents', JSON.stringify(events));
    
    // Update calendar page if it's open
    if (window.calendarManager) {
        window.calendarManager.updateEvent(eventId, updatedEvent);
    }
    
    return updatedEvent;
}

// Delete calendar event
async function deleteCalendarEvent() {
    if (!currentEditingEventId) return;
    
    if (!confirm('Are you sure you want to delete this event?')) {
        return;
    }
    
    try {
        const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
        const filteredEvents = events.filter(e => e.id !== currentEditingEventId);
        localStorage.setItem('calendarEvents', JSON.stringify(filteredEvents));
        
        // Update calendar page if it's open
        if (window.calendarManager) {
            window.calendarManager.deleteEvent(currentEditingEventId);
        }
        
        closeCalendarEventModal();
        loadCalendarEvents();
        showSuccessMessage('Event deleted successfully!');
    } catch (error) {
        console.error('Delete error:', error);
        alert(`Failed to delete event: ${error.message}`);
    }
}

// Load calendar events
function loadCalendarEvents() {
    const eventsList = document.getElementById('calendarEventsList');
    if (!eventsList) return;
    
    const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
    
    if (events.length === 0) {
        eventsList.innerHTML = '<p class="no-events" data-en="No events found. Add your first event!" data-my="အစီအစဉ်များ မတွေ့ရပါ။ ပထမဆုံး အစီအစဉ်ကို ထည့်သွင်းပါ!">No events found. Add your first event!</p>';
        return;
    }
    
    // Sort events by date
    events.sort((a, b) => new Date(a.start) - new Date(b.start));
    
    const eventsHTML = events.map(event => {
        const startDate = new Date(event.start);
        const endDate = event.end ? new Date(event.end) : startDate;
        const isPast = startDate < new Date();
        
        return `
            <div class="calendar-event-item ${isPast ? 'past-event' : ''}" data-event-id="${event.id}">
                <div class="event-header">
                    <div class="event-color" style="background-color: ${event.color}"></div>
                    <div class="event-info">
                        <h4 class="event-title">${event.title}</h4>
                        <p class="event-date">
                            <i class="fas fa-calendar"></i>
                            ${startDate.toLocaleDateString()} 
                            ${!event.allDay ? `at ${startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : ''}
                        </p>
                        ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
                    </div>
                </div>
                <div class="event-actions">
                    <button class="btn btn-sm btn-primary" onclick="openCalendarEventModal('${event.id}')" data-en="Edit" data-my="တည်းဖြတ်ရန်">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCalendarEventById('${event.id}')" data-en="Delete" data-my="ဖျက်ရန်">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    eventsList.innerHTML = eventsHTML;
}

// Delete calendar event by ID
function deleteCalendarEventById(eventId) {
    if (!confirm('Are you sure you want to delete this event?')) {
        return;
    }
    
    try {
        const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
        const filteredEvents = events.filter(e => e.id !== eventId);
        localStorage.setItem('calendarEvents', JSON.stringify(filteredEvents));
        
        // Update calendar page if it's open
        if (window.calendarManager) {
            window.calendarManager.deleteEvent(eventId);
        }
        
        loadCalendarEvents();
        showSuccessMessage('Event deleted successfully!');
    } catch (error) {
        console.error('Delete error:', error);
        alert(`Failed to delete event: ${error.message}`);
    }
}

// Get calendar event by ID
function getCalendarEventById(eventId) {
    const events = JSON.parse(localStorage.getItem('calendarEvents') || '[]');
    return events.find(e => e.id === eventId);
}

// Show success message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00AA00;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

// Global variable for tracking current editing event
let currentEditingEventId = null;
