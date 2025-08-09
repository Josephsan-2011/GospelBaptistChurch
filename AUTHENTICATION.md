# Church Website Authentication System

## Overview

The church website now has a secure server-side authentication system that replaces the previous client-side only authentication. This system provides proper session management, token-based authentication, and role-based access control.

## Features

### 🔐 Secure Authentication
- **Server-side session management** with token-based authentication
- **Role-based access control** (Member and Pastor roles)
- **Automatic session cleanup** (sessions expire after 24 hours of inactivity)
- **Secure password validation** on the server

### 🛡️ Protected Endpoints
- **Sermon management** (upload, update, delete) - Pastor only
- **News management** (create, update, delete) - Pastor only
- **Members-only content** - Authenticated members and pastors
- **Public content** - Available to everyone

### 🔄 Session Management
- **Automatic token validation** on each request
- **Session persistence** across browser tabs/windows
- **Secure logout** that invalidates server-side sessions

## Authentication Flow

### 1. Login Process
```
User enters credentials → Server validates → Returns token → Client stores token
```

### 2. Request Authentication
```
Client includes token in headers → Server validates token → Returns protected data
```

### 3. Logout Process
```
Client sends logout request → Server invalidates session → Client clears local storage
```

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/login`
Login with password and role.

**Request:**
```json
{
  "password": "12345",
  "role": "member"
}
```

**Response:**
```json
{
  "success": true,
  "token": "abc123...",
  "role": "member",
  "message": "Member login successful"
}
```

#### POST `/api/auth/logout`
Logout and invalidate session.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET `/api/auth/status`
Check authentication status.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "authenticated": true,
  "role": "member",
  "loginTime": "2025-08-09T20:23:53.958Z"
}
```

### Protected Endpoints

#### Sermon Management (Pastor Only)
- `POST /api/sermons/upload` - Upload new sermon
- `PUT /api/sermons/:id` - Update sermon
- `DELETE /api/sermons/:id` - Delete sermon

#### News Management (Pastor Only)
- `POST /api/news` - Create news item
- `PUT /api/news/:id` - Update news item
- `DELETE /api/news/:id` - Delete news item

#### Content Access
- `GET /api/sermons` - Get sermons (filtered by visibility)
- `GET /api/sermons/:id` - Get specific sermon
- `GET /api/news` - Get news items

## Passwords

### Member Access
- **Password:** `12345`
- **Access:** Members area, members-only sermons

### Pastor Access
- **Password:** `54321`
- **Access:** All member features + sermon upload, news management

## Frontend Integration

### Authentication Functions

#### `initAuthentication()`
Initializes the authentication system and checks for existing sessions.

#### `showLoginModal()`
Displays the login modal with member/pastor tabs.

#### `handleLogin(e)`
Handles login form submission and server communication.

#### `checkAuthStatus()`
Verifies authentication status with the server.

#### `logout()`
Logs out the user and clears local storage.

### Storage
- **Token:** `localStorage.getItem('authToken')`
- **Role:** `localStorage.getItem('userRole')`

### Usage Examples

#### Check if user is authenticated
```javascript
const token = localStorage.getItem('authToken');
const role = localStorage.getItem('userRole');
if (token && role) {
    // User is authenticated
}
```

#### Make authenticated request
```javascript
const response = await fetch('/api/sermons', {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
```

#### Check specific role
```javascript
function isPastorAuthenticated() {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    return token && role === 'pastor';
}
```

## Security Features

### Token Security
- **Random generation** using timestamp and random values
- **Server-side storage** in memory (Map)
- **Automatic cleanup** of expired sessions
- **No sensitive data** in tokens

### Session Management
- **24-hour expiration** for inactive sessions
- **Immediate invalidation** on logout
- **Role-based validation** on each request

### Error Handling
- **401 Unauthorized** for missing/invalid tokens
- **403 Forbidden** for insufficient permissions
- **Graceful degradation** when authentication fails

## Migration from Old System

### Changes Made
1. **Replaced client-side passwords** with server-side validation
2. **Added token-based authentication** instead of localStorage flags
3. **Implemented proper session management** with server-side storage
4. **Added authentication middleware** to protect sensitive endpoints
5. **Updated all API calls** to include authentication headers

### Backward Compatibility
- **Public content** remains accessible without authentication
- **Login flow** maintains the same user experience
- **Role-based redirects** work as before

## Testing

### Manual Testing
1. **Start the server:** `npm start`
2. **Test member login:** Use password `12345`
3. **Test pastor login:** Use password `54321`
4. **Test protected endpoints:** Verify access control
5. **Test logout:** Verify session invalidation

### API Testing
```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"12345","role":"member"}'

# Test authentication status
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/auth/status

# Test logout
curl -X POST -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/auth/logout
```

## Production Considerations

### Security Enhancements
- **Use HTTPS** in production
- **Implement rate limiting** for login attempts
- **Add password hashing** (bcrypt)
- **Use Redis** for session storage
- **Add CSRF protection**
- **Implement refresh tokens**

### Database Integration
- **Store user accounts** in database
- **Add user registration** system
- **Implement password reset** functionality
- **Add audit logging** for security events

### Monitoring
- **Log authentication events**
- **Monitor failed login attempts**
- **Track session usage**
- **Alert on suspicious activity**

## Troubleshooting

### Common Issues

#### "Authentication required" errors
- Check if token exists in localStorage
- Verify token hasn't expired
- Ensure proper Authorization header format

#### "Pastor access required" errors
- Verify user logged in as pastor
- Check role in localStorage
- Ensure proper role validation

#### Session expiration
- Sessions expire after 24 hours of inactivity
- User will be redirected to login
- Clear localStorage and re-authenticate

### Debug Steps
1. **Check browser console** for JavaScript errors
2. **Verify server is running** on correct port
3. **Check network tab** for failed requests
4. **Validate token format** in localStorage
5. **Test API endpoints** directly with curl

## Support

For technical support or questions about the authentication system, please contact the church administration or refer to the server logs for detailed error information.
