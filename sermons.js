// Sermons functionality
document.addEventListener('DOMContentLoaded', async function() {
    let sermons = [];
    
    try {
        // Load sermons from backend API
        const response = await fetch('http://localhost:3000/api/sermons?visibility=public');
        if (response.ok) {
            const uploadedSermons = await response.json();
            sermons = uploadedSermons;
        } else {
            console.error('Failed to load sermons from backend');
        }
    } catch (error) {
        console.error('Error loading sermons:', error);
    }
    
    // No sample sermons - only use sermons from backend API
    // If no sermons from backend, sermons array will remain empty

    let filteredSermons = [...sermons];
    const sermonsGrid = document.getElementById('sermonsGrid');
    const searchInput = document.getElementById('sermonSearch');
    const pastorFilter = document.getElementById('pastorFilter');
    const dateFilter = document.getElementById('dateFilter');
    const formatFilter = document.getElementById('formatFilter');
    const sermonModal = document.getElementById('sermonModal');

    // Initialize sermons display
    function initSermons() {
        renderSermons(filteredSermons);
        setupFilters();
    }

    // Render sermons grid
    function renderSermons(sermonsToRender) {
        if (!sermonsGrid) return;

        sermonsGrid.innerHTML = '';

        if (sermonsToRender.length === 0) {
            sermonsGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <h3>No sermons found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        sermonsToRender.forEach(sermon => {
            const sermonCard = createSermonCard(sermon);
            sermonsGrid.appendChild(sermonCard);
        });
    }

    // Create sermon card
    function createSermonCard(sermon) {
        const card = document.createElement('div');
        card.className = 'sermon-card';
        
        const formatIcons = sermon.formats.map(format => {
            const icons = {
                transcript: 'fas fa-file-alt',
                audio: 'fas fa-volume-up',
                video: 'fas fa-video'
            };
            return `<span class="format-badge"><i class="${icons[format]}"></i> ${format}</span>`;
        }).join('');

        card.innerHTML = `
            <div class="sermon-image">
                <i class="fas fa-church"></i>
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
                <button class="btn btn-primary" onclick="showSermonDetails(${sermon.id})">
                    View Details
                </button>
            </div>
        `;

        return card;
    }

    // Setup filters
    function setupFilters() {
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', filterSermons);
        }

        // Pastor filter
        if (pastorFilter) {
            pastorFilter.addEventListener('change', filterSermons);
        }

        // Date filter
        if (dateFilter) {
            dateFilter.addEventListener('change', filterSermons);
        }

        // Format filter
        if (formatFilter) {
            formatFilter.addEventListener('change', filterSermons);
        }
    }

    // Filter sermons
    function filterSermons() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedPastor = pastorFilter ? pastorFilter.value : '';
        const selectedDate = dateFilter ? dateFilter.value : '';
        const selectedFormat = formatFilter ? formatFilter.value : '';

        filteredSermons = sermons.filter(sermon => {
            // Search filter
            const matchesSearch = !searchTerm || 
                sermon.title.toLowerCase().includes(searchTerm) ||
                sermon.description.toLowerCase().includes(searchTerm) ||
                sermon.pastor.toLowerCase().includes(searchTerm);

            // Pastor filter
            const matchesPastor = !selectedPastor || sermon.pastor === selectedPastor;

            // Date filter
            const matchesDate = !selectedDate || sermon.date.startsWith(selectedDate);

            // Format filter
            const matchesFormat = !selectedFormat || sermon.formats.includes(selectedFormat);

            return matchesSearch && matchesPastor && matchesDate && matchesFormat;
        });

        renderSermons(filteredSermons);
    }

    // Show sermon details in modal
    window.showSermonDetails = function(sermonId) {
        const sermon = sermons.find(s => s.id === sermonId);
        if (!sermon || !sermonModal) return;

        const modalContent = document.getElementById('sermonModalContent');
        
        let contentHtml = `
            <div class="sermon-details">
                <h2>${sermon.title}</h2>
                <div class="sermon-meta">
                    <p><strong>Pastor:</strong> ${sermon.pastor}</p>
                    <p><strong>Date:</strong> ${formatDate(sermon.date)}</p>
                </div>
                <p class="sermon-description">${sermon.description}</p>
        `;

        // Add format-specific content
        if (sermon.formats.includes('transcript')) {
            contentHtml += `
                <div class="sermon-section">
                    <h3>Transcript</h3>
                    <div class="transcript-content">
                        <p>${sermon.transcript}</p>
                        <p>This is a sample transcript. In a real implementation, this would contain the full sermon text.</p>
                    </div>
                </div>
            `;
        }

        if (sermon.formats.includes('audio') && sermon.files && sermon.files.audio) {
            contentHtml += `
                <div class="sermon-section">
                    <h3>Audio</h3>
                    <audio controls style="width: 100%; margin: 1rem 0;">
                        <source src="http://localhost:3000${sermon.files.audio.path}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <p><small>Original file: ${sermon.files.audio.originalName}</small></p>
                </div>
            `;
        } else if (sermon.formats.includes('audio') && sermon.audioUrl) {
            contentHtml += `
                <div class="sermon-section">
                    <h3>Audio</h3>
                    <audio controls style="width: 100%; margin: 1rem 0;">
                        <source src="${sermon.audioUrl}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <p><small>Note: This is a placeholder audio file. In a real implementation, this would be the actual sermon audio.</small></p>
                </div>
            `;
        }

        if (sermon.formats.includes('video') && sermon.files && sermon.files.video) {
            contentHtml += `
                <div class="sermon-section">
                    <h3>Video</h3>
                    <video controls style="width: 100%; margin: 1rem 0;">
                        <source src="http://localhost:3000${sermon.files.video.path}" type="video/mp4">
                        Your browser does not support the video element.
                    </video>
                    <p><small>Original file: ${sermon.files.video.originalName}</small></p>
                </div>
            `;
        } else if (sermon.formats.includes('video') && sermon.videoUrl) {
            contentHtml += `
                <div class="sermon-section">
                    <h3>Video</h3>
                    <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; margin: 1rem 0;">
                        <iframe 
                            src="${sermon.videoUrl}" 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <p><small>Note: This is a placeholder video. In a real implementation, this would be the actual sermon video.</small></p>
                </div>
            `;
        }

        contentHtml += `
                <div class="sermon-actions">
                    <button class="btn btn-secondary" onclick="document.getElementById('sermonModal').style.display='none'">
                        Close
                    </button>
                </div>
            </div>
        `;

        modalContent.innerHTML = contentHtml;
        sermonModal.style.display = 'block';
    };

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Initialize sermons
    initSermons();

    // Export functions for external use
    window.sermonsManager = {
        sermons,
        filteredSermons,
        renderSermons,
        filterSermons,
        showSermonDetails
    };
});
