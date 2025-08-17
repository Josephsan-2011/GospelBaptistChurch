// Calendar functionality using FullCalendar
document.addEventListener('DOMContentLoaded', function() {
    // Load events from localStorage or use sample events as fallback
    function loadEvents() {
        const savedEvents = localStorage.getItem('calendarEvents');
        if (savedEvents) {
            try {
                return JSON.parse(savedEvents);
            } catch (error) {
                console.error('Error parsing saved events:', error);
            }
        }
        
        // Fallback to sample events if no saved events
        return [
            {
                id: '1',
                title: 'Sunday Service',
                start: '2025-08-10T13:00:00',
                end: '2025-08-10T15:00:00',
                description: 'Main worship service with preaching and fellowship',
                color: '#FF0000',
                allDay: false
            },
            {
                id: '2',
                title: 'Saturday Service',
                start: '2025-08-09T17:00:00',
                end: '2025-08-09T18:00:00',
                description: 'Evening prayer and Bible study',
                color: '#0066CC',
                allDay: false
            },
            {
                id: '3',
                title: 'Prayer Meeting',
                start: '2025-08-12T19:00:00',
                end: '2025-08-12T20:00:00',
                description: 'Weekly prayer meeting for church members',
                color: '#00AA00',
                allDay: false
            },
            {
                id: '4',
                title: 'Youth Group',
                start: '2025-08-15T18:00:00',
                end: '2025-08-15T19:30:00',
                description: 'Youth group activities and Bible study',
                color: '#FFAA00',
                allDay: false
            },
            {
                id: '5',
                title: 'Bible Study',
                start: '2025-08-14T19:00:00',
                end: '2025-08-14T20:30:00',
                description: 'Adult Bible study class',
                color: '#0066CC',
                allDay: false
            }
        ];
    }
    
    let sampleEvents = loadEvents();

    // Initialize calendar
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) return;

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        locale: 'en',
        events: sampleEvents,
        eventClick: function(info) {
            showEventDetails(info.event);
        },
        eventDidMount: function(info) {
            // Add tooltip
            info.el.title = info.event.title + '\n' + info.event.extendedProps.description;
        },
        height: 'auto',
        aspectRatio: 1.35,
        dayMaxEvents: true,
        moreLinkClick: 'popover',
        eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
        }
    });

    calendar.render();

    // Function to refresh events from localStorage
    function refreshEventsFromStorage() {
        const savedEvents = localStorage.getItem('calendarEvents');
        if (savedEvents) {
            try {
                const newEvents = JSON.parse(savedEvents);
                // Clear existing events
                calendar.removeAllEvents();
                // Add new events
                newEvents.forEach(event => {
                    calendar.addEvent(event);
                });
                // Update sampleEvents array
                sampleEvents = newEvents;
            } catch (error) {
                console.error('Error refreshing events:', error);
            }
        }
    }

    // Refresh events when page loads
    refreshEventsFromStorage();

    // Event management
    let currentEventId = null;
    const eventModal = document.getElementById('eventModal');
    const eventForm = document.getElementById('eventForm');
    const addEventBtn = document.getElementById('addEventBtn');
    const todayBtn = document.getElementById('todayBtn');
    const refreshEventsBtn = document.getElementById('refreshEventsBtn');
    const deleteEventBtn = document.getElementById('deleteEventBtn');

    // Add event button
    if (addEventBtn) {
        addEventBtn.addEventListener('click', function() {
            currentEventId = null;
            resetEventForm();
            document.getElementById('modalTitle').textContent = 'Add New Event';
            deleteEventBtn.style.display = 'none';
            eventModal.style.display = 'block';
        });
    }

    // Today button
    if (todayBtn) {
        todayBtn.addEventListener('click', function() {
            calendar.today();
        });
    }
    
    // Refresh events button
    if (refreshEventsBtn) {
        refreshEventsBtn.addEventListener('click', function() {
            refreshEventsFromStorage();
            showSuccessMessage('Events refreshed successfully!');
        });
    }

    // Event form submission
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(eventForm);
            const eventData = {
                title: formData.get('title'),
                date: formData.get('date'),
                time: formData.get('time'),
                description: formData.get('description'),
                color: formData.get('color')
            };

            if (currentEventId) {
                // Update existing event
                updateEvent(currentEventId, eventData);
            } else {
                // Add new event
                addEvent(eventData);
            }

            eventModal.style.display = 'none';
        });
    }

    // Delete event button
    if (deleteEventBtn) {
        deleteEventBtn.addEventListener('click', function() {
            if (currentEventId && confirm('Are you sure you want to delete this event?')) {
                deleteEvent(currentEventId);
                eventModal.style.display = 'none';
            }
        });
    }

    // Show event details
    function showEventDetails(event) {
        currentEventId = event.id;
        
        // Populate form with event data
        document.getElementById('eventTitle').value = event.title;
        document.getElementById('eventDate').value = event.start.toISOString().split('T')[0];
        document.getElementById('eventTime').value = event.start.toTimeString().slice(0, 5);
        document.getElementById('eventDescription').value = event.extendedProps.description || '';
        document.getElementById('eventColor').value = event.backgroundColor || '#FF0000';
        
        // Update modal title and show delete button
        document.getElementById('modalTitle').textContent = 'Edit Event';
        deleteEventBtn.style.display = 'inline-block';
        
        eventModal.style.display = 'block';
    }

    // Add new event
    function addEvent(eventData) {
        const newEvent = {
            id: Date.now().toString(),
            title: eventData.title,
            start: eventData.date + 'T' + eventData.time + ':00',
            end: eventData.date + 'T' + (eventData.time.split(':')[0] + 1) + ':' + eventData.time.split(':')[1] + ':00',
            description: eventData.description,
            color: eventData.color,
            allDay: false
        };

        calendar.addEvent(newEvent);
        sampleEvents.push(newEvent);
        
        // Save to localStorage
        localStorage.setItem('calendarEvents', JSON.stringify(sampleEvents));
        
        // Show success message
        showSuccessMessage('Event added successfully!');
    }

    // Update existing event
    function updateEvent(eventId, eventData) {
        const event = calendar.getEventById(eventId);
        if (event) {
            event.setProp('title', eventData.title);
            event.setStart(eventData.date + 'T' + eventData.time + ':00');
            event.setEnd(eventData.date + 'T' + (eventData.time.split(':')[0] + 1) + ':' + eventData.time.split(':')[1] + ':00');
            event.setExtendedProp('description', eventData.description);
            event.setProp('backgroundColor', eventData.color);
            event.setProp('borderColor', eventData.color);
        }

        // Update sample events array
        const eventIndex = sampleEvents.findIndex(e => e.id === eventId);
        if (eventIndex !== -1) {
            sampleEvents[eventIndex] = {
                ...sampleEvents[eventIndex],
                title: eventData.title,
                start: eventData.date + 'T' + eventData.time + ':00',
                end: eventData.date + 'T' + (eventData.time.split(':')[0] + 1) + ':' + eventData.time.split(':')[1] + ':00',
                description: eventData.description,
                color: eventData.color
            };
        }
        
        // Save to localStorage
        localStorage.setItem('calendarEvents', JSON.stringify(sampleEvents));

        showSuccessMessage('Event updated successfully!');
    }

    // Delete event
    function deleteEvent(eventId) {
        const event = calendar.getEventById(eventId);
        if (event) {
            event.remove();
        }

        // Remove from sample events array
        const eventIndex = sampleEvents.findIndex(e => e.id === eventId);
        if (eventIndex !== -1) {
            sampleEvents.splice(eventIndex, 1);
        }
        
        // Save to localStorage
        localStorage.setItem('calendarEvents', JSON.stringify(sampleEvents));

        showSuccessMessage('Event deleted successfully!');
    }

    // Reset event form
    function resetEventForm() {
        if (eventForm) {
            eventForm.reset();
            document.getElementById('eventDate').value = new Date().toISOString().split('T')[0];
            document.getElementById('eventTime').value = '12:00';
            document.getElementById('eventColor').value = '#FF0000';
        }
    }

    // Show success message
    function showSuccessMessage(message) {
        // Create a temporary success message
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

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Language support for calendar
    function updateCalendarLanguage(lang) {
        if (lang === 'my') {
            calendar.setOption('locale', 'my');
        } else {
            calendar.setOption('locale', 'en');
        }
    }

    // Listen for language changes
    document.addEventListener('languageChanged', function(e) {
        updateCalendarLanguage(e.detail.language);
    });

    // Export calendar functions for external use
    window.calendarManager = {
        calendar,
        addEvent,
        updateEvent,
        deleteEvent,
        showEventDetails,
        updateCalendarLanguage,
        refreshEventsFromStorage
    };
});
