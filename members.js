// Members area functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check member authentication
    if (!checkMembersAuth()) {
        return;
    }
    
    initMembersDashboard();
});

// Check if user is authenticated as a member
async function checkMembersAuth() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    
    if (!token || !role) {
        alert('Please log in to access the members area');
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
        
        // Check if user has member or pastor role
        if (data.role !== 'member' && data.role !== 'pastor') {
            alert('Access denied. Member privileges required.');
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

// Initialize members dashboard
function initMembersDashboard() {
    // Members area only shows general member functionality
    const memberSections = document.querySelectorAll('.general-members-section, .members-sermons-section');
    memberSections.forEach(section => section.style.display = 'block');
    
    // Load members-only sermons
    loadMembersSermons();
    initMembersSermonFilters();
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

// Prayer request functionality
function showPrayerForm() {
    const modalHtml = `
        <div class="modal" id="prayerModal" style="display: block;">
            <div class="modal-content">
                <span class="close" onclick="closePrayerModal()">&times;</span>
                <h2 data-en="Submit Prayer Request" data-my="ဆုတောင်းခြင်း တောင်းဆိုချက် တင်သွင်းရန်">Submit Prayer Request</h2>
                
                <form id="prayerForm">
                    <div class="form-group">
                        <label for="prayerName" data-en="Your Name" data-my="သင့်အမည်">Your Name</label>
                        <input type="text" id="prayerName" name="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="prayerRequest" data-en="Prayer Request" data-my="ဆုတောင်းခြင်း တောင်းဆိုချက်">Prayer Request</label>
                        <textarea id="prayerRequest" name="request" rows="5" placeholder="Please share your prayer request..." required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="prayerConfidential" name="confidential">
                            <span data-en="Keep this request confidential" data-my="ဤတောင်းဆိုချက်ကို လျှို့ဝှက်ထားရန်">Keep this request confidential</span>
                        </label>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary" data-en="Submit Request" data-my="တောင်းဆိုချက် တင်သွင်းရန်">Submit Request</button>
                        <button type="button" class="btn btn-secondary" onclick="closePrayerModal()" data-en="Cancel" data-my="ပယ်ဖျက်ရန်">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Handle form submission
    document.getElementById('prayerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('prayerName').value;
        const request = document.getElementById('prayerRequest').value;
        const confidential = document.getElementById('prayerConfidential').checked;
        
        // In a real app, this would send to the server
        alert(`Prayer request submitted successfully!\n\nName: ${name}\nRequest: ${request}\nConfidential: ${confidential ? 'Yes' : 'No'}`);
        
        closePrayerModal();
    });
}

// Close prayer modal
function closePrayerModal() {
    const modal = document.getElementById('prayerModal');
    if (modal) {
        modal.remove();
    }
}

// Member directory functionality
function showMemberDirectory() {
    const modalHtml = `
        <div class="modal" id="directoryModal" style="display: block;">
            <div class="modal-content">
                <span class="close" onclick="closeDirectoryModal()">&times;</span>
                <h2 data-en="Member Directory" data-my="အဖွဲ့ဝင် စာရင်း">Member Directory</h2>
                
                <div class="member-directory">
                    <p data-en="This feature would show a directory of church members with contact information (with privacy controls)" data-my="ဤအင်္ဂါရပ်သည် ဘုရားကျောင်း အဖွဲ့ဝင်များ၏ စာရင်းကို ဆက်သွယ်ရန် အချက်အလက်များနှင့်အတူြသမည် (လျှို့ဝှက်မှု ထိန်းချုပ်မှုများနှင့်အတူ)">This feature would show a directory of church members with contact information (with privacy controls)</p>
                    
                    <div class="directory-placeholder">
                        <i class="fas fa-users" style="font-size: 3rem; color: #666; margin-bottom: 1rem;"></i>
                        <p data-en="Member directory coming soon..." data-my="အဖွဲ့ဝင် စာရင်း မကြာမီ ရောက်ရှိလာမည်...">Member directory coming soon...</p>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="closeDirectoryModal()" data-en="Close" data-my="ပိတ်ရန်">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Close directory modal
function closeDirectoryModal() {
    const modal = document.getElementById('directoryModal');
    if (modal) {
        modal.remove();
    }
}

// Load members-only sermons from backend
async function loadMembersSermons() {
    const sermonsGrid = document.getElementById('membersSermonsGrid');
    if (!sermonsGrid) return;

    const token = localStorage.getItem('authToken');
    
    if (!token) {
        sermonsGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #ff0000;">
                <h3 data-en="Authentication Required" data-my="အထောက်အထား လိုအပ်ပါသည်">Authentication Required</h3>
                <p data-en="Please log in to access members-only content" data-my="အဖွဲ့ဝင်များ သာ အကြောင်းအရာများကို ဝင်ရောက်ရန် ကျေးဇူးပြု၍ ဝင်ရောက်ပါ">Please log in to access members-only content</p>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/sermons?visibility=members', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const sermons = await response.json();
        
        if (sermons.length === 0) {
            sermonsGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <h3 data-en="No Members-Only Sermons Available" data-my="အဖွဲ့ဝင်များ သာ ဓမ္မဟောကြားချက်များ မရရှိနိုင်ပါ">No Members-Only Sermons Available</h3>
                    <p data-en="Check back later for exclusive member content" data-my="အဖွဲ့ဝင် သီးသန့် အကြောင်းအရာများအတွက် နောက်မှ ပြန်လည် စစ်ဆေးပါ">Check back later for exclusive member content</p>
                </div>
            `;
            return;
        }

        renderMembersSermons(sermons);
    } catch (error) {
        console.error('Error loading members sermons:', error);
        sermonsGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #ff0000;">
                <h3 data-en="Error Loading Sermons" data-my="ဓမ္မဟောကြားချက်များ ဖွင့်ရန် အမှား">Error Loading Sermons</h3>
                <p data-en="Please try again later" data-my="ကျေးဇူးပြု၍ နောက်မှ ပြန်လည် ကြိုးစားပါ">Please try again later</p>
            </div>
        `;
    }
}

// Render members sermons
function renderMembersSermons(sermonsToRender) {
    const sermonsGrid = document.getElementById('membersSermonsGrid');
    if (!sermonsGrid) return;

    sermonsGrid.innerHTML = '';

    if (sermonsToRender.length === 0) {
        sermonsGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3 data-en="No Sermons Found" data-my="ဓမ္မဟောကြားချက် မတွေ့ရပါ">No Sermons Found</h3>
                <p data-en="Try adjusting your search or filter criteria" data-my="သင့်ရှာဖွေမှု သို့မဟုတ် စစ်ထုတ်မှု စံနှုန်းများကို ပြင်ဆင်ရန် ကြိုးစားပါ">Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    sermonsToRender.forEach(sermon => {
        const sermonCard = createMembersSermonCard(sermon);
        sermonsGrid.appendChild(sermonCard);
    });
}

// Create members sermon card
function createMembersSermonCard(sermon) {
    const card = document.createElement('div');
    card.className = 'sermon-card members-only';
    
    const formatIcons = sermon.formats.map(format => {
        const icons = {
            transcript: 'fas fa-file-alt',
            audio: 'fas fa-volume-up',
            video: 'fas fa-video',
            document: 'fas fa-file-pdf'
        };
        return `<span class="format-badge"><i class="${icons[format]}"></i> ${format}</span>`;
    }).join('');

    card.innerHTML = `
        <div class="sermon-image">
            <i class="fas fa-church"></i>
            <div class="members-badge">
                <div class="members-badge-header">
                    <i class="fas fa-users"></i>
                    <span data-en="Members Only" data-my="အဖွဲ့ဝင်များ သာ">Members Only</span>
                </div>
            </div>
        </div>
        <div class="sermon-content">
            <h3 class="sermon-title">${sermon.title}</h3>
            <div class="sermon-meta">
                <span><i class="fas fa-user"></i> ${sermon.pastor}</span>
                <span><i class="fas fa-calendar"></i> ${formatDate(sermon.date)}</span>
            </div>
            <p class="sermon-description">${sermon.description}</p>
            <div class="sermon-formats">
                ${formatIcons}
            </div>
            <button class="btn btn-primary" onclick="viewMembersSermon(${sermon.id})">
                <i class="fas fa-eye"></i> <span data-en="View Sermon" data-my="ဓမ္မဟောကြားချက် ကြည့်ရှုရန်">View Sermon</span>
            </button>
        </div>
    `;

    return card;
}

// Initialize members sermon filters
function initMembersSermonFilters() {
    const searchInput = document.getElementById('membersSermonSearch');
    const pastorFilter = document.getElementById('membersPastorFilter');
    const dateFilter = document.getElementById('membersDateFilter');
    const categoryFilter = document.getElementById('membersCategoryFilter');

    if (searchInput) {
        searchInput.addEventListener('input', filterMembersSermons);
    }

    if (pastorFilter) {
        pastorFilter.addEventListener('change', filterMembersSermons);
    }

    if (dateFilter) {
        dateFilter.addEventListener('change', filterMembersSermons);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterMembersSermons);
    }
}

// Filter members sermons
async function filterMembersSermons() {
    const searchInput = document.getElementById('membersSermonSearch');
    const pastorFilter = document.getElementById('membersPastorFilter');
    const dateFilter = document.getElementById('membersDateFilter');
    const categoryFilter = document.getElementById('membersCategoryFilter');

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedPastor = pastorFilter ? pastorFilter.value : '';
    const selectedDate = dateFilter ? dateFilter.value : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : '';

    const token = localStorage.getItem('authToken');
    
    if (!token) {
        alert('Authentication required. Please log in again.');
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/sermons?visibility=members', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const sermons = await response.json();
        
        const filteredSermons = sermons.filter(sermon => {
            // Search filter
            const matchesSearch = !searchTerm || 
                sermon.title.toLowerCase().includes(searchTerm) ||
                sermon.description.toLowerCase().includes(searchTerm) ||
                sermon.pastor.toLowerCase().includes(searchTerm);

            // Pastor filter
            const matchesPastor = !selectedPastor || sermon.pastor === selectedPastor;

            // Date filter
            const matchesDate = !selectedDate || sermon.date.startsWith(selectedDate);

            // Category filter
            const matchesCategory = !selectedCategory || sermon.category === selectedCategory;

            return matchesSearch && matchesPastor && matchesDate && matchesCategory;
        });

        renderMembersSermons(filteredSermons);
    } catch (error) {
        console.error('Error filtering sermons:', error);
    }
}

// View members sermon details
async function viewMembersSermon(sermonId) {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        alert('Authentication required. Please log in again.');
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/sermons/${sermonId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const sermon = await response.json();
        
        if (!sermon) {
            alert('Sermon not found');
            return;
        }

        const modalContent = document.getElementById('membersSermonModalContent');
        
        let contentHtml = `
            <div class="sermon-details">
                <div class="members-badge-header">
                    <i class="fas fa-users"></i>
                    <span data-en="Members Only Content" data-my="အဖွဲ့ဝင်များ သာ အကြောင်းအရာ">Members Only Content</span>
                </div>
                <h2>${sermon.title}</h2>
                <div class="sermon-meta">
                    <p><strong data-en="Pastor:" data-my="ဓမ္မဆရာ:">Pastor:</strong> ${sermon.pastor}</p>
                    <p><strong data-en="Date:" data-my="ရက်စွဲ:">Date:</strong> ${formatDate(sermon.date)}</p>
                    <p><strong data-en="Category:" data-my="အမျိုးအစား:">Category:</strong> ${sermon.category}</p>
                </div>
                <p class="sermon-description">${sermon.description}</p>
        `;

        // Add format-specific content
        if (sermon.formats.includes('transcript') && sermon.transcript) {
            contentHtml += `
                <div class="sermon-section">
                    <h3 data-en="Transcript" data-my="စာသား">Transcript</h3>
                    <div class="transcript-content">
                        <p>${sermon.transcript}</p>
                    </div>
                </div>
            `;
        }

        if (sermon.formats.includes('audio') && sermon.files && sermon.files.audio) {
            contentHtml += `
                <div class="sermon-section">
                    <h3 data-en="Audio" data-my="အသံ">Audio</h3>
                    <audio controls style="width: 100%; margin: 1rem 0;">
                        <source src="http://localhost:3000${sermon.files.audio.path}" type="audio/mpeg">
                        <span data-en="Your browser does not support the audio element" data-my="သင့်ဘရောက်ဇာသည် အသံ element ကို ထောက်ပံ့မှု မရှိပါ">Your browser does not support the audio element</span>.
                    </audio>
                    <p><small>${sermon.files.audio.originalName}</small></p>
                </div>
            `;
        }

        if (sermon.formats.includes('video') && sermon.files && sermon.files.video) {
            contentHtml += `
                <div class="sermon-section">
                    <h3 data-en="Video" data-my="ဗီဒီယို">Video</h3>
                    <video controls style="width: 100%; margin: 1rem 0;">
                        <source src="http://localhost:3000${sermon.files.video.path}" type="video/mp4">
                        <span data-en="Your browser does not support the video element" data-my="သင့်ဘရောက်ဇာသည် ဗီဒီယို element ကို ထောက်ပံ့မှု မရှိပါ">Your browser does not support the video element</span>.
                    </video>
                    <p><small>${sermon.files.video.originalName}</small></p>
                </div>
            `;
        }

        if (sermon.formats.includes('document') && sermon.files && sermon.files.document) {
            contentHtml += `
                <div class="sermon-section">
                    <h3 data-en="Document" data-my="စာရွက်စာတမ်း">Document</h3>
                    <p><a href="http://localhost:3000${sermon.files.document.path}" target="_blank" class="btn btn-secondary">
                        <i class="fas fa-download"></i> <span data-en="Download Document" data-my="စာရွက်စာတမ်း ဒေါင်းလုဒ်ရန်">Download Document</span>
                    </a></p>
                    <p><small>${sermon.files.document.originalName}</small></p>
                </div>
            `;
        }

        contentHtml += `
                <div class="sermon-actions">
                    <button class="btn btn-secondary" onclick="document.getElementById('membersSermonModal').style.display='none'">
                        <span data-en="Close" data-my="ပိတ်ရန်">Close</span>
                    </button>
                </div>
            </div>
        `;

        modalContent.innerHTML = contentHtml;
        document.getElementById('membersSermonModal').style.display = 'block';
        
    } catch (error) {
        console.error('Error loading sermon details:', error);
        alert('Error loading sermon details. Please try again.');
    }
}

// Format date helper function
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

