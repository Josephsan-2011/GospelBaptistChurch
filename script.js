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
        'Edit': 'Edit',
    
        
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
        'News': 'ကြေညာချက်',
        'Contact': 'ဆက်သွယ်ရန်',
        'Edit': 'တည်းဖြတ်ရန်',
    
        
        // Common
        'Gospel Baptist Church': 'သတင်းကောင်းနှစ်ခြင်းအသင်းတော်',
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
        'Church News': 'ဘုရားကျောင်း ကြေညာချက်',
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
        'Welcome to Gospel Baptist Church': 'သတင်းကောင်းနှစ်ခြင်းအသင်းတော်သို့ ကြိုဆိုပါသည်',
        'Sharing the love of Christ with our community': 'ခရစ်တော်၏ မေတ္တာကို ကျွန်ုပ်တို့ လူမှုအသိုင်းအဝိုင်းနှင့် မျှဝေခြင်း',
        'Service Times': 'ဘုရားဝတ်ပြုချိန်များ',
        'Donate Online': 'အွန်လိုင်း လှူဒါန်းရန်',
        'Sunday Service': 'တနင်္ဂနွေ ဘုရားဝတ်ပြုချိန်',
        '1:00 PM - 3:00 PM': 'နေ့လည် ၁ နာရီ - ၃ နာရီ',
        'Main worship service with preaching and fellowship': 'ဓမ္မဟောကြားချက်နှင့် ညီညွတ်ခြင်းဖြင့် အဓိက ဘုရားဝတ်ပြုချိန်',
        'Saturday Evening Service': 'စနေညနေ ဘုရားဝတ်ပြုချိန်',
        '5:00 PM - 6:00 PM': 'ညနေ ၅ နာရီ - ၆ နာရီ',
        'Evening prayer and Bible study': 'ညနေခင်း ဆုတောင်းခြင်းနှင့် သမ္မာကျမ်းလေ့လာခြင်း',
        'Welcome Message': 'လှိုက်လှဲစွာကြိုဆိုပါ၏',
        'We are delighted to welcome you to Gospel Baptist Church. Our church is a place where people from all walks of life come together to worship, learn, and grow in their faith. Whether you\'re a long-time believer or just beginning your spiritual journey, you\'ll find a warm and welcoming community here.': 'သတင်းကောင်းနှစ်ခြင်းအသင်းတော်မှ သင့်အား ဝမ်းမြောက်စွာ ကြိုဆိုပါသည်။ကျွန်ုပ်တို့ဘုရားကျောင်းမှာ လူတန်းစားမရွှေး ဘာသာလူမျိုးမရွှေး စုဝေးကာ ကိုးကွယ်ခြင်း၊ သင်ယူခြင်း၊ယုံကြည်ခြင်း အစရှိသည်များကို ကြီးထွားရင့်ကျက်လာစေရန် စုဝေးသော နေရာပင် ဖြစ်ပါသည်။ သင်သည် ဝိညာဉ်ရေးရာ ကြီးထွားရင့်ကျက်သောသူ (သို့)ဝိညာဥ်ရေးရာ ခရီးကို စတင်နေသူဖြစ်စေ ဤနေရာမှ သင့်အား နွေးထွေးစွာ ကြိုဆိုတတ်သောအသိုင်းအဝိုင်းကို တွေ့ရှိမည်ဖြစ်ပါသည်။ ဘုရားသခင်ကို ချီးမွမ်းခြင်း၊ သူ၏ နှုတ်ကပတ်တော်ကို လေ့လာခြင်းနှင့် ခရစ်တော်နှင့်အတူ လျှောက်လှမ်းရာတွင် တစ်ဦးကို တစ်ဦး အားပေးခြင်းဖြင့် စုဝေးကြရန် တနင်္ဂနွေနှင့် စနေနေ့တိုင်း ကျွန်ုပ်တို့နှင့် တွဲလက်မြဲစေလိုပါသည်။ သင့်နှင့်ဆုံ တွေ့ရပြီး ကျွန်ုပ်တို့၏ ဘုရားသခင်အား အတူတကွ ဝတ်ပြုရခြင်းဖြင့် ဝမ်းမြောက်ခြင်းကို ခံစားရရှိရန် မျှော်လင့်ပါသည်။',
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
        // Keep the entire pastor section in English at all times
        if (element.closest('.about-pastor')) return;
        const key = element.dataset.en;
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-en-placeholder]').forEach(element => {
        if (element.closest('.about-pastor')) return;
        const key = element.dataset.enPlaceholder;
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update select options
    document.querySelectorAll('option[data-en]').forEach(option => {
        if (option.closest('.about-pastor')) return;
        const key = option.dataset.en;
        if (translations[lang] && translations[lang][key]) {
            option.textContent = translations[lang][key];
        }
    });
    
    // Update scripture elements with data-my attributes
    document.querySelectorAll('[data-my]').forEach(element => {
        if (element.closest('.about-pastor')) return;
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
        // Accessibility attributes and identifiers
        if (!navList.id) {
            navList.id = 'primary-navigation';
        }
        mobileToggle.setAttribute('aria-controls', navList.id);
        mobileToggle.setAttribute('aria-expanded', 'false');
        navList.setAttribute('aria-hidden', 'true');
        navList.setAttribute('role', 'menu');
        navList.querySelectorAll('a.nav-link').forEach(link => link.setAttribute('role', 'menuitem'));

        // Ensure backdrop exists
        let backdrop = document.querySelector('.mobile-menu-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'mobile-menu-backdrop';
            document.body.appendChild(backdrop);
        }

        mobileToggle.addEventListener('click', () => {
            // Toggle menu and hamburger animation
            navList.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navList.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                mobileToggle.setAttribute('aria-expanded', 'true');
                navList.setAttribute('aria-hidden', 'false');
                backdrop.classList.add('active');
            } else {
                document.body.style.overflow = '';
                mobileToggle.setAttribute('aria-expanded', 'false');
                navList.setAttribute('aria-hidden', 'true');
                backdrop.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
                mobileToggle.setAttribute('aria-expanded', 'false');
                navList.setAttribute('aria-hidden', 'true');
                const backdropEl = document.querySelector('.mobile-menu-backdrop');
                if (backdropEl) backdropEl.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
                mobileToggle.setAttribute('aria-expanded', 'false');
                navList.setAttribute('aria-hidden', 'true');
                const backdropEl = document.querySelector('.mobile-menu-backdrop');
                if (backdropEl) backdropEl.classList.remove('active');
            }
        });
        
        // Close when clicking backdrop
        backdrop.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
            mobileToggle.setAttribute('aria-expanded', 'false');
            navList.setAttribute('aria-hidden', 'true');
            backdrop.classList.remove('active');
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
                mobileToggle.setAttribute('aria-expanded', 'false');
                navList.setAttribute('aria-hidden', 'true');
                const backdropEl = document.querySelector('.mobile-menu-backdrop');
                if (backdropEl) backdropEl.classList.remove('active');
            }
        });

        // Close mobile menu on window resize (if screen becomes larger)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
                mobileToggle.setAttribute('aria-expanded', 'false');
                navList.setAttribute('aria-hidden', 'true');
                const backdropEl = document.querySelector('.mobile-menu-backdrop');
                if (backdropEl) backdropEl.classList.remove('active');
            }
        });
    }
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
                // Custom smooth scroll with gentler easing and duration
                const targetY = servicesSection.getBoundingClientRect().top + window.pageYOffset;
                smoothScrollTo(targetY, 1200);
            }
        });
    }
}

// Smoothly scroll the window to a specific Y position with easing
function smoothScrollTo(targetY, duration = 1000) {
    // Respect user reduced motion preference
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        window.scrollTo(0, targetY);
        return;
    }

    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;

    // Ease in-out cubic
    function ease(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp) {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = ease(progress);
        window.scrollTo(0, startY + distance * eased);
        if (elapsed < duration) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Initialize hero slideshow functionality
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.image-modal-close');

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    });

    // Add click handlers to all slideshow slides to open category modal
    const slideshowSlides = document.querySelectorAll('.slide-card');
    
    if (slideshowSlides.length === 0) {
        return;
    }
    
    slideshowSlides.forEach((slide, index) => {
        slide.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const category = this.getAttribute('data-category');
            
            if (category) {
                // Redirect to gallery page with category parameter
                const galleryUrl = `gallery.html?category=${encodeURIComponent(category)}`;
                window.location.href = galleryUrl;
            }
        });
    });
    
    // Add click handlers to other images on the page (optional)
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        // Skip small icons and buttons
        if (img.width > 100 && img.height > 100) {
            img.addEventListener('click', () => {
                modalImg.src = img.src;
                modalCaption.textContent = img.alt || 'Image';
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            });
        }
    });
}

function initHeroSlideshow() {
    const slideshow = document.querySelector('.hero-slideshow');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slide-card');
    const navContainer = slideshow.querySelector('.slideshow-nav');
    let dots = slideshow.querySelectorAll('.nav-dot');
    const prevBtn = slideshow.querySelector('.prev');
    const nextBtn = slideshow.querySelector('.next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Touch/swipe variables
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    // Prevent rapid multi-advance
    let isTransitioning = false;
    let lastChangeAt = 0;
    const MIN_CHANGE_GAP_MS = 650;

    function canChangeSlide() {
        const now = Date.now();
        if (isTransitioning || now - lastChangeAt < MIN_CHANGE_GAP_MS) return false;
        isTransitioning = true;
        lastChangeAt = now;
        setTimeout(() => { isTransitioning = false; }, MIN_CHANGE_GAP_MS);
        return true;
    }

    function showSlide(index) {
        // Remove all classes from all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });
        if (dots && dots.length) {
            dots.forEach(dot => dot.classList.remove('active'));
        }

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        if (dots && dots[index]) {
            dots[index].classList.add('active');
        }

        // Add classes to surrounding slides for fade effect (only 3 slides visible)
        const prevIndex = (index - 1 + totalSlides) % totalSlides;
        const nextIndex = (index + 1) % totalSlides;

        slides[prevIndex].classList.add('prev');
        slides[nextIndex].classList.add('next');

        // Ensure slideshow container maintains full view
        slideshow.style.overflow = 'visible';
        slideshow.style.minHeight = '500px';
    }

    function nextSlideInternal() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function nextSlide() {
        if (!canChangeSlide()) return;
        nextSlideInternal();
        restartAuto();
    }

    function prevSlideInternal() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        if (!canChangeSlide()) return;
        prevSlideInternal();
        restartAuto();
    }

    function goToSlide(index) {
        if (index === currentSlide) return;
        if (!canChangeSlide()) return;
        currentSlide = index;
        showSlide(currentSlide);
        restartAuto();
    }

    // Build navigation dots dynamically to always match slide count
    if (navContainer) {
        navContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            navContainer.appendChild(dot);
        }
        dots = slideshow.querySelectorAll('.nav-dot');
    }

    // If a slide image fails to load (e.g., unsupported format), hide the image and mark the slide
    slideshow.querySelectorAll('.slide-image img').forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            const slideCard = img.closest('.slide-card');
            if (slideCard) slideCard.classList.add('image-missing');
        });
    });

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (dots && dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
    }

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
        stopAuto();
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
        startAuto();
    }

    function handleMouseDown(e) {
        startX = e.clientX;
        isDragging = true;
        slideshow.style.cursor = 'grabbing';
        stopAuto();
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
        startAuto();
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

    // Auto-advance control
    let autoSlideInterval;
    function stopAuto() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    function startAuto() {
        stopAuto();
        autoSlideInterval = setInterval(() => {
            // Only advance if allowed (prevents multi-skip)
            if (canChangeSlide()) {
                nextSlideInternal();
            }
        }, 8000);
    }
    function restartAuto() {
        startAuto();
    }

    // Pause/resume on hover (desktop)
    slideshow.addEventListener('mouseenter', () => {
        stopAuto();
    });

    slideshow.addEventListener('mouseleave', () => {
        startAuto();
    });

    // Ensure slideshow always shows full view by resetting to first slide periodically
    let resetInterval = setInterval(() => {
        // Always ensure the full slideshow view is visible
        showSlide(currentSlide);
    }, 15000); // Check every 15 seconds to prevent "sleep mode"

    // Initialize first slide
    showSlide(0);
    
    // Ensure slideshow is always visible and properly positioned
    slideshow.style.visibility = 'visible';
    slideshow.style.opacity = '1';
    
    // Start auto after initial render
    startAuto();

    // Reinitialize image modal for slideshow images
    initImageModal();
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
    initModals();
    initFormValidation();
    initSmoothScrolling();
    initScrollArrow();
    initImageModal();
    initHeroSlideshow();
    initParallaxEffects();
    initPastorBioToggle();
    initImageLoadingEnhancements();
    initAuthentication(); // Initialize authentication system

    initScrollAnimations();
    
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
    }
    // Don't automatically show login modal - wait for user to click login button
    
    // Add event listeners for login buttons
    const loginBtn = document.getElementById('loginBtn');
    const mainLoginBtn = document.getElementById('mainLoginBtn');
    
    if (loginBtn) {
        console.log('Login button found, adding event listener');
        loginBtn.addEventListener('click', () => {
            console.log('Login button clicked!');
            showLoginModal();
        });
    } else {
        console.log('Login button not found');
    }
    
    if (mainLoginBtn) {
        console.log('Main login button found, adding event listener');
        mainLoginBtn.addEventListener('click', () => {
            console.log('Main login button clicked!');
            showLoginModal();
        });
    } else {
        console.log('Main login button not found');
    }
    
    // Update UI based on authentication status
    updateAuthUI();
}

// Check authentication status with server
async function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        updateAuthUI();
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
            updateAuthUI();
        } else {
            // If authenticated, update UI
            updateAuthUI();
        }
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
    console.log('showLoginModal called');
    
    // Check if modal already exists
    if (document.getElementById('loginModal')) {
        console.log('Modal already exists, showing it');
        document.getElementById('loginModal').style.display = 'block';
        return;
    }
    
    const modalHtml = `
        <div class="modal" id="loginModal" style="display: block;">
            <div class="modal-content">
                <span class="close" onclick="closeLoginModal()">&times;</span>
                <h2 data-en="Pastor Login" data-my="ဓမ္မဆရာ ဝင်ရောက်ခြင်း">Pastor Login</h2>
                
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
            showSuccessMessage(data.message);
            
            // Redirect to pastor dashboard
            window.location.href = 'pastor.html';
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

    // Highlight current page on load
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Language toggle functionality
function initLanguageToggle() {
    const langBtns = document.querySelectorAll('.lang-btn');
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // Set initial language
    changeLanguage(savedLang);
    
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
    
    // Add fading effect to all translatable elements
    elements.forEach(element => {
        if (element.closest('.about-pastor')) return; // Skip pastor section
        element.classList.add('language-transitioning');
    });
    
    // Wait for fade out, then change content and fade in
    setTimeout(() => {
        elements.forEach(element => {
            if (element.closest('.about-pastor')) return; // Keep English
            if (lang === 'my') {
                element.textContent = element.getAttribute('data-my');
            } else {
                element.textContent = element.getAttribute('data-en');
            }
            // Remove transitioning class to fade in
            element.classList.remove('language-transitioning');
        });
        
        // Update placeholders with fade effect
        const inputs = document.querySelectorAll('[data-en-placeholder][data-my-placeholder]');
        inputs.forEach(input => {
            if (input.closest('.about-pastor')) return; // Skip pastor section
            input.style.opacity = '0';
            input.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                if (lang === 'my') {
                    input.placeholder = input.getAttribute('data-my-placeholder');
                } else {
                    input.placeholder = input.getAttribute('data-en-placeholder');
                }
                input.style.opacity = '1';
                input.style.transform = 'translateY(0)';
            }, 200);
        });
    }, 200);
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update button states
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
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



// Global function to get photos for a specific category
function getCategoryPhotos(category) {
    const categoryPhotos = {
        'Church Camp': [
            'ChurchWebsiteIMG/Church Camp/IMG_20250811_112731 (2).heic'
        ],
        'Church Picnic': [
            'ChurchWebsiteIMG/Church Picnic/04c076b0-80b4-4ae9-931c-4ede7caf64ee.jpeg',
            'ChurchWebsiteIMG/Church Picnic/69dec00b-04c9-4aa7-80fb-4bcc9794efad.jpeg',
            'ChurchWebsiteIMG/Church Picnic/0c5d283d-f9c0-4eb3-be1d-d99f58b2c337.jpeg',
            'ChurchWebsiteIMG/Church Picnic/decbacbe-3bc2-46c5-abe1-d053315c2cf8.jpeg',
            'ChurchWebsiteIMG/Church Picnic/6240a6a8-b9af-407b-b6e4-c6c30696a790.jpeg',
            'ChurchWebsiteIMG/Church Picnic/c021b34a-9a07-4cb7-8273-1f27c3290b26.jpeg',
            'ChurchWebsiteIMG/Church Picnic/2178f80d-791e-471e-bbc2-29944e8110e5.jpeg',
            'ChurchWebsiteIMG/Church Picnic/bcea2b5b-c71d-40de-aecf-4962ce0e45f9.jpeg',
            'ChurchWebsiteIMG/Church Picnic/d2747f43-8cc9-4e90-8575-ae4b72d37a0d.jpeg',
            'ChurchWebsiteIMG/Church Picnic/cfe69ec6-9938-4688-84de-19cbc6d16556.jpeg',
            'ChurchWebsiteIMG/Church Picnic/82f5617e-1796-4c90-bfda-44305bdff44b.jpeg',
            'ChurchWebsiteIMG/Church Picnic/4307166a-1572-4a1f-8b50-b29a786f4d5c.jpeg',
            'ChurchWebsiteIMG/Church Picnic/bb1cb074-1743-484e-9944-a9d2f8850224.jpeg',
            'ChurchWebsiteIMG/Church Picnic/f9d14d07-b0bd-47f3-9a53-9f05ad402997.jpeg',
            'ChurchWebsiteIMG/Church Picnic/aca20ea2-21f6-4bba-9fcf-9c654bcfd2fa.jpeg',
            'ChurchWebsiteIMG/Church Picnic/0685e7fc-4237-4cc9-a02a-59860c16e264.jpeg',
            'ChurchWebsiteIMG/Church Picnic/a6fc6c3b-01e8-42ec-8f1b-8328e74ef54a.jpeg',
            'ChurchWebsiteIMG/Church Picnic/ccf7a885-7b15-4d0f-84b1-4930c7fec341.jpeg'
        ],
        'Church Sunday School': [
            'ChurchWebsiteIMG/Church Sunday School/groupphoto3.jpg',
            'ChurchWebsiteIMG/Church Sunday School/IMG_20250811_112731 (3).jpg',
            'ChurchWebsiteIMG/Church Sunday School/IMG_20250811_112731 (4).jpg',
            'ChurchWebsiteIMG/Church Sunday School/IMG_20250811_113656 (1).heic'
        ],
        'Church General Photos': [
            'ChurchWebsiteIMG/Church General Photos/IMG_20250811_122655 (2).jpg',
            'ChurchWebsiteIMG/Church General Photos/IMG_20250811_122655.jpg',
            'ChurchWebsiteIMG/Church General Photos/IMG_20250811_113656 (2).heic',
            'ChurchWebsiteIMG/Church General Photos/IMG_20250811_113656 (3).heic',
            'ChurchWebsiteIMG/Church General Photos/IMG_20250811_113656 (4).heic',
            'ChurchWebsiteIMG/Church General Photos/IMG_20250811_113656.heic',
            'ChurchWebsiteIMG/Church General Photos/IMG_20250811_112731 (1).heic'
        ],
        'Pastor Paul Family': [
            'pastorpaulface.jpeg',
            'groupphoto1.jpg',
            'groupphoto2.jpg',
            'groupphoto3.jpg',
            'groupphoto4.jpg'
        ],
        'Church Mother-Father Day': [
            'ChurchWebsiteIMG/Church Mother-Father Day/IMG_20250811_113351.jpg',
            'ChurchWebsiteIMG/Church Mother-Father Day/groupphoto1.jpg',
            'ChurchWebsiteIMG/Church Mother-Father Day/groupphoto2.jpg',
            'ChurchWebsiteIMG/Church Mother-Father Day/groupphoto4.jpg'
        ],
        'Church Baptism': [
            'ChurchWebsiteIMG/Church Baptism/IMG_20250811_122655 (1).jpg',
            'ChurchWebsiteIMG/Church Baptism/IMG_20250811_112730.jpg',
            'ChurchWebsiteIMG/Church Baptism/IMG_20250811_112731 (5).jpg',
            'ChurchWebsiteIMG/Church Baptism/IMG_20250811_112731 (1).jpg',
            'ChurchWebsiteIMG/Church Baptism/IMG_20250811_112731 (2).jpg',
            'ChurchWebsiteIMG/Church Baptism/IMG_20250811_112731.jpg'
        ],
        'Church Holidays': [
            'ChurchWebsiteIMG/Church Holidays/IMG_20250811_122655 (3).jpg'
        ],
        'Church Service': [
            'groupphoto1.jpg',
            'groupphoto2.jpg',
            'groupphoto3.jpg',
            'groupphoto4.jpg',
            '6240a6a8-b9af-407b-b6e4-c6c30696a790.jpeg',
            '2178f80d-791e-471e-bbc2-29944e8110e5.jpeg',
            '69dec00b-04c9-4aa7-80fb-4bcc9794efad.jpeg',
            '0c5d283d-f9c0-4eb3-be1d-d99f58b2c337.jpeg',
            'd2747f43-8cc9-4e90-8575-ae4b72d37a0d.jpeg',
            '82f5617e-1796-4c90-bfda-44305bdff44b.jpeg',
            '4307166a-1572-4a1f-8b50-b29a786f4d5c.jpeg',
            'bb1cb074-1743-484e-9944-a9d2f8850224.jpeg',
            'f9d14d07-b0bd-47f3-9a53-9f05ad402997.jpeg',
            'aca20ea2-21f6-4bba-9fcf-9c654bcfd2fa.jpeg',
            '8885d7a2-2fb1-4189-86f8-066341c8a925.jpeg',
            'IMG_20250811_113656.jpg',
            'IMG_20250811_113351.jpg',
            'IMG_20250811_112730.jpg',
            'IMG_20250811_112731 (5).jpg',
            'IMG_20250811_112731 (1).jpg',
            'IMG_20250811_112731 (2).jpg',
            'IMG_20250811_112731 (3).jpg',
            'IMG_20250811_112731 (4).jpg',
            'IMG_20250811_112731.jpg'
        ]
    };
    
    return categoryPhotos[category] || [];
}

// Global function to get Myanmar title for a category
function getMyanmarTitle(category) {
    const myanmarTitles = {
        'Church Camp': 'ဘုရားကျောင်း စခန်း',
        'Church Picnic': 'ဘုရားကျောင်း စားသောက်ပွဲ',
        'Church Sunday School': 'ဘုရားကျောင်း တနင်္ဂနွေကျောင်း',
        'Church General Photos': 'ဘုရားကျောင်း ယေဘုယျ ဓာတ်ပုံများ',
        'Pastor Paul Family': 'ဓမ္မဆရာ ပေါလ် မိသားစု',
        'Church Mother-Father Day': 'ဘုရားကျောင်း အမေနေ့-အဖေနေ့',
        'Church Baptism': 'ဘုရားကျောင်း နှစ်ခြင်းမင်္ဂလာ',
        'Church Holidays': 'ဘုရားကျောင်း အားလပ်ရက်များ',
        'Church Service': 'ဘုရားကျောင်း ဝတ်ပြုချိန်'
    };
    return myanmarTitles[category] || category;
}

// Pastor Bio "See More" functionality
function initPastorBioToggle() {
    const pastorBio = document.getElementById('pastorBio');
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    
    if (!pastorBio || !seeMoreBtn) return;
    
    // Check if the bio is long enough to need truncation
    const bioHeight = pastorBio.scrollHeight;
    const lineHeight = parseFloat(getComputedStyle(pastorBio).lineHeight);
    const maxLines = 2;
    const maxHeight = lineHeight * maxLines;
    
    if (bioHeight <= maxHeight) {
        // Bio is short enough, hide the button
        seeMoreBtn.style.display = 'none';
        return;
    }
    
    // Initially collapse the bio
    pastorBio.classList.add('collapsed');
    pastorBio.style.maxHeight = maxHeight + 'px';
    
    let isExpanded = false;
    
    seeMoreBtn.addEventListener('click', function() {
        if (isExpanded) {
            // Collapse
            pastorBio.classList.add('collapsed');
            pastorBio.style.maxHeight = maxHeight + 'px';
            seeMoreBtn.textContent = currentLanguage === 'my' ? 'ထပ်ကြည့်ရန်...' : 'See More...';
            isExpanded = false;
        } else {
            // Expand
            pastorBio.classList.remove('collapsed');
            pastorBio.style.maxHeight = bioHeight + 'px';
            seeMoreBtn.textContent = currentLanguage === 'my' ? 'လျှော့ပြရန်...' : 'See Less...';
            isExpanded = true;
        }
    });
    
    // Update button text when language changes
    const originalSeeMoreText = seeMoreBtn.getAttribute('data-en');
    const originalSeeLessText = 'See Less...';
    const originalSeeMoreTextMy = seeMoreBtn.getAttribute('data-my');
    const originalSeeLessTextMy = 'လျှော့ပြရန်...';
    
    // Store the original language change function
    const originalChangeLanguage = window.changeLanguage;
    
    // Override the language change function to update button text
    window.changeLanguage = function(lang) {
        originalChangeLanguage(lang);
        
        if (seeMoreBtn) {
            // Force English text for the pastor bio toggle at all times
            seeMoreBtn.textContent = isExpanded ? originalSeeLessText : originalSeeMoreText;
        }
    };
}

// Global image loading enhancements for desktop and mobile
function initImageLoadingEnhancements() {
    function enhanceImage(img) {
        if (!img) return;

        // Add error fallback for any image on the site
        if (!img.dataset.fallbackBound) {
            img.addEventListener('error', () => {
                if (img.src && !img.src.endsWith('template.png')) {
                    img.src = 'template.png';
                }
            });
            img.dataset.fallbackBound = 'true';
        }

        // Critical image: first hero slide image loads eagerly, others lazy
        const firstHeroImage = document.querySelector('.hero-slideshow .slide-card .slide-image img');
        const isFirstHero = firstHeroImage && img === firstHeroImage;
        if (isFirstHero) {
            img.loading = 'eager';
            img.decoding = 'sync';
            img.setAttribute('fetchpriority', 'high');
        } else if (!img.loading) {
            img.loading = 'lazy';
            img.decoding = 'async';
        }

        // Improve responsiveness for slideshow images
        if (img.closest('.hero-slideshow')) {
            img.sizes = '(max-width: 480px) 300px, (max-width: 768px) 350px, 400px';
        }
    }

    // Enhance all current images
    document.querySelectorAll('img').forEach(enhanceImage);

    // Observe future images (e.g., gallery content injected on DOMContentLoaded)
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType !== 1) return; // ELEMENT_NODE
                if (node.tagName === 'IMG') {
                    enhanceImage(node);
                } else {
                    node.querySelectorAll && node.querySelectorAll('img').forEach(enhanceImage);
                }
            });
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Update authentication UI based on login status
function updateAuthUI() {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    const loginBtn = document.getElementById('loginBtn');
    const mainLoginBtn = document.getElementById('mainLoginBtn');
    
    if (token && userRole) {
        // User is authenticated - show logout button
        if (loginBtn) {
            loginBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> ${userRole === 'pastor' ? 'Pastor Logout' : 'Member Logout'}`;
            loginBtn.onclick = () => logout();
            loginBtn.className = 'btn btn-secondary';
        }
        
        if (mainLoginBtn) {
            mainLoginBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> ${userRole === 'pastor' ? 'Pastor Logout' : 'Member Logout'}`;
            mainLoginBtn.onclick = () => logout();
            mainLoginBtn.className = 'btn btn-secondary';
        }
        
        // Update login section content
        const loginSection = document.querySelector('.login-section');
        if (loginSection) {
            const loginContent = loginSection.querySelector('.login-content');
            if (loginContent) {
                loginContent.innerHTML = `
                    <h2 class="section-title fade-in" data-en="Welcome Back!" data-my="ပြန်လည်ကြိုဆိုပါသည်!">Welcome Back!</h2>
                    <div class="login-info slide-up">
                        <p data-en="You are logged in as a ${userRole === 'pastor' ? 'Pastor' : 'Member'}" data-my="သင်သည် ${userRole === 'pastor' ? 'ဓမ္မဆရာ' : 'အဖွဲ့ဝင်'} အဖြစ် ဝင်ရောက်ထားပါသည်">You are logged in as a ${userRole === 'pastor' ? 'Pastor' : 'Member'}</p>
                        
                        <div class="login-actions">
                            ${userRole === 'pastor' ? `
                                <a href="pastor.html" class="btn btn-primary btn-large" data-en="Go to Pastor Dashboard" data-my="ဓမ္မဆရာ ဒက်ရှ်ဘုတ်သို့ သွားရန်">Go to Pastor Dashboard</a>
                            ` : ''}
                            <button class="btn btn-secondary btn-large" onclick="logout()" data-en="Logout" data-my="ထွက်ရန်">Logout</button>
                        </div>
                    </div>
                `;
            }
        }
    } else {
        // User is not authenticated - show login buttons
        if (loginBtn) {
            loginBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> Login`;
            loginBtn.onclick = () => showLoginModal();
            loginBtn.className = 'btn btn-primary';
        }
        
        if (mainLoginBtn) {
            mainLoginBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> Login Now`;
            mainLoginBtn.onclick = () => showLoginModal();
            mainLoginBtn.className = 'btn btn-primary btn-large';
        }
    }
}

// Logout function
function logout() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        try {
            fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).catch(error => {
                console.error('Logout error:', error);
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    
    // Update UI
    updateAuthUI();
    
    // Show success message
    showSuccessMessage('Logged out successfully!');
}
