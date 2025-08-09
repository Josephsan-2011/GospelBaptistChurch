// Language Management
let currentLanguage = 'en';

// Language data for translations
const translations = {
    en: {
        // Navigation
        'Home': 'Home',
        'Calendar': 'Calendar',
        'Sermons': 'Sermons',
        'News': 'News',
        'Contact': 'Contact',
        'Members': 'Members',
        
        // Common
        'Gospel Baptist Church': 'Gospel Baptist Church',
        'All rights reserved.': 'All rights reserved.',
        'Facebook': 'Facebook',
        'Connect With Us': 'Connect With Us',
        'Contact Info': 'Contact Info',
        
        // Buttons
        'Add Event': 'Add Event',
        'Today': 'Today',
        'Save Event': 'Save Event',
        'Delete Event': 'Delete Event',
        'Add Post': 'Add Post',
        'Publish Post': 'Publish Post',
        'Cancel': 'Cancel',
        'Close': 'Close',
        'Send Message': 'Send Message',
        
        // Form labels
        'Event Title': 'Event Title',
        'Date': 'Date',
        'Time': 'Time',
        'Description': 'Description',
        'Color': 'Color',
        'Red': 'Red',
        'Blue': 'Blue',
        'Green': 'Green',
        'Orange': 'Orange',
        'Post Title': 'Post Title',
        'Image URL': 'Image URL',
        'Content': 'Content',
        'Full Name': 'Full Name',
        'Email Address': 'Email Address',
        'Phone Number': 'Phone Number',
        'Subject': 'Subject',
        'Message': 'Message',
        'Select a subject': 'Select a subject',
        'General Inquiry': 'General Inquiry',
        'Prayer Request': 'Prayer Request',
        'Visit Information': 'Visit Information',
        'Volunteer Opportunities': 'Volunteer Opportunities',
        'Other': 'Other',
        
        // Placeholders
        'Search sermons...': 'Search sermons...',
        'Search posts...': 'Search posts...',
        'Please share your message, prayer request, or question here...': 'Please share your message, prayer request, or question here...',
        
        // Messages
        'Message Sent Successfully!': 'Message Sent Successfully!',
        'Thank you for contacting us. We will get back to you as soon as possible.': 'Thank you for contacting us. We will get back to you as soon as possible.',
        
        // Calendar
        'Church Calendar': 'Church Calendar',
        'Add New Event': 'Add New Event',
        
        // Sermons
        'Sermons': 'Sermons',
        'All Pastors': 'All Pastors',
        'Pastor John': 'Pastor John',
        'Pastor Sarah': 'Pastor Sarah',
        'Pastor David': 'Pastor David',
        'All Dates': 'All Dates',
        'All Formats': 'All Formats',
        'Transcript': 'Transcript',
        'Audio': 'Audio',
        'Video': 'Video',
        
        // Blog
        'Church News': 'Church News',
        'Add New Post': 'Add New Post',
        'Newest First': 'Newest First',
        'Oldest First': 'Oldest First',
        'By Title': 'By Title',
        
        // Contact
        'Contact Us': 'Contact Us',
        'Get in Touch': 'Get in Touch',
        'We\'d love to hear from you. Please feel free to reach out to us with any questions, prayer requests, or to learn more about our church.': 'We\'d love to hear from you. Please feel free to reach out to us with any questions, prayer requests, or to learn more about our church.',
        'Send us a Message': 'Send us a Message',
        'Email': 'Email',
        'Phone': 'Phone',
        'Office Hours': 'Office Hours',
        'Monday - Friday: 9:00 AM - 5:00 PM': 'Monday - Friday: 9:00 AM - 5:00 PM',
        'Address': 'Address',
        '123 Church Street, City, State 12345': '123 Church Street, City, State 12345',
        
        // Home page
        'Welcome to Gospel Baptist Church': 'Welcome to Gospel Baptist Church',
        'Sharing the love of Christ with our community': 'Sharing the love of Christ with our community',
        'Service Times': 'Service Times',
        'Donate Online': 'Donate Online',
        'Sunday Service': 'Sunday Service',
        '1:00 PM - 3:00 PM': '1:00 PM - 3:00 PM',
        'Main worship service with preaching and fellowship': 'Main worship service with preaching and fellowship',
        'Saturday Evening Service': 'Saturday Evening Service',
        '5:00 PM - 6:00 PM': '5:00 PM - 6:00 PM',
        'Evening prayer and Bible study': 'Evening prayer and Bible study',
        'Welcome Message': 'Welcome Message',
        'We are delighted to welcome you to Gospel Baptist Church. Our church is a place where people from all walks of life come together to worship, learn, and grow in their faith. Whether you\'re a long-time believer or just beginning your spiritual journey, you\'ll find a warm and welcoming community here.': 'We are delighted to welcome you to Gospel Baptist Church. Our church is a place where people from all walks of life come together to worship, learn, and grow in their faith. Whether you\'re a long-time believer or just beginning your spiritual journey, you\'ll find a warm and welcoming community here.',
        'Join us every Sunday and Saturday as we gather to praise God, study His Word, and encourage one another in our walk with Christ. We look forward to meeting you and sharing in the joy of serving our Lord together.': 'Join us every Sunday and Saturday as we gather to praise God, study His Word, and encourage one another in our walk with Christ. We look forward to meeting you and sharing in the joy of serving our Lord together.',
        'Support Our Ministry': 'Support Our Ministry',
        'Your generous donations help us continue our mission of spreading God\'s love and serving our community. Every contribution makes a difference in our ministry and outreach programs.': 'Your generous donations help us continue our mission of spreading God\'s love and serving our community. Every contribution makes a difference in our ministry and outreach programs.'
    },
    my: {
        // Navigation
        'Home': 'မူလစာမျက်',
        'Calendar': 'က္ခဒိန်',
        'Sermons': 'ဓမ္မဟောကြားချက်များ',
        'News': 'သတင်း',
        'Contact': 'ဆက်သွယ်ရန်',
        'Members': 'အဖွဲ့ဝင်များ',
        
        // Common
        'Gospel Baptist Church': 'သတင်းကောင်း ဗတ္တစ်တ် ဘုရားကျောင်း',
        'All rights reserved.': 'အခွင့်အရေးအားလုံး ထိန်းသိမ်းထားပါသည်။',
        'Facebook': 'ဖေ့စ်ဘွတ်',
        'Connect With Us': 'ကျွန်ုပ်တို့နှင့် ဆက်သွယ်ပါ',
        'Contact Info': 'ဆက်သွယ်ရန် အချက်အလက်',
        
        // Buttons
        'Add Event': 'အစီအစဉ် ထည့်ရန်',
        'Today': 'ယနေ့',
        'Save Event': 'အစီအစဉ် သိမ်းရန်',
        'Delete Event': 'အစီအစဉ် ဖျက်ရန်',
        'Add Post': 'ပို့စ် ထည့်ရန်',
        'Publish Post': 'ပို့စ် ထုတ်ဝေရန်',
        'Cancel': 'ပယ်ဖျက်ရန်',
        'Close': 'ပိတ်ရန်',
        'Send Message': 'မက်ဆေ့ချ် ပို့ရန်',
        
        // Form labels
        'Event Title': 'အစီအစဉ် ခေါင်းစဉ်',
        'Date': 'ရက်စွဲ',
        'Time': 'အချိန်',
        'Description': 'ဖော်ပြချက်',
        'Color': 'အရောင်',
        'Red': 'အနီရောင်',
        'Blue': 'အပြာရောင်',
        'Green': 'အစိမ်းရောင်',
        'Orange': 'လိမ္မော်ရောင်',
        'Post Title': 'ပို့စ် ခေါင်းစဉ်',
        'Image URL': 'ပုံ URL',
        'Content': 'အကြောင်းအရာ',
        'Full Name': 'အမည်အပြည့်အစုံ',
        'Email Address': 'အီးမေးလ် လိပ်စာ',
        'Phone Number': 'ဖုန်းနံပါတ်',
        'Subject': 'ခေါင်းစဉ်',
        'Message': 'မက်ဆေ့ချ်',
        'Select a subject': 'ခေါင်းစဉ် ရွေးချယ်ပါ',
        'General Inquiry': 'ယေဘုယျ မေးခွန်း',
        'Prayer Request': 'ဆုတောင်းခြင်း တောင်းဆိုမှု',
        'Visit Information': 'လည်ပတ်ခြင်း အချက်အလက်',
        'Volunteer Opportunities': 'စေတနာ့ဝန်ထမ်း အခွင့်အလမ်းများ',
        'Other': 'အခြား',
        
        // Placeholders
        'Search sermons...': 'ဓမ္မဟောကြားချက်များ ရှာဖွေရန်...',
        'Search posts...': 'ပို့စ်များ ရှာဖွေရန်...',
        'Please share your message, prayer request, or question here...': 'သင့်မက်ဆေ့ချ်၊ ဆုတောင်းခြင်း တောင်းဆိုမှု သို့မဟုတ် မေးခွန်းကို ဤနေရာတွင် မျှဝေပါ...',
        
        // Messages
        'Message Sent Successfully!': 'မက်ဆေ့ချ် အောင်မြင်စွာ ပို့ပြီးပါပြီ!',
        'Thank you for contacting us. We will get back to you as soon as possible.': 'ကျွန်ုပ်တို့ကို ဆက်သွယ်ပေးသည့်အတွက် ကျေးဇူးတင်ပါသည်။ ကျွန်ုပ်တို့သည် ဖြစ်နိုင်သမျှ မြန်မြန် ပြန်လည်ဆက်သွယ်ပါမည်။',
        
        // Calendar
        'Church Calendar': 'ဘုရားကျောင်း က္ခဒိန်',
        'Add New Event': 'အစီအစဉ်အသစ် ထည့်ရန်',
        
        // Sermons
        'Sermons': 'ဓမ္မဟောကြားချက်များ',
        'All Pastors': 'ဓမ္မဆရာများ အားလုံး',
        'Pastor John': 'ဓမ္မဆရာ ဂျွန်',
        'Pastor Sarah': 'ဓမ္မဆရာ ဆာရာ',
        'Pastor David': 'ဓမ္မဆရာ ဒေးဗစ်',
        'All Dates': 'ရက်စွဲများ အားလုံး',
        'All Formats': 'ပုံစံများ အားလုံး',
        'Transcript': 'စာသား',
        'Audio': 'အသံ',
        'Video': 'ဗီဒီယို',
        
        // Blog
        'Church News': 'ဘုရားကျောင်း သတင်း',
        'Add New Post': 'ပို့စ်အသစ် ထည့်ရန်',
        'Newest First': 'အသစ်ဆုံး ဦးစွာ',
        'Oldest First': 'အဟောင်းဆုံး ဦးစွာ',
        'By Title': 'ခေါင်းစဉ်ဖြင့်',
        
        // Contact
        'Contact Us': 'ကျွန်ုပ်တို့ကို ဆက်သွယ်ပါ',
        'Get in Touch': 'ဆက်သွယ်ရန်',
        'We\'d love to hear from you. Please feel free to reach out to us with any questions, prayer requests, or to learn more about our church.': 'ကျွန်ုပ်တို့သည် သင့်ထံမှ ကြားရရန် လိုလားပါသည်။ မေးခွန်းများ၊ ဆုတောင်းခြင်း တောင်းဆိုမှုများ သို့မဟုတ် ကျွန်ုပ်တို့ ဘုရားကျောင်းအကြောင်း ပိုမိုလေ့လာရန် ကျွန်ုပ်တို့ကို ဆက်သွယ်ရန် ဝမ်းမြောက်ပါသည်။',
        'Send us a Message': 'ကျွန်ုပ်တို့ထံ မက်ဆေ့ချ် ပို့ပါ',
        'Email': 'အီးမေးလ်',
        'Phone': 'ဖုန်း',
        'Office Hours': 'ရုံးချိန်',
        'Monday - Friday: 9:00 AM - 5:00 PM': 'တနင်္လာ - သောကြာ: နံနက် ၉ နာရီ - ညနေ ၅ နာရီ',
        'Address': 'လိပ်စာ',
        '123 Church Street, City, State 12345': '၁၂၃ ဘုရားကျောင်းလမ်း၊ မြို့၊ ပြည်နယ် ၁၂၃၄၅',
        
        // Home page
        'Welcome to Gospel Baptist Church': 'သတင်းကောင်း ဗတ္တစ်တ် ဘုရားကျောင်းသို့ ကြိုဆိုပါသည်',
        'Sharing the love of Christ with our community': 'ခရစ်တော်၏ မေတ္တာကို ကျွန်ုပ်တို့ လူမှုအသိုင်းအဝိုင်းနှင့် မျှဝေခြင်း',
        'Service Times': 'ဘုရားဝတ်ပြုချိန်များ',
        'Donate Online': 'အွန်လိုင်း လှူဒါန်းရန်',
        'Sunday Service': 'တနင်္ဂနွေ ဘုရားဝတ်ပြုချိန်',
        '1:00 PM - 3:00 PM': 'နေ့လည် ၁ နာရီ - ၃ နာရီ',
        'Main worship service with preaching and fellowship': 'ဓမ္မဟောကြားချက်နှင့် ညီညွတ်ခြင်းဖြင့် အဓိက ဘုရားဝတ်ပြုချိန်',
        'Saturday Evening Service': 'စနေညနေ ဘုရားဝတ်ပြုချိန်',
        '5:00 PM - 6:00 PM': 'ညနေ ၅ နာရီ - ၆ နာရီ',
        'Evening prayer and Bible study': 'ညနေခင်း ဆုတောင်းခြင်းနှင့် သမ္မာကျမ်းလေ့လာခြင်း',
        'Welcome Message': 'ကြိုဆိုခြင်း စကားလုံး',
        'We are delighted to welcome you to Gospel Baptist Church. Our church is a place where people from all walks of life come together to worship, learn, and grow in their faith. Whether you\'re a long-time believer or just beginning your spiritual journey, you\'ll find a warm and welcoming community here.': 'သတင်းကောင်း ဗတ္တစ်တ် ဘုရားကျောင်းသို့ သင့်အား ကြိုဆိုရသည်မှာ ဝမ်းမြောက်ပါသည်။ ကျွန်ုပ်တို့ ဘုရားကျောင်းသည် လူမျိုးစုံ လူတန်းစားများ စုဝေးကာ ကိုးကွယ်ခြင်း၊ သင်ယူခြင်းနှင့် ယုံကြည်ခြင်းတွင် ကြီးထွားရန် လာရောက်ကြသော နေရာဖြစ်ပါသည်။ သင်သည် ရှည်လျားသော ယုံကြည်သူ သို့မဟုတ် ဝိညာဉ်ရေးရာ ခရီးကို စတင်နေသူ ဖြစ်စေ၊ ဤနေရာတွင် နွေးထွေးပြီး ကြိုဆိုတတ်သော အသိုင်းအဝိုင်းကို တွေ့ရှိမည်ဖြစ်ပါသည်။',
        'Join us every Sunday and Saturday as we gather to praise God, study His Word, and encourage one another in our walk with Christ. We look forward to meeting you and sharing in the joy of serving our Lord together.': 'ဘုရားသခင်ကို ချီးမွမ်းခြင်း၊ သူ၏ နှုတ်ကပတ်တော်ကို လေ့လာခြင်းနှင့် ခရစ်တော်နှင့်အတူ လျှောက်လှမ်းရာတွင် တစ်ဦးကို တစ်ဦး အားပေးခြင်းဖြင့် စုဝေးကြရန် တနင်္ဂနွေနှင့် စနေနေ့တိုင်း ကျွန်ုပ်တို့နှင့် ပူးပေါင်းပါ။ သင့်ကို တွေ့ဆုံရပြီး ကျွန်ုပ်တို့ သခင်ဘုရားကို အတူတကွ ဝတ်ပြုရခြင်း၏ ဝမ်းမြောက်ခြင်းကို မျှဝေရန် မျှော်လင့်ပါသည်။',
        'Support Our Ministry': 'ကျွန်ုပ်တို့၏ ဝတ်ပြုခြင်းကို ထောက်ပံ့ပါ',
        'Your generous donations help us continue our mission of spreading God\'s love and serving our community. Every contribution makes a difference in our ministry and outreach programs.': 'သင့်၏ ရက်ရောသော လှူဒါန်းမှုများသည် ဘုရားသခင်ကို ဖြန့်ဝေခြင်းနှင့် ကျွန်ုပ်တို့ လူမှုအသိုင်းအဝိုင်းကို ဝတ်ပြုခြင်း ဆက်လက်ပြုရန် ကူညီပေးပါသည်။ လှူဒါန်းမှု တစ်ခုချင်းစီသည် ကျွန်ုပ်တို့၏ ဝတ်ပြုခြင်းနှင့် ပြင်ပရောက်ရှိရေး အစီအစဉ်များတွင် အပြောင်းအလဲ ဖြစ်စေပါသည်။'
    }
};

// Function to change language
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(element => {
        const key = element.dataset.en;
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-en-placeholder]').forEach(element => {
        const key = element.dataset.enPlaceholder;
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update select options
    document.querySelectorAll('option[data-en]').forEach(option => {
        const key = option.dataset.en;
        if (translations[lang] && translations[lang][key]) {
            option.textContent = translations[lang][key];
        }
    });
    
    // Update scripture elements with data-my attributes
    document.querySelectorAll('[data-my]').forEach(element => {
        if (lang === 'my' && element.dataset.my) {
            element.textContent = element.dataset.my;
        } else if (lang === 'en' && element.dataset.en) {
            element.textContent = element.dataset.en;
        }
    });
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => {
            // Toggle menu and hamburger animation
            navList.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navList.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu on window resize (if screen becomes larger)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Members-only authentication
function initMembersAuth() {
    const membersLinks = document.querySelectorAll('.members-link');
    
    membersLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if user is already authenticated
            const token = localStorage.getItem('authToken');
            const role = localStorage.getItem('userRole');
            
            if (token && (role === 'member' || role === 'pastor')) {
                // User is authenticated, redirect to appropriate page
                if (role === 'pastor') {
                    window.location.href = 'pastor.html';
                } else {
                    window.location.href = 'members.html';
                }
            } else {
                // User is not authenticated, show login modal
                showLoginModal();
            }
        });
    });
}

// Modal functionality
function initModals() {
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        const modalContent = modal.querySelector('.modal-content');
        
        // Close on X button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#FF0000';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize scroll arrow functionality
function initScrollArrow() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Initialize hero slideshow functionality
function initHeroSlideshow() {
    const slideshow = document.querySelector('.hero-slideshow');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slide-card');
    const dots = slideshow.querySelectorAll('.nav-dot');
    const prevBtn = slideshow.querySelector('.prev');
    const nextBtn = slideshow.querySelector('.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Touch/swipe variables
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    function showSlide(index) {
        // Remove all classes from all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next', 'far-left', 'far-right');
        });
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Add classes to surrounding slides for fade effect
        const prevIndex = (index - 1 + totalSlides) % totalSlides;
        const nextIndex = (index + 1) % totalSlides;
        const farLeftIndex = (index - 2 + totalSlides) % totalSlides;
        const farRightIndex = (index + 2) % totalSlides;

        slides[prevIndex].classList.add('prev');
        slides[nextIndex].classList.add('next');
        slides[farLeftIndex].classList.add('far-left');
        slides[farRightIndex].classList.add('far-right');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Touch and mouse event handlers
    slideshow.addEventListener('touchstart', handleTouchStart, { passive: true });
    slideshow.addEventListener('touchmove', handleTouchMove, { passive: false });
    slideshow.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    slideshow.addEventListener('mousedown', handleMouseDown);
    slideshow.addEventListener('mousemove', handleMouseMove);
    slideshow.addEventListener('mouseup', handleMouseUp);
    slideshow.addEventListener('mouseleave', handleMouseUp);

    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        endX = e.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        handleSwipe();
    }

    function handleMouseDown(e) {
        startX = e.clientX;
        isDragging = true;
        slideshow.style.cursor = 'grabbing';
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        endX = e.clientX;
    }

    function handleMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        slideshow.style.cursor = 'grab';
        handleSwipe();
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }

    // Auto-advance slides every 5 seconds
    let autoSlideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    slideshow.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slideshow.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Initialize first slide
    showSlide(0);
}

// Initialize parallax and fade effects
function initParallaxEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Remove visible class when element is out of view for fade out effect
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade classes
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .slide-up');
    fadeElements.forEach(el => observer.observe(el));

    // Parallax scroll effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language toggle
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.dataset.lang);
        });
    });
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'my')) {
        changeLanguage(savedLanguage);
    }
    
    // Initialize other functionality
    initMobileMenu();
    initMembersAuth();
    initModals();
    initFormValidation();
    initSmoothScrolling();
    initScrollArrow();
    initHeroSlideshow();
    initParallaxEffects();
    
    // Start photo slider if on home page
    if (document.querySelector('.photo-slider')) {
        startAutoSlide();
    }
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Utility function to show success message
function showSuccessMessage(message) {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        const messageElement = successModal.querySelector('p');
        if (messageElement) {
            messageElement.textContent = message;
        }
        successModal.style.display = 'block';
    }
}

// Utility function to format dates
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Photo slider functionality
let currentPhotoIndex = 0;
const photoCards = document.querySelectorAll('.photo-card');
const totalPhotos = photoCards.length;

function slidePhotos(direction) {
    if (direction === 'next') {
        currentPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
    } else if (direction === 'prev') {
        currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
    }
    
    updatePhotoSlider();
}

function updatePhotoSlider() {
    const slider = document.querySelector('.photo-slider');
    if (slider) {
        const offset = -currentPhotoIndex * (250 + 20); // card width + gap
        slider.style.transform = `translateX(${offset}px)`;
    }
}

// Auto-slide photos every 5 seconds
function startAutoSlide() {
    setInterval(() => {
        slidePhotos('next');
    }, 5000);
}

// Export functions for use in other scripts
window.churchWebsite = {
    changeLanguage,
    showSuccessMessage,
    formatDate,
    currentLanguage: () => currentLanguage,
    slidePhotos
};

// Authentication system with server-side validation
function initAuthentication() {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    
    if (token && userRole) {
        // Verify token with server
        checkAuthStatus();
    } else {
        // If not authenticated, show login modal
        showLoginModal();
    }
}

// Check authentication status with server
async function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        showLoginModal();
        return;
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/status', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (!data.authenticated) {
            // Token is invalid, clear storage and show login
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            showLoginModal();
        }
        // If authenticated, continue with normal flow
    } catch (error) {
        console.error('Error checking auth status:', error);
        // On error, assume not authenticated
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        showLoginModal();
    }
}

// Show login modal
function showLoginModal() {
    const modalHtml = `
        <div class="modal" id="loginModal" style="display: block;">
            <div class="modal-content">
                <span class="close" onclick="closeLoginModal()">&times;</span>
                <h2 data-en="Church Member Login" data-my="ဘုရားကျောင်း အဖွဲ့ဝင် ဝင်ရောက်ခြင်း">Church Member Login</h2>
                
                <div class="login-tabs">
                    <button class="tab-btn active" onclick="switchTab('member')" data-en="Member Login" data-my="အဖွဲ့ဝင် ဝင်ရောက်ခြင်း">Member Login</button>
                    <button class="tab-btn" onclick="switchTab('pastor')" data-en="Pastor Login" data-my="ဓမ္မဆရာ ဝင်ရောက်ခြင်း">Pastor Login</button>
                </div>
                
                <form id="loginForm" class="login-form">
                    <div class="form-group">
                        <label for="loginPassword" data-en="Enter 5-Digit Password" data-my="၅ လုံး စကားဝှက် ထည့်သွင်းပါ">Enter 5-Digit Password</label>
                        <input type="password" id="loginPassword" maxlength="5" pattern="[0-9]{5}" placeholder="12345" required>
                        <small data-en="Enter a 5-digit number" data-my="၅ လုံး ဂဏန်း ထည့်သွင်းပါ">Enter a 5-digit number</small>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary" data-en="Login" data-my="ဝင်ရောက်ရန်">Login</button>
                        <button type="button" class="btn btn-secondary" onclick="closeLoginModal()" data-en="Cancel" data-my="ပယ်ဖျက်ရန်">Cancel</button>
                    </div>
                </form>
                
                <div class="login-info">
                    <p><strong data-en="Member Password:" data-my="အဖွဲ့ဝင် စကားဝှက်:">Member Password:</strong> 12345</p>
                    <p><strong data-en="Pastor Password:" data-my="ဓမ္မဆရာ စကားဝှက်:">Pastor Password:</strong> 54321</p>
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

// Switch between member and pastor login tabs
function switchTab(type) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    if (type === 'member') {
        tabs[0].classList.add('active');
        document.getElementById('loginForm').setAttribute('data-type', 'member');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('loginForm').setAttribute('data-type', 'pastor');
    }
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const password = document.getElementById('loginPassword').value;
    const loginType = document.getElementById('loginForm').getAttribute('data-type') || 'member';
    
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                role: loginType
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store authentication token and role
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userRole', data.role);
            
            closeLoginModal();
            showSuccessMessage(data.message);
            
            // Redirect based on role
            if (data.role === 'pastor') {
                window.location.href = 'pastor.html';
            } else {
                window.location.href = 'members.html';
            }
        } else {
            showErrorMessage(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        showErrorMessage('Network error. Please try again.');
    }
}

// Close login modal
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.remove();
    }
}

// Show success message
function showSuccessMessage(message) {
    const messageHtml = `
        <div class="message-popup success" style="position: fixed; top: 20px; right: 20px; background: #28a745; color: white; padding: 1rem; border-radius: 5px; z-index: 1000;">
            <i class="fas fa-check-circle"></i> ${message}
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', messageHtml);
    
    setTimeout(() => {
        const messageEl = document.querySelector('.message-popup');
        if (messageEl) messageEl.remove();
    }, 3000);
}

// Show error message
function showErrorMessage(message) {
    const messageHtml = `
        <div class="message-popup error" style="position: fixed; top: 20px; right: 20px; background: #dc3545; color: white; padding: 1rem; border-radius: 5px; z-index: 1000;">
            <i class="fas fa-exclamation-circle"></i> ${message}
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', messageHtml);
    
    setTimeout(() => {
        const messageEl = document.querySelector('.message-popup');
        if (messageEl) messageEl.remove();
    }, 3000);
}

// Check if user is authenticated as member
function isMemberAuthenticated() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    return token && (role === 'member' || role === 'pastor');
}

// Check if user is authenticated as pastor
function isPastorAuthenticated() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    return token && role === 'pastor';
}

// Get authentication token
function getAuthToken() {
    return localStorage.getItem('authToken');
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

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

// Language toggle functionality
function initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Remove active class from all buttons
            langBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Change language
            changeLanguage(lang);
        });
    });
}

// Change language
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-en][data-my]');
    
    elements.forEach(element => {
        if (lang === 'my') {
            element.textContent = element.getAttribute('data-my');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // Update placeholders
    const inputs = document.querySelectorAll('[data-en-placeholder][data-my-placeholder]');
    inputs.forEach(input => {
        if (lang === 'my') {
            input.placeholder = input.getAttribute('data-my-placeholder');
        } else {
            input.placeholder = input.getAttribute('data-en-placeholder');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }
}

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide-card');
    const dots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev', 'next', 'far-left', 'far-right');
            
            if (i === index) {
                slide.classList.add('active');
            } else if (i === (index - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            } else if (i === (index + 1) % slides.length) {
                slide.classList.add('next');
            } else if (i === (index - 2 + slides.length) % slides.length) {
                slide.classList.add('far-left');
            } else if (i === (index + 2) % slides.length) {
                slide.classList.add('far-right');
            }
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Auto-advance slides
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Arrow navigation
    const prevBtn = document.querySelector('.slideshow-control.prev');
    const nextBtn = document.querySelector('.slideshow-control.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .slide-up, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
