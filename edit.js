// Edit Dashboard JavaScript
// Handles all functionality for the pastor edit dashboard

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    if (!checkPastorAuth()) {
        showAuthMessage();
        return;
    }

    // Initialize the dashboard
    initDashboard();
    initModals();
    loadDashboardStats();
});

// Check if user is authenticated as pastor
function checkPastorAuth() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    return token && role === 'pastor';
}

// Show authentication required message and login modal
function showAuthMessage() {
    document.getElementById('authMessage').style.display = 'block';
    document.querySelector('.edit-dashboard').style.display = 'none';
    
    // Show login modal
    showLoginModal();
}

// Show login modal
function showLoginModal() {
    const modalHtml = `
        <div class="modal" id="loginModal" style="display: block;">
            <div class="modal-content">
                <span class="close" onclick="closeLoginModal()">&times;</span>
                <h2 data-en="Pastor Login Required" data-my="ဓမ္မဆရာ ဝင်ရောက်ခြင်း လိုအပ်ပါသည်">Pastor Login Required</h2>
                
                <p data-en="You need to be logged in as a pastor to access the Edit Dashboard." data-my="Edit Dashboard ကို ဝင်ရောက်ရန် ဓမ္မဆရာအဖြစ် ဝင်ရောက်ရန် လိုအပ်ပါသည်">You need to be logged in as a pastor to access the Edit Dashboard.</p>
                
                <form id="loginForm" class="login-form">
                    <div class="form-group">
                        <label for="loginPassword" data-en="Enter 5-Digit Password" data-my="၅ လုံး စကားဝှက် ထည့်သွင်းပါ">Enter 5-Digit Password</label>
                        <input type="password" id="loginPassword" maxlength="5" pattern="[0-9]{5}" placeholder="54321" required>
                        <small data-en="Enter a 5-digit number" data-my="၅ လုံး ဂဏန်း ထည့်သွင်းပါ">Enter a 5-digit number</small>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary" data-en="Login" data-my="ဝင်ရောက်ရန်">Login</button>
                        <button type="button" class="btn btn-secondary" onclick="closeLoginModal()" data-en="Cancel" data-my="ပယ်ဖျက်ရန်">Cancel</button>
                    </div>
                </form>
                
                <div class="login-info">
                    <p><strong data-en="Pastor Password:" data-my="ဓမ္မဆရာ စကားဝှက်:">Pastor Password:</strong> 54321</p>
                    <p data-en="Only pastors can access the management dashboard" data-my="ဓမ္မဆရာများသာ စီမံခန့်ခွဲမှု ဒက်ရှ်ဘုတ်ကို ဝင်ရောက်နိုင်ပါသည်">Only pastors can access the management dashboard</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Handle form submission
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Handle password input (only allow numbers)
    document.getElementById('loginPassword').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
}

// Close login modal
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.remove();
    }
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                role: 'pastor'
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store authentication token and role
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userRole', data.role);
            
            closeLoginModal();
            
            // Hide auth message and show dashboard
            document.getElementById('authMessage').style.display = 'none';
            document.querySelector('.edit-dashboard').style.display = 'block';
            
            // Initialize the dashboard
            initDashboard();
            initModals();
            loadDashboardStats();
            
            // Show success message
            alert('Login successful! Welcome to the Edit Dashboard.');
        } else {
            alert(data.error || 'Login failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login. Please try again.');
    }
}

// Initialize dashboard
function initDashboard() {
    document.querySelector('.edit-dashboard').classList.add('show');
    document.getElementById('authMessage').style.display = 'none';
}

// Initialize modal functionality
function initModals() {
    // Close modals when clicking on X or outside
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
    });
}

// Global variable to store loaded news data
let loadedNewsData = [];

// Load dashboard statistics
async function loadDashboardStats() {
    try {
        // Load events stats
        const eventsResponse = await fetch('http://localhost:3000/api/events');
        if (eventsResponse.ok) {
            const events = await eventsResponse.json();
            const upcomingEvents = events.filter(event => new Date(event.date) > new Date());
            
            document.getElementById('totalEvents').textContent = events.length;
            document.getElementById('upcomingEvents').textContent = upcomingEvents.length;
        }

        // Load sermons stats
        const sermonsResponse = await fetch('http://localhost:3000/api/sermons');
        if (sermonsResponse.ok) {
            const sermons = await sermonsResponse.json();
            const publicSermons = sermons.filter(sermon => sermon.visibility === 'public');
            
            document.getElementById('totalSermons').textContent = sermons.length;
            document.getElementById('publicSermons').textContent = publicSermons.length;
        }

        // Load news stats
        const newsResponse = await fetch('http://localhost:3000/api/news');
        if (newsResponse.ok) {
            const news = await newsResponse.json();
            const publishedNews = news.filter(item => item.status === 'published');
            
            document.getElementById('totalNews').textContent = news.length;
            document.getElementById('publishedNews').textContent = publishedNews.length;
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// Event Management Functions
function openEventModal() {
    const modal = document.getElementById('eventModal');
    const content = document.getElementById('eventModalContent');
    
    content.innerHTML = `
        <div class="event-form">
            <h3>Add New Event</h3>
            <form id="addEventForm">
                <div class="form-group">
                    <label for="eventTitle">Event Title</label>
                    <input type="text" id="eventTitle" name="title" required>
                </div>
                <div class="form-group">
                    <label for="eventDate">Event Date</label>
                    <input type="date" id="eventDate" name="date" required>
                </div>
                <div class="form-group">
                    <label for="eventTime">Event Time</label>
                    <input type="time" id="eventTime" name="time" required>
                </div>
                <div class="form-group">
                    <label for="eventDescription">Description</label>
                    <textarea id="eventDescription" name="description" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label for="eventLocation">Location</label>
                    <input type="text" id="eventLocation" name="location">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Add Event</button>
                    <button type="button" class="btn btn-secondary" onclick="closeEventModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    // Add form submission handler
    document.getElementById('addEventForm').addEventListener('submit', handleAddEvent);
    
    modal.style.display = 'block';
}

function openEventEditModal() {
    const modal = document.getElementById('eventModal');
    const content = document.getElementById('eventModalContent');
    
    content.innerHTML = `
        <div class="event-edit">
            <h3>Edit Events</h3>
            <div id="eventsList">
                <p>Loading events...</p>
            </div>
        </div>
    `;
    
    loadEventsForEdit();
    modal.style.display = 'block';
}

async function loadEventsForEdit() {
    try {
        const response = await fetch('http://localhost:3000/api/events');
        if (response.ok) {
            const events = await response.json();
            displayEventsForEdit(events);
        }
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

function displayEventsForEdit(events) {
    const eventsList = document.getElementById('eventsList');
    
    if (events.length === 0) {
        eventsList.innerHTML = '<p>No events found.</p>';
        return;
    }
    
    eventsList.innerHTML = events.map(event => `
        <div class="event-item" data-event-id="${event.id}">
            <div class="event-info">
                <h4>${event.title}</h4>
                <p>${event.date} at ${event.time}</p>
                <p>${event.description}</p>
            </div>
            <div class="event-actions">
                <button class="btn btn-secondary btn-sm" onclick="editEvent(${event.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteEvent(${event.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

async function handleAddEvent(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const eventData = {
        title: formData.get('title'),
        date: formData.get('date'),
        time: formData.get('time'),
        description: formData.get('description'),
        location: formData.get('location')
    };
    
    try {
        const response = await fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(eventData)
        });
        
        if (response.ok) {
            alert('Event added successfully!');
            closeEventModal();
            loadDashboardStats(); // Refresh stats
        } else {
            alert('Error adding event');
        }
    } catch (error) {
        console.error('Error adding event:', error);
        alert('Error adding event');
    }
}

function closeEventModal() {
    document.getElementById('eventModal').style.display = 'none';
}

// Sermon Management Functions
function openSermonUploadModal() {
    const modal = document.getElementById('sermonModal');
    const content = document.getElementById('sermonModalContent');
    
    content.innerHTML = `
        <div class="sermon-form">
            <h3>Upload New Sermon</h3>
            <p>Use the sermon upload form in the Pastor Dashboard for full functionality.</p>
            <div class="form-actions">
                <a href="pastor.html" class="btn btn-primary">Go to Pastor Dashboard</a>
                <button type="button" class="btn btn-secondary" onclick="closeSermonModal()">Close</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function openSermonEditModal() {
    const modal = document.getElementById('sermonModal');
    const content = document.getElementById('sermonModalContent');
    
    content.innerHTML = `
        <div class="sermon-edit">
            <h3>Edit Sermons</h3>
            <p>Use the sermon management in the Pastor Dashboard for full functionality.</p>
            <div class="form-actions">
                <a href="pastor.html" class="btn btn-primary">Go to Pastor Dashboard</a>
                <button type="button" class="btn btn-secondary" onclick="closeSermonModal()">Close</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeSermonModal() {
    document.getElementById('sermonModal').style.display = 'none';
}

// News Management Functions
function openNewsCreateModal() {
    const modal = document.getElementById('newsModal');
    const content = document.getElementById('newsModalContent');
    
    content.innerHTML = `
        <div class="news-form">
            <h3 data-en="Create News Article" data-my="သတင်းဆောင်းပါး ဖန်တီးရန်">Create News Article</h3>
            <form id="addNewsForm">
                <div class="form-group">
                    <label for="newsTitle" data-en="News Title" data-my="သတင်း ခေါင်းစဉ်">News Title</label>
                    <input type="text" id="newsTitle" name="title" required>
                </div>
                <div class="form-group">
                    <label for="newsDate" data-en="Date" data-my="ရက်စွဲ">Date</label>
                    <input type="date" id="newsDate" name="date" required>
                </div>
                <div class="form-group">
                    <label for="newsImage" data-en="Image URL" data-my="ပုံ URL">Image URL</label>
                    <input type="url" id="newsImage" name="image" placeholder="https://example.com/image.jpg">
                </div>
                <div class="form-group">
                    <label for="newsCategory" data-en="Category" data-my="အမျိုးအစား">Category</label>
                    <select id="newsCategory" name="category">
                        <option value="announcement" data-en="Announcement" data-my="ကြေညာချက်">Announcement</option>
                        <option value="event" data-en="Event" data-my="အစီအစဉ်">Event</option>
                        <option value="prayer" data-en="Prayer Request" data-my="ဆုတောင်းခြင်း တောင်းဆိုချက်">Prayer Request</option>
                        <option value="ministry" data-en="Ministry Update" data-my="ဝတ်ပြုခြင်း အပ်ဒိတ်">Ministry Update</option>
                        <option value="general" data-en="General News" data-my="ယေဘုယျ သတင်း">General News</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="newsContent" data-en="Content" data-my="အကြောင်းအရာ">Content</label>
                    <textarea id="newsContent" name="content" rows="8" required></textarea>
                </div>
                <div class="form-group">
                    <label for="newsStatus" data-en="Status" data-my="အခြေအနေ">Status</label>
                    <select id="newsStatus" name="status">
                        <option value="draft" data-en="Draft" data-my="ကြိုတင်ရေးသားချက်">Draft</option>
                        <option value="published" data-en="Published" data-my="ထုတ်ဝေပြီး">Published</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="newsPriority" data-en="Priority" data-my="ဦးစားပေး">Priority</label>
                    <select id="newsPriority" name="priority">
                        <option value="normal" data-en="Normal" data-my="ပုံမှန်">Normal</option>
                        <option value="important" data-en="Important" data-my="အရေးကြီး">Important</option>
                        <option value="urgent" data-en="Urgent" data-my="အရေးတကြီး">Urgent</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="newsFeatured" name="featured">
                        <span data-en="Pin this news to the top" data-my="ဤသတင်းကို အပေါ်ဆုံးတွင် ပြသရန်">Pin this news to the top</span>
                    </label>
                </div>
                <div class="form-group">
                    <label for="newsExpiry" data-en="Expiry" data-my="သက်တမ်းကုန်ဆုံးချိန်">Expiry</label>
                    <select id="newsExpiry" name="expiry">
                        <option value="never" data-en="Never" data-my="မည်သည့်အခါမှ">Never</option>
                        <option value="1" data-en="1 Day" data-my="၁ ရက်">1 Day</option>
                        <option value="7" data-en="1 Week" data-my="၁ ပတ်">1 Week</option>
                        <option value="30" data-en="1 Month" data-my="၁ လ">1 Month</option>
                        <option value="90" data-en="3 Months" data-my="၃ လ">3 Months</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary" data-en="Create News" data-my="သတင်းအသစ် ဖန်တီးရန်">Create News</button>
                    <button type="button" class="btn btn-secondary" onclick="closeNewsModal()" data-en="Cancel" data-my="ပယ်ဖျက်ရန်">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('newsDate').value = today;
    
    document.getElementById('addNewsForm').addEventListener('submit', handleAddNews);
    modal.style.display = 'block';
}

function openNewsEditModal() {
    const modal = document.getElementById('newsModal');
    const content = document.getElementById('newsModalContent');
    
    content.innerHTML = `
        <div class="news-edit">
            <h3 data-en="Edit News Articles" data-my="သတင်းဆောင်းပါးများ တည်းဖြတ်ရန်">Edit News Articles</h3>
            <div id="newsList">
                <p data-en="Loading news..." data-my="သတင်းများ ဖွင့်နေသည်...">Loading news...</p>
            </div>
        </div>
    `;
    
    loadNewsForEdit();
    modal.style.display = 'block';
}

async function loadNewsForEdit() {
    try {
        console.log('Loading news for edit...');
        const response = await fetch('http://localhost:3000/api/news');
        console.log('News response status:', response.status);
        
        if (response.ok) {
            const news = await response.json();
            console.log('Received news data:', news);
            loadedNewsData = news; // Store globally
            displayNewsForEdit(news);
        } else {
            console.error('Failed to load news:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error loading news:', error);
    }
}

function displayNewsForEdit(news) {
    const newsList = document.getElementById('newsList');
    
    if (news.length === 0) {
        newsList.innerHTML = '<p>No news articles found.</p>';
        return;
    }
    
    newsList.innerHTML = news.map(item => `
        <div class="news-item" data-news-id="${item.id}">
            <div class="news-info">
                <h4>${item.title}</h4>
                <div class="news-meta">
                    <span class="news-date">${item.date || 'No date'}</span>
                    <span class="news-category">${item.category || 'General'}</span>
                    <span class="news-status status-${item.status}">${item.status}</span>
                    <span class="news-priority priority-${item.priority || 'normal'}">${item.priority || 'normal'}</span>
                    ${item.featured ? '<span class="news-featured">📌 Featured</span>' : ''}
                </div>
                <p class="news-excerpt">${item.content.substring(0, 150)}...</p>
            </div>
            <div class="news-actions">
                <button class="btn btn-secondary btn-sm" onclick="editNews(${item.id})" data-en="Edit" data-my="တည်းဖြတ်ရန်">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteNews(${item.id})" data-en="Delete" data-my="ဖျက်ရန်">Delete</button>
            </div>
        </div>
    `).join('');
}

async function handleAddNews(e) {
    e.preventDefault();
    
    // Check authentication
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    console.log('Auth token:', authToken ? 'Present' : 'Missing');
    console.log('User role:', userRole);
    console.log('Full auth token:', authToken);
    
    if (!authToken) {
        alert('Authentication required. Please log in again.');
        return;
    }
    
    if (userRole !== 'pastor') {
        alert('Pastor access required. Please log in as a pastor.');
        return;
    }
    
    // Verify token is still valid with server
    try {
        const statusResponse = await fetch('http://localhost:3000/api/auth/status', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        const statusData = await statusResponse.json();
        console.log('Auth status check:', statusData);
        
        if (!statusData.authenticated) {
            alert('Your session has expired. Please log in again.');
            // Clear invalid tokens
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            return;
        }
    } catch (error) {
        console.error('Error checking auth status:', error);
        alert('Error verifying authentication. Please try again.');
        return;
    }
    
    const formData = new FormData(e.target);
    const newsData = {
        title: formData.get('title') || '',
        date: formData.get('date') || new Date().toISOString().split('T')[0],
        image: formData.get('image') || '',
        category: formData.get('category') || 'general',
        content: formData.get('content') || '',
        status: formData.get('status') || 'draft',
        priority: formData.get('priority') || 'normal',
        featured: formData.get('featured') === 'on',
        expiry: formData.get('expiry') || 'never',
        author: 'Pastor',
        publishDate: new Date().toISOString()
    };
    
    try {
        console.log('Sending news data:', newsData);
        
        const response = await fetch('http://localhost:3000/api/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(newsData)
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (response.ok) {
            const responseData = await response.json();
            console.log('Success response:', responseData);
            alert('News article created successfully!');
            closeNewsModal();
            loadDashboardStats(); // Refresh stats
        } else {
            const errorData = await response.text();
            console.error('Error response:', errorData);
            alert(`Error creating news article: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error creating news:', error);
        alert('Error creating news article');
    }
}

function closeNewsModal() {
    document.getElementById('newsModal').style.display = 'none';
}

// Settings Management Functions
function openGeneralSettingsModal() {
    const modal = document.getElementById('settingsModal');
    const content = document.getElementById('settingsModalContent');
    
    content.innerHTML = `
        <div class="settings-form">
            <h3>General Website Settings</h3>
            <form id="generalSettingsForm">
                <div class="form-group">
                    <label for="churchName">Church Name</label>
                    <input type="text" id="churchName" name="churchName" value="Gospel Baptist Church">
                </div>
                <div class="form-group">
                    <label for="churchAddress">Church Address</label>
                    <input type="text" id="churchAddress" name="churchAddress" value="6222 University Ave, Des Moines, IA 50311">
                </div>
                <div class="form-group">
                    <label for="churchPhone">Church Phone</label>
                    <input type="tel" id="churchPhone" name="churchPhone" value="+1 515 346 5562">
                </div>
                <div class="form-group">
                    <label for="churchEmail">Church Email</label>
                    <input type="email" id="churchEmail" name="churchEmail" value="desmoinesgbc@gmail.com">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Save Settings</button>
                    <button type="button" class="btn btn-secondary" onclick="closeSettingsModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    document.getElementById('generalSettingsForm').addEventListener('submit', handleSaveGeneralSettings);
    modal.style.display = 'block';
}

function openAppearanceSettingsModal() {
    const modal = document.getElementById('settingsModal');
    const content = document.getElementById('settingsModalContent');
    
    content.innerHTML = `
        <div class="settings-form">
            <h3>Appearance Settings</h3>
            <form id="appearanceSettingsForm">
                <div class="form-group">
                    <label for="primaryColor">Primary Color</label>
                    <input type="color" id="primaryColor" name="primaryColor" value="#1e3a8a">
                </div>
                <div class="form-group">
                    <label for="accentColor">Accent Color</label>
                    <input type="color" id="accentColor" name="accentColor" value="#3b82f6">
                </div>
                <div class="form-group">
                    <label for="fontSize">Base Font Size</label>
                    <select id="fontSize" name="fontSize">
                        <option value="14px">Small (14px)</option>
                        <option value="16px" selected>Medium (16px)</option>
                        <option value="18px">Large (18px)</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Save Appearance</button>
                    <button type="button" class="btn btn-secondary" onclick="closeSettingsModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    document.getElementById('appearanceSettingsForm').addEventListener('submit', handleSaveAppearanceSettings);
    modal.style.display = 'block';
}

function openContactSettingsModal() {
    const modal = document.getElementById('settingsModal');
    const content = document.getElementById('settingsModalContent');
    
    content.innerHTML = `
        <div class="settings-form">
            <h3>Contact Information Settings</h3>
            <form id="contactSettingsForm">
                <div class="form-group">
                    <label for="sundayService">Sunday Service Time</label>
                    <input type="text" id="sundayService" name="sundayService" value="1:00 PM - 3:00 PM">
                </div>
                <div class="form-group">
                    <label for="saturdayService">Saturday Service Time</label>
                    <input type="text" id="saturdayService" name="saturdayService" value="5:00 PM - 6:00 PM">
                </div>
                <div class="form-group">
                    <label for="pastorName">Pastor Name</label>
                    <input type="text" id="pastorName" name="pastorName" value="Pastor Paul">
                </div>
                <div class="form-group">
                    <label for="pastorEmail">Pastor Email</label>
                    <input type="email" id="pastorEmail" name="pastorEmail">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Save Contact Info</button>
                    <button type="button" class="btn btn-secondary" onclick="closeSettingsModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    document.getElementById('contactSettingsForm').addEventListener('submit', handleSaveContactSettings);
    modal.style.display = 'block';
}

async function handleSaveGeneralSettings(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const settingsData = {
        churchName: formData.get('churchName'),
        churchAddress: formData.get('churchAddress'),
        churchPhone: formData.get('churchPhone'),
        churchEmail: formData.get('churchEmail')
    };
    
    // Save to localStorage for now (in production, save to server)
    localStorage.setItem('churchSettings', JSON.stringify(settingsData));
    
    alert('General settings saved successfully!');
    closeSettingsModal();
}

async function handleSaveAppearanceSettings(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const appearanceData = {
        primaryColor: formData.get('primaryColor'),
        accentColor: formData.get('accentColor'),
        fontSize: formData.get('fontSize')
    };
    
    // Apply appearance changes
    document.documentElement.style.setProperty('--primary-color', appearanceData.primaryColor);
    document.documentElement.style.setProperty('--accent-color', appearanceData.accentColor);
    document.documentElement.style.setProperty('--base-font-size', appearanceData.fontSize);
    
    // Save to localStorage
    localStorage.setItem('appearanceSettings', JSON.stringify(appearanceData));
    
    alert('Appearance settings saved successfully!');
    closeSettingsModal();
}

async function handleSaveContactSettings(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        sundayService: formData.get('sundayService'),
        saturdayService: formData.get('saturdayService'),
        pastorName: formData.get('pastorName'),
        pastorEmail: formData.get('pastorEmail')
    };
    
    // Save to localStorage for now (in production, save to server)
    localStorage.setItem('contactSettings', JSON.stringify(contactData));
    
    alert('Contact information saved successfully!');
    closeSettingsModal();
}

function closeSettingsModal() {
    document.getElementById('settingsModal').style.display = 'none';
}

// Utility functions for editing and deleting
function editEvent(eventId) {
    // Implementation for editing events
    alert(`Edit event ${eventId} - This feature will be implemented in the full version`);
}

function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        // Implementation for deleting events
        alert(`Delete event ${eventId} - This feature will be implemented in the full version`);
    }
}

function editNews(newsId) {
    console.log('Editing news with ID:', newsId);
    
    // Open the news modal in edit mode
    const modal = document.getElementById('newsModal');
    const content = document.getElementById('newsModalContent');
    
    // Load the specific news item
    loadNewsForEdit().then(() => {
        console.log('Loaded news data:', loadedNewsData);
        
        // Find the news item and populate the form
        const newsItem = findNewsById(newsId);
        console.log('Found news item:', newsItem);
        
        if (newsItem) {
            showEditNewsForm(newsItem);
        } else {
            alert('News article not found. Please try refreshing the news list.');
        }
    }).catch(error => {
        console.error('Error loading news for edit:', error);
        alert('Error loading news data. Please try again.');
    });
    
    modal.style.display = 'block';
}

function showEditNewsForm(newsItem) {
    const content = document.getElementById('newsModalContent');
    
    content.innerHTML = `
        <div class="news-form">
            <h3 data-en="Edit News Article" data-my="သတင်းဆောင်းပါး တည်းဖြတ်ရန်">Edit News Article</h3>
            <form id="editNewsForm">
                <input type="hidden" id="editNewsId" value="${newsItem.id}">
                <div class="form-group">
                    <label for="editNewsTitle" data-en="News Title" data-my="သတင်းခေါင်းစဉ်">News Title</label>
                    <input type="text" id="editNewsTitle" name="title" value="${newsItem.title || ''}" required>
                </div>
                <div class="form-group">
                    <label for="editNewsDate" data-en="Date" data-my="ရက်စွဲ">Date</label>
                    <input type="date" id="editNewsDate" name="date" value="${newsItem.date || ''}" required>
                </div>
                <div class="form-group">
                    <label for="editNewsImage" data-en="Image URL" data-my="ပုံ URL">Image URL</label>
                    <input type="url" id="editNewsImage" name="image" value="${newsItem.image || ''}" placeholder="https://example.com/image.jpg">
                </div>
                <div class="form-group">
                    <label for="editNewsCategory" data-en="Category" data-my="အမျိုးအစား">Category</label>
                    <select id="editNewsCategory" name="category">
                        <option value="announcement" ${newsItem.category === 'announcement' ? 'selected' : ''} data-en="Announcement" data-my="ကြေညာချက်">Announcement</option>
                        <option value="event" ${newsItem.category === 'event' ? 'selected' : ''} data-en="Event" data-my="အစီအစဉ်">Event</option>
                        <option value="prayer" ${newsItem.category === 'prayer' ? 'selected' : ''} data-en="Prayer Request" data-my="ဆုတောင်းခြင်း တောင်းဆိုချက်">Prayer Request</option>
                        <option value="ministry" ${newsItem.category === 'ministry' ? 'selected' : ''} data-en="Ministry Update" data-my="ဝတ်ပြုခြင်း အပ်ဒိတ်">Ministry Update</option>
                        <option value="general" ${newsItem.category === 'general' ? 'selected' : ''} data-en="General News" data-my="ယေဘုယျ သတင်း">General News</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editNewsContent" data-en="Content" data-my="အကြောင်းအရာ">Content</label>
                    <textarea id="editNewsContent" name="content" rows="8" required>${newsItem.content || ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="editNewsStatus" data-en="Status" data-my="အခြေအနေ">Status</label>
                    <select id="editNewsStatus" name="status">
                        <option value="draft" ${newsItem.status === 'draft' ? 'selected' : ''} data-en="Draft" data-my="ကြိုတင်ရေးသားချက်">Draft</option>
                        <option value="published" ${newsItem.status === 'published' ? 'selected' : ''} data-en="Published" data-my="ထုတ်ဝေပြီး">Published</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="editNewsPriority" data-en="Priority" data-my="ဦးစားပေး">Priority</label>
                    <select id="editNewsPriority" name="priority">
                        <option value="normal" ${newsItem.priority === 'normal' ? 'selected' : ''} data-en="Normal" data-my="ပုံမှန်">Normal</option>
                        <option value="important" ${newsItem.priority === 'important' ? 'selected' : ''} data-en="Important" data-my="အရေးကြီး">Important</option>
                        <option value="urgent" ${newsItem.priority === 'urgent' ? 'selected' : ''} data-en="Urgent" data-my="အရေးတကြီး">Urgent</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="editNewsFeatured" name="featured" ${newsItem.featured ? 'checked' : ''}>
                        <span data-en="Pin this news to the top" data-my="ဤသတင်းကို အပေါ်ဆုံးတွင် ပြသရန်">Pin this news to the top</span>
                    </label>
                </div>
                <div class="form-group">
                    <label for="editNewsExpiry" data-en="Expiry" data-my="သက်တမ်းကုန်ဆုံးချိန်">Expiry</label>
                    <select id="editNewsExpiry" name="expiry">
                        <option value="never" ${newsItem.expiry === 'never' ? 'selected' : ''} data-en="Never" data-my="မည်သည့်အခါမှ">Never</option>
                        <option value="1" ${newsItem.expiry === '1' ? 'selected' : ''} data-en="1 Day" data-my="၁ ရက်">1 Day</option>
                        <option value="7" ${newsItem.expiry === '7' ? 'selected' : ''} data-en="1 Week" data-my="၁ ပတ်">1 Week</option>
                        <option value="30" ${newsItem.expiry === '30' ? 'selected' : ''} data-en="1 Month" data-my="၁ လ">1 Month</option>
                        <option value="90" ${newsItem.expiry === '90' ? 'selected' : ''} data-en="3 Months" data-my="၃ လ">3 Months</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary" data-en="Update News" data-my="သတင်း အပ်ဒိတ်ရန်">Update News</button>
                    <button type="button" class="btn btn-secondary" onclick="closeNewsModal()" data-en="Cancel" data-my="ပယ်ဖျက်ရန်">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    // Add event listener for the edit form
    document.getElementById('editNewsForm').addEventListener('submit', handleEditNews);
}

async function handleEditNews(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newsId = document.getElementById('editNewsId').value;
    
    const newsData = {
        title: formData.get('title'),
        date: formData.get('date'),
        image: formData.get('image'),
        category: formData.get('category'),
        content: formData.get('content'),
        status: formData.get('status'),
        priority: formData.get('priority'),
        featured: formData.get('featured') === 'on',
        expiry: formData.get('expiry'),
        author: 'Pastor',
        lastModified: new Date().toISOString()
    };
    
    try {
        const response = await fetch(`http://localhost:3000/api/news/${newsId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(newsData)
        });
        
        if (response.ok) {
            alert('News article updated successfully!');
            closeNewsModal();
            loadDashboardStats(); // Refresh stats
            // Refresh the news list if we're in edit mode
            if (document.getElementById('newsList')) {
                loadNewsForEdit();
            }
        } else {
            alert('Error updating news article');
        }
    } catch (error) {
        console.error('Error updating news:', error);
        alert('Error updating news article');
    }
}

function findNewsById(newsId) {
    // Find news from the globally loaded news data
    return loadedNewsData.find(item => item.id == newsId) || null;
}

async function deleteNews(newsId) {
    if (confirm('Are you sure you want to delete this news article?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/news/${newsId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            if (response.ok) {
                alert('News article deleted successfully!');
                // Refresh the news list
                loadNewsForEdit();
                // Refresh dashboard stats
                loadDashboardStats();
            } else {
                alert('Error deleting news article');
            }
        } catch (error) {
            console.error('Error deleting news:', error);
            alert('Error deleting news article');
        }
    }
}

// Export functions for use in other scripts
window.editDashboard = {
    openEventModal,
    openSermonUploadModal,
    openNewsCreateModal,
    openGeneralSettingsModal,
    openAppearanceSettingsModal,
    openContactSettingsModal
};

// Gallery Management Functions
function openGalleryManagementModal() {
    const modal = document.getElementById('galleryModal');
    const content = document.getElementById('galleryModalContent');
    
    content.innerHTML = `
        <div class="gallery-management">
            <div class="category-list" id="categoryList">
                <p>Loading categories...</p>
            </div>
        </div>
    `;
    
    loadCategories();
    modal.style.display = 'block';
}

function openNewCategoryModal() {
    const modal = document.getElementById('newCategoryModal');
    const content = document.getElementById('newCategoryModalContent');
    
    content.innerHTML = `
        <div class="new-category-form">
            <form id="newCategoryForm">
                <div class="form-group">
                    <label for="categoryName">Category Name</label>
                    <input type="text" id="categoryName" name="name" required placeholder="e.g., Church Events">
                </div>
                <div class="form-group">
                    <label for="categoryDescription">Description</label>
                    <textarea id="categoryDescription" name="description" placeholder="Brief description of this category"></textarea>
                </div>
                <div class="btn-group">
                    <button type="submit" class="btn btn-primary">Create Category</button>
                    <button type="button" class="btn btn-secondary" onclick="closeNewCategoryModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    
    // Add form submission handler
    document.getElementById('newCategoryForm').addEventListener('submit', handleCreateCategory);
    
    modal.style.display = 'block';
}

async function loadCategories() {
    try {
        // Get list of folders from ChurchWebsiteIMG
        const categories = await getCategoryFolders();
        displayCategories(categories);
        updateGalleryStats();
    } catch (error) {
        console.error('Error loading categories:', error);
        document.getElementById('categoryList').innerHTML = '<p class="error">Error loading categories</p>';
    }
}

async function getCategoryFolders() {
    // This would typically call a backend API
    // For now, we'll use the existing category structure
    const categories = [
        'Church Baptism',
        'Church Camp', 
        'Church General Photos',
        'Church Holidays',
        'Church Mother & Father Day',
        'Church Picnic',
        'Church Sunday School',
        'Pastor Paul Family'
    ];
    
    return categories.map(category => ({
        name: category,
        folderName: category.replace(/\s+/g, '_'),
        coverPhoto: null,
        imageCount: 0
    }));
}

function displayCategories(categories) {
    const categoryList = document.getElementById('categoryList');
    
    if (categories.length === 0) {
        categoryList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-images"></i>
                <h3>No Categories Found</h3>
                <p>Create your first photo category to get started.</p>
            </div>
        `;
        return;
    }
    
    categoryList.innerHTML = categories.map(category => `
        <div class="category-item" data-category="${category.name}">
            <div class="category-header">
                <h3 class="category-name">${category.name}</h3>
                <div class="category-actions">
                    <button class="action-btn btn-primary btn-sm" onclick="openCategoryGallery('${category.name}')">
                        <i class="fas fa-edit"></i> Edit Gallery
                    </button>
                </div>
            </div>
            
            <div class="cover-photo-section">
                <h4>Cover Photo</h4>
                <div class="cover-photo-current">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTIwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Ik02MCA0MGwyMC0yMGgyMEw2MCA2MEw0MCA0MEw2MCAyMFY0MFoiIGZpbGw9IiNjY2NjY2MiLz4KPC9zdmc+" 
                         alt="No cover photo" class="cover-photo-preview">
                    <div class="cover-photo-info">
                        <h4>No Cover Photo Set</h4>
                        <p>Upload images to this category and select one as the cover photo.</p>
                    </div>
                </div>
            </div>
            
            <div class="gallery-images-section">
                <h4>Gallery Images</h4>
                <div class="gallery-grid" id="gallery_${category.name.replace(/\s+/g, '_')}">
                    <div class="empty-state">
                        <i class="fas fa-images"></i>
                        <p>No images in gallery</p>
                    </div>
                </div>
                <p class="text-muted">Click "Edit Gallery" to manage images for this category.</p>
            </div>
        </div>
    `).join('');
}

function openCategoryGallery(categoryName) {
    const modal = document.getElementById('categoryGalleryModal');
    const title = document.getElementById('categoryGalleryTitle');
    const content = document.getElementById('categoryGalleryContent');
    
    title.textContent = `${categoryName} - Gallery Editor`;
    
    content.innerHTML = `
        <div class="category-gallery-editor">
            <div class="back-to-categories">
                <button onclick="closeCategoryGalleryModal()">
                    <i class="fas fa-arrow-left"></i> Back to Categories
                </button>
            </div>
            
            <div class="category-stats">
                <div class="stat-item-small">
                    <div class="stat-number-small" id="categoryImageCount">0</div>
                    <div class="stat-label-small">Images</div>
                </div>
                <div class="stat-item-small">
                    <div class="stat-number-small" id="categoryCoverPhoto">None</div>
                    <div class="stat-label-small">Cover Photo</div>
                </div>
            </div>
            
            <div class="gallery-images-section">
                <h4>Gallery Images</h4>
                <div class="gallery-grid" id="categoryGalleryGrid">
                    <div class="empty-state">
                        <i class="fas fa-images"></i>
                        <p>No images in this category</p>
                    </div>
                </div>
                
                <div class="upload-section" 
                     ondrop="handleDrop(event, '${categoryName}')" 
                     ondragover="handleDragOver(event)" 
                     ondragleave="handleDragLeave(event)">
                    <input type="file" id="categoryGalleryPhotos_${categoryName.replace(/\s+/g, '_')}" 
                           accept="image/*" multiple onchange="uploadGalleryPhotos('${categoryName}', this)">
                    <label for="categoryGalleryPhotos_${categoryName.replace(/\s+/g, '_')}" class="upload-label">
                        <i class="fas fa-upload"></i> Upload Images to ${categoryName}
                    </label>
                    <p>Drag and drop images here or click to select</p>
                </div>
            </div>
        </div>
    `;
    
    loadCategoryImages(categoryName);
    modal.style.display = 'block';
}

async function loadCategoryImages(categoryName) {
    try {
        // This would typically call a backend API to get images from the category folder
        // For now, we'll simulate empty categories
        const images = [];
        displayCategoryImages(categoryName, images);
        updateCategoryStats(categoryName, images);
    } catch (error) {
        console.error('Error loading category images:', error);
        document.getElementById('categoryGalleryGrid').innerHTML = '<p class="error">Error loading images</p>';
    }
}

function displayCategoryImages(categoryName, images) {
    const galleryGrid = document.getElementById('categoryGalleryGrid');
    
    if (images.length === 0) {
        galleryGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-images"></i>
                <p>No images in this category</p>
                <p>Upload some images to get started!</p>
            </div>
        `;
        return;
    }
    
    galleryGrid.innerHTML = images.map((image, index) => `
        <div class="gallery-image-item" data-image="${image.filename}">
            <img src="${image.path}" alt="${image.filename}">
            <div class="gallery-image-actions">
                <button class="gallery-image-action set-cover" 
                        onclick="setCoverPhoto('${categoryName}', '${image.filename}')" 
                        title="Set as Cover Photo">
                    <i class="fas fa-star"></i>
                </button>
                <button class="gallery-image-action delete" 
                        onclick="deleteImage('${categoryName}', '${image.filename}')" 
                        title="Delete Image">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function updateCategoryStats(categoryName, images) {
    document.getElementById('categoryImageCount').textContent = images.length;
    const coverPhoto = images.find(img => img.isCover)?.filename || 'None';
    document.getElementById('categoryCoverPhoto').textContent = coverPhoto;
}

async function handleCreateCategory(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const categoryName = formData.get('name');
    const categoryDescription = formData.get('description');
    
    try {
        // Create the category folder
        await createCategoryFolder(categoryName);
        
        alert('Category created successfully!');
        closeNewCategoryModal();
        loadCategories(); // Refresh the category list
        
    } catch (error) {
        console.error('Error creating category:', error);
        alert('Error creating category: ' + error.message);
    }
}

async function createCategoryFolder(categoryName) {
    // This would typically call a backend API to create the folder
    // For now, we'll simulate the creation
    console.log(`Creating folder for category: ${categoryName}`);
    
    // In a real implementation, this would:
    // 1. Create the folder in ChurchWebsiteIMG
    // 2. Update the website code to include the new category
    // 3. Return success/failure status
}

async function uploadGalleryPhotos(categoryName, fileInput) {
    const files = fileInput.files;
    if (files.length === 0) return;
    
    try {
        // This would typically call a backend API to upload the files
        // For now, we'll simulate the upload
        console.log(`Uploading ${files.length} photos to ${categoryName}:`, files);
        
        // In a real implementation, this would:
        // 1. Upload the files to the correct category folder
        // 2. Update the website code to include the new photos
        // 3. Refresh the gallery display
        
        alert(`${files.length} images uploaded successfully to ${categoryName}!`);
        
        // Refresh the category images
        loadCategoryImages(categoryName);
        
    } catch (error) {
        console.error('Error uploading photos:', error);
        alert('Error uploading photos: ' + error.message);
    }
}

function setCoverPhoto(categoryName, imageFilename) {
    if (confirm(`Set "${imageFilename}" as the cover photo for ${categoryName}?`)) {
        // This would typically call a backend API to update the cover photo
        // For now, we'll simulate the update
        console.log(`Setting ${imageFilename} as cover photo for ${categoryName}`);
        
        alert('Cover photo updated successfully!');
        
        // Refresh the category display
        loadCategoryImages(categoryName);
    }
}

function deleteImage(categoryName, imageFilename) {
    if (confirm(`Delete "${imageFilename}" from ${categoryName}? This action cannot be undone.`)) {
        // This would typically call a backend API to delete the image
        // For now, we'll simulate the deletion
        console.log(`Deleting ${imageFilename} from ${categoryName}`);
        
        alert('Image deleted successfully!');
        
        // Refresh the category display
        loadCategoryImages(categoryName);
    }
}

function handleDrop(e, categoryName) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        // Create a file input element and trigger the upload
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.accept = 'image/*';
        fileInput.files = files;
        
        uploadGalleryPhotos(categoryName, fileInput);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('dragover');
}

function updateGalleryStats() {
    // Update the dashboard stats
    const totalCategories = 8; // This would be dynamic in a real implementation
    const totalImages = 0; // This would be calculated from all categories
    
    document.getElementById('totalCategories').textContent = totalCategories;
    document.getElementById('totalImages').textContent = totalImages;
}

function closeNewCategoryModal() {
    document.getElementById('newCategoryModal').style.display = 'none';
}

function closeCategoryGalleryModal() {
    document.getElementById('categoryGalleryModal').style.display = 'none';
}
