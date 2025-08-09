// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample blog posts data
    let blogPosts = [
        {
            id: 1,
            title: 'Welcome to Our New Website',
            date: '2025-08-09',
            content: 'We are excited to welcome you to our new church website! This platform will help us stay connected with our congregation and share the love of Christ with our community. Here you will find information about our services, upcoming events, sermons, and ways to get involved in our ministry.',
            excerpt: 'We are excited to welcome you to our new church website! This platform will help us stay connected...',
            image: 'https://via.placeholder.com/400x250/FF0000/FFFFFF?text=Welcome',
            author: 'Church Staff'
        },
        {
            id: 2,
            title: 'Summer Youth Camp Registration Now Open',
            date: '2025-08-05',
            content: 'Registration is now open for our annual summer youth camp! This year\'s theme is "Walking with Jesus" and will include Bible study, outdoor activities, worship, and fellowship. The camp will be held from August 15-20 at the beautiful Mountain View Retreat Center. Space is limited, so please register early.',
            excerpt: 'Registration is now open for our annual summer youth camp! This year\'s theme is "Walking with Jesus"...',
            image: 'https://via.placeholder.com/400x250/0066CC/FFFFFF?text=Youth+Camp',
            author: 'Youth Ministry'
        },
        {
            id: 3,
            title: 'Community Outreach Program Success',
            date: '2025-07-28',
            content: 'Our recent community outreach program was a tremendous success! We were able to serve over 200 families in our community through food distribution, health screenings, and prayer support. Thank you to all the volunteers who made this possible. This is just the beginning of our commitment to serving our neighbors.',
            excerpt: 'Our recent community outreach program was a tremendous success! We were able to serve over 200 families...',
            image: 'https://via.placeholder.com/400x250/00AA00/FFFFFF?text=Outreach',
            author: 'Outreach Committee'
        },
        {
            id: 4,
            title: 'New Bible Study Classes Starting',
            date: '2025-07-20',
            content: 'We are excited to announce new Bible study classes starting next month! We will be offering classes for all age groups, including a special study on the Book of Romans for adults, a youth study on building faith, and a children\'s program focused on Bible stories. Classes will meet weekly and childcare will be provided.',
            excerpt: 'We are excited to announce new Bible study classes starting next month! We will be offering classes...',
            image: 'https://via.placeholder.com/400x250/FFAA00/FFFFFF?text=Bible+Study',
            author: 'Education Ministry'
        },
        {
            id: 5,
            title: 'Prayer Request Update',
            date: '2025-07-15',
            content: 'Thank you for your continued prayers for the Johnson family. We are happy to report that Sarah Johnson\'s surgery was successful and she is recovering well. The family expresses their gratitude for all the prayers and support during this difficult time. Please continue to keep them in your prayers as Sarah continues her recovery.',
            excerpt: 'Thank you for your continued prayers for the Johnson family. We are happy to report that Sarah Johnson\'s surgery...',
            image: 'https://via.placeholder.com/400x250/FF0000/FFFFFF?text=Prayer',
            author: 'Prayer Team'
        }
    ];

    let filteredPosts = [...blogPosts];
    const blogGrid = document.getElementById('blogGrid');
    const searchInput = document.getElementById('blogSearch');
    const sortSelect = document.getElementById('sortPosts');
    const addPostBtn = document.getElementById('addPostBtn');
    const addPostModal = document.getElementById('addPostModal');
    const addPostForm = document.getElementById('addPostForm');
    const cancelPostBtn = document.getElementById('cancelPostBtn');

    // Initialize blog
    function initBlog() {
        renderBlogPosts(filteredPosts);
        setupBlogControls();
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

        // Add post button
        if (addPostBtn) {
            addPostBtn.addEventListener('click', showAddPostModal);
        }

        // Add post form
        if (addPostForm) {
            addPostForm.addEventListener('submit', handleAddPost);
        }

        // Cancel post button
        if (cancelPostBtn) {
            cancelPostBtn.addEventListener('click', hideAddPostModal);
        }
    }

    // Filter blog posts
    function filterBlogPosts() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        filteredPosts = blogPosts.filter(post => {
            return !searchTerm || 
                post.title.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm) ||
                post.author.toLowerCase().includes(searchTerm);
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

    // Show add post modal
    function showAddPostModal() {
        if (addPostModal) {
            addPostModal.style.display = 'block';
            // Set default date to today
            const dateInput = document.getElementById('postDate');
            if (dateInput) {
                dateInput.value = new Date().toISOString().split('T')[0];
            }
        }
    }

    // Hide add post modal
    function hideAddPostModal() {
        if (addPostModal) {
            addPostModal.style.display = 'none';
            if (addPostForm) {
                addPostForm.reset();
            }
        }
    }

    // Handle add post form submission
    function handleAddPost(e) {
        e.preventDefault();
        
        const formData = new FormData(addPostForm);
        const newPost = {
            id: Date.now(),
            title: formData.get('title'),
            date: formData.get('date'),
            content: formData.get('content'),
            excerpt: formData.get('content').substring(0, 150) + '...',
            image: formData.get('image') || 'https://via.placeholder.com/400x250/FF0000/FFFFFF?text=New+Post',
            author: 'Church Staff'
        };

        // Add to beginning of array
        blogPosts.unshift(newPost);
        filteredPosts = [...blogPosts];
        
        // Re-render and hide modal
        renderBlogPosts(filteredPosts);
        hideAddPostModal();
        
        // Show success message
        showSuccessMessage('Post published successfully!');
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

    // Export functions for external use
    window.blogManager = {
        blogPosts,
        filteredPosts,
        renderBlogPosts,
        filterBlogPosts,
        sortBlogPosts,
        showBlogPost,
        addPost: handleAddPost
    };
});
