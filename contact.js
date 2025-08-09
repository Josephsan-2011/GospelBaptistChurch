// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');

    // Initialize contact form
    function initContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactSubmit);
        }

        if (closeSuccessBtn) {
            closeSuccessBtn.addEventListener('click', function() {
                successModal.style.display = 'none';
            });
        }

        // Close success modal on outside click
        if (successModal) {
            successModal.addEventListener('click', function(e) {
                if (e.target === successModal) {
                    successModal.style.display = 'none';
                }
            });
        }
    }

    // Handle contact form submission
    function handleContactSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form data
        if (!validateContactForm(contactData)) {
            return;
        }

        // Simulate form submission (in a real implementation, this would send to a server)
        simulateFormSubmission(contactData);
    }

    // Validate contact form
    function validateContactForm(data) {
        const errors = [];

        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
            highlightField('name', true);
        } else {
            highlightField('name', false);
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.push('Please enter a valid email address');
            highlightField('email', true);
        } else {
            highlightField('email', false);
        }

        // Phone validation (optional but if provided, must be valid)
        if (data.phone) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
                errors.push('Please enter a valid phone number');
                highlightField('phone', true);
            } else {
                highlightField('phone', false);
            }
        }

        // Subject validation
        if (!data.subject) {
            errors.push('Please select a subject');
            highlightField('subject', true);
        } else {
            highlightField('subject', false);
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
            highlightField('message', true);
        } else {
            highlightField('message', false);
        }

        // Display errors if any
        if (errors.length > 0) {
            showFormErrors(errors);
            return false;
        }

        return true;
    }

    // Highlight field with error or success
    function highlightField(fieldName, hasError) {
        const field = document.getElementById(fieldName);
        if (field) {
            if (hasError) {
                field.style.borderColor = '#FF0000';
                field.style.backgroundColor = '#FFF5F5';
            } else {
                field.style.borderColor = '#00AA00';
                field.style.backgroundColor = '#F5FFF5';
                
                // Reset to normal after a short delay
                setTimeout(() => {
                    field.style.borderColor = '';
                    field.style.backgroundColor = '';
                }, 2000);
            }
        }
    }

    // Show form errors
    function showFormErrors(errors) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.form-error');
        existingErrors.forEach(error => error.remove());

        // Create error message container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-error';
        errorContainer.style.cssText = `
            background: #FFE6E6;
            border: 1px solid #FF0000;
            color: #CC0000;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 0.9rem;
        `;

        const errorList = document.createElement('ul');
        errorList.style.cssText = `
            margin: 0;
            padding-left: 1.5rem;
        `;

        errors.forEach(error => {
            const errorItem = document.createElement('li');
            errorItem.textContent = error;
            errorList.appendChild(errorItem);
        });

        errorContainer.appendChild(errorList);

        // Insert error message before the form
        contactForm.parentNode.insertBefore(errorContainer, contactForm);

        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorContainer.parentNode) {
                errorContainer.parentNode.removeChild(errorContainer);
            }
        }, 5000);
    }

    // Simulate form submission
    function simulateFormSubmission(data) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate server delay
        setTimeout(() => {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Show success message
            showSuccessMessage();

            // Reset form
            contactForm.reset();

            // Clear any field highlighting
            const fields = contactForm.querySelectorAll('input, select, textarea');
            fields.forEach(field => {
                field.style.borderColor = '';
                field.style.backgroundColor = '';
            });

        }, 2000);
    }

    // Show success message
    function showSuccessMessage() {
        if (successModal) {
            successModal.style.display = 'block';
        }
    }

    // Real-time validation
    function setupRealTimeValidation() {
        const fields = contactForm.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });

            field.addEventListener('input', function() {
                // Clear error styling on input
                if (this.style.borderColor === 'rgb(255, 0, 0)') {
                    this.style.borderColor = '';
                    this.style.backgroundColor = '';
                }
            });
        });
    }

    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.name) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;

            case 'phone':
                if (value) {
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                }
                break;

            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select a subject';
                }
                break;

            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        // Show/hide field error
        showFieldError(field, isValid, errorMessage);
    }

    // Show field error
    function showFieldError(field, isValid, errorMessage) {
        // Remove existing error message for this field
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        if (!isValid) {
            // Add error styling
            field.style.borderColor = '#FF0000';
            field.style.backgroundColor = '#FFF5F5';

            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = `
                color: #CC0000;
                font-size: 0.8rem;
                margin-top: 0.25rem;
            `;
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        } else {
            // Clear error styling
            field.style.borderColor = '';
            field.style.backgroundColor = '';
        }
    }

    // Initialize contact form
    initContactForm();
    setupRealTimeValidation();

    // Export functions for external use
    window.contactManager = {
        validateContactForm,
        handleContactSubmit,
        showSuccessMessage
    };
});
