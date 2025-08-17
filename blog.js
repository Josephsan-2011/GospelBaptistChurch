// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    // News posts data - will be loaded from server
    let blogPosts = [];
    let filteredPosts = [];
    const blogGrid = document.getElementById('blogGrid');
    const searchInput = document.getElementById('blogSearch');
    const sortSelect = document.getElementById('sortPosts');
    const statusFilter = document.getElementById('statusFilter');


    // Initialize blog
    async function initBlog() {
        await loadNewsFromServer();
        renderBlogPosts(filteredPosts);
        setupBlogControls();
        
        // Set default status filter to "published"
        if (statusFilter) {
            statusFilter.value = 'published';
        }
    }
    
    // Load news from server
    async function loadNewsFromServer() {
        try {
            console.log('Loading news from server...');
            const response = await fetch('http://localhost:3000/api/news');
            
            if (response.ok) {
                const newsData = await response.json();
                console.log('Loaded news data:', newsData);
                
                // Transform server news data to blog post format
                blogPosts = newsData.map(news => ({
                    id: news.id,
                    title: news.title || 'Untitled',
                    date: news.date || news.publishDate || new Date().toISOString().split('T')[0],
                    content: news.content || '',
                    excerpt: (news.content || '').substring(0, 150) + '...',
                    image: news.image || 'https://via.placeholder.com/400x250/FF0000/FFFFFF?text=News',
                    author: news.author || 'Church Staff',
                    category: news.category || 'general',
                    status: news.status || 'published',
                    priority: news.priority || 'normal',
                    featured: news.featured || false
                }));
                
                // Sort by date (newest first)
                blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                // Apply default filter (published only)
                filteredPosts = blogPosts.filter(post => post.status === 'published');
                console.log('Processed blog posts:', blogPosts);
            } else {
                console.error('Failed to load news:', response.status, response.statusText);
                // Fallback to sample data if server fails
                loadSampleData();
            }
        } catch (error) {
            console.error('Error loading news from server:', error);
            // Fallback to sample data if server fails
            loadSampleData();
        }
    }
    
    // Load sample data as fallback
    function loadSampleData() {
        blogPosts = [
            {
                id: 1,
                title: 'Welcome to Our New Website',
                date: '2025-08-09',
                content: 'We are excited to welcome you to our new church website! This platform will help us stay connected with our congregation and share the love of Christ with our community.',
                excerpt: 'We are excited to welcome you to our new church website! This platform will help us stay connected...',
                image: 'https://via.placeholder.com/400x250/FF0000/FFFFFF?text=Welcome',
                author: 'Church Staff'
            }
        ];
        filteredPosts = [...blogPosts];
    }

    // Render blog posts
    function renderBlogPosts(postsToRender) {
        if (!blogGrid) return;

        blogGrid.innerHTML = '';

        if (postsToRender.length === 0) {
            blogGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <h3>No posts found</h3>
                    <p>Try adjusting your search criteria.</p>
                </div>
            `;
            return;
        }

        postsToRender.forEach(post => {
            const postCard = createBlogCard(post);
            blogGrid.appendChild(postCard);
        });
    }

    // Create blog card
    function createBlogCard(post) {
        const card = document.createElement('div');
        card.className = 'blog-card';
        
        card.innerHTML = `
            <div class="blog-image">
                <i class="fas fa-newspaper"></i>
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <div class="blog-meta">
                    <span class="blog-date"><i class="fas fa-calendar"></i> ${formatDate(post.date)}</span>
                    <span class="blog-author"><i class="fas fa-user"></i> ${post.author}</span>
                    <span class="blog-status status-${post.status}">${post.status}</span>
                    ${post.category ? `<span class="blog-category">${post.category}</span>` : ''}
                    ${post.featured ? '<span class="blog-featured">📌 Featured</span>' : ''}
                </div>
                <p class="blog-excerpt">${post.excerpt}</p>
                <button class="btn btn-primary" onclick="showBlogPost(${post.id})">
                    Read More
                </button>
            </div>
        `;

        return card;
    }

    // Setup blog controls
    function setupBlogControls() {
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', filterBlogPosts);
        }

        // Sort functionality
        if (sortSelect) {
            sortSelect.addEventListener('change', sortBlogPosts);
        }
        
        // Status filter functionality
        if (statusFilter) {
            statusFilter.addEventListener('change', filterBlogPosts);
        }


    }

    // Filter blog posts
    function filterBlogPosts() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const statusFilterValue = statusFilter ? statusFilter.value : 'all';
        
        filteredPosts = blogPosts.filter(post => {
            const matchesSearch = !searchTerm || 
                post.title.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm) ||
                post.author.toLowerCase().includes(searchTerm);
            
            const matchesStatus = statusFilterValue === 'all' || post.status === statusFilterValue;
            
            return matchesSearch && matchesStatus;
        });

        renderBlogPosts(filteredPosts);
    }

    // Sort blog posts
    function sortBlogPosts() {
        const sortBy = sortSelect ? sortSelect.value : 'newest';
        
        filteredPosts.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.date) - new Date(a.date);
                case 'oldest':
                    return new Date(a.date) - new Date(b.date);
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        renderBlogPosts(filteredPosts);
    }



    // Show blog post details
    window.showBlogPost = function(postId) {
        const post = blogPosts.find(p => p.id === postId);
        if (!post) return;

        // Create a modal to show the full post
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <div class="blog-post-full">
                    <h1>${post.title}</h1>
                    <div class="blog-meta">
                        <span><i class="fas fa-calendar"></i> ${formatDate(post.date)}</span>
                        <span><i class="fas fa-user"></i> ${post.author}</span>
                    </div>
                    <div class="blog-image-full" style="width: 100%; height: 300px; background: linear-gradient(45deg, #FF0000, #0066CC); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; margin: 1rem 0; border-radius: 8px;">
                        <i class="fas fa-newspaper"></i>
                    </div>
                    <div class="blog-content-full">
                        ${post.content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
                    </div>
                    <div style="margin-top: 2rem;">
                        <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
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
        
        // Remove after 3 seconds
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 300);
        }, 3000);
    }

    // Initialize blog
    initBlog();

    // Refresh news from server
    window.refreshNews = async function() {
        await loadNewsFromServer();
        renderBlogPosts(filteredPosts);
        showSuccessMessage('News refreshed successfully!');
    };
    
    // Export functions for external use
    window.blogManager = {
        blogPosts,
        filteredPosts,
        renderBlogPosts,
        filterBlogPosts,
        sortBlogPosts,
        showBlogPost,
        refreshNews
    };
});
