# 🔐 Authentication Guide
### RJCC Church Management System

Complete guide to the authentication system in your church management application.

---

## 📋 Overview

The application includes a secure authentication system with:
- ✅ Login/Logout functionality
- ✅ Protected routes (requires authentication)
- ✅ User session management
- ✅ Role-based access (admin/user)
- ✅ Remember me option
- ✅ Responsive login page

---

## 🚀 Quick Start

### Demo Credentials

The application comes with demo authentication:

**Admin User:**
- Email: `admin@rjcc.org`
- Password: `any password`
- Role: Admin

**Regular User:**
- Email: `user@rjcc.org`
- Password: `any password`
- Role: User

> **Note:** In demo mode, any password is accepted. In production, connect to a real authentication backend.

---

## 🔑 How It Works

### 1. Login Process

1. User visits `/login`
2. Enters email and password
3. System validates credentials
4. Creates user session
5. Stores auth token in localStorage
6. Redirects to dashboard

### 2. Protected Routes

All main routes require authentication:
- `/` - Dashboard
- `/members` - Member Management
- `/demographics` - Demographics
- `/new-believers` - New Believers
- `/attendance` - Attendance
- `/giving` - Financial Management
- `/events` - Events
- `/communication` - Communication
- `/reports` - Reports
- `/settings` - Settings

Unauthenticated users are redirected to `/login`.

### 3. Session Management

**Storage:**
- `localStorage.setItem('rjcc_auth', 'true')` - Auth status
- `localStorage.setItem('rjcc_user', JSON.stringify(user))` - User data

**User Object:**
```typescript
{
  email: string;
  name: string;
  role: 'admin' | 'user';
  branch: string;
}
```

---

## 📁 File Structure

```
src/app/
├── context/
│   └── auth-context.tsx          # Authentication context
├── components/
│   └── protected-route.tsx       # Route protection HOC
├── pages/
│   └── login.tsx                 # Login page
└── routes.tsx                    # Route configuration
```

---

##🎨 Login Page Features

### Responsive Design
- Mobile-first layout
- Centered card design
- Touch-friendly inputs
- Adaptive spacing

### UI Elements
- Church logo (✝)
- Email input
- Password input (with show/hide toggle)
- Remember me checkbox
- Forgot password link
- Demo credentials display
- Loading state

### Accessibility
- Proper labels
- Autocomplete attributes
- Keyboard navigation
- Focus states

---

## 🔧 Implementing Real Authentication

### Step 1: Create Backend API

Replace demo authentication with real API calls:

```typescript
// In login.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();
    const user = {
      email: data.email,
      name: data.name,
      role: data.role,
      branch: data.branch,
    };

    localStorage.setItem('rjcc_auth', data.token);
    localStorage.setItem('rjcc_user', JSON.stringify(user));

    navigate('/');
  } catch (error) {
    toast.error("Login failed", {
      description: error.message,
    });
  } finally {
    setIsLoading(false);
  }
};
```

### Step 2: Add Token-Based Auth

Update auth-context.tsx to use JWT tokens:

```typescript
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  
  localStorage.setItem('rjcc_token', data.token);
  localStorage.setItem('rjcc_user', JSON.stringify(data.user));
  
  setUser(data.user);
};
```

### Step 3: Add API Interceptor

Create an API client with automatic token injection:

```typescript
// src/lib/api.ts
export async function apiRequest(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('rjcc_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Token expired - logout
    localStorage.removeItem('rjcc_token');
    localStorage.removeItem('rjcc_user');
    window.location.href = '/login';
  }

  return response;
}
```

---

## 🛡️ Security Best Practices

### 1. Password Security
```typescript
// Add password requirements
const passwordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecial: true,
};
```

### 2. Token Expiration
```typescript
// Check token expiry
const isTokenExpired = (token: string) => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return Date.now() >= payload.exp * 1000;
};
```

### 3. Secure Storage
- Use httpOnly cookies for tokens (more secure than localStorage)
- Implement CSRF protection
- Use HTTPS in production
- Set short token expiration (15-30 minutes)
- Implement refresh tokens

### 4. Rate Limiting
```typescript
// Add login attempt limiting
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes
```

---

## 🔐 Role-Based Access Control (RBAC)

### Current Roles
- **admin** - Full access to all features
- **user** - Standard member access

### Adding Role Checks

```typescript
// In a component
import { useAuth } from '../context/auth-context';

function AdminOnlyFeature() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <p>Access denied</p>;
  }

  return <div>Admin content</div>;
}
```

### Protecting Specific Features

```typescript
// In layout.tsx or specific pages
{user?.role === 'admin' && (
  <Link to="/admin-panel">
    Admin Panel
  </Link>
)}
```

---

## 📱 Mobile Considerations

### Touch-Friendly Login
- Large input fields (min-height: 48px)
- Big tap targets for buttons
- No zoom on input focus (font-size: 16px)
- Show/hide password toggle

### Offline Login
Current implementation requires online connection.

**To add offline login:**
1. Store encrypted credentials locally
2. Implement local validation
3. Sync when online

---

## 🔄 Password Reset Flow

### Step 1: Add Forgot Password Page

```typescript
// src/app/pages/forgot-password.tsx
export function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    toast.success('Password reset link sent to your email');
  };

  return (
    // Form UI
  );
}
```

### Step 2: Add Reset Password Page

```typescript
// src/app/pages/reset-password.tsx
export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [token] = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        token: token.get('token'), 
        password 
      }),
    });

    toast.success('Password reset successful');
    navigate('/login');
  };

  return (
    // Form UI
  );
}
```

---

## 📊 User Session Management

### Auto-Logout on Inactivity

```typescript
// Add to auth-context.tsx
useEffect(() => {
  let timeout: NodeJS.Timeout;

  const resetTimeout = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      logout();
      toast.info('Session expired due to inactivity');
    }, 30 * 60 * 1000); // 30 minutes
  };

  window.addEventListener('mousemove', resetTimeout);
  window.addEventListener('keypress', resetTimeout);

  resetTimeout();

  return () => {
    clearTimeout(timeout);
    window.removeEventListener('mousemove', resetTimeout);
    window.removeEventListener('keypress', resetTimeout);
  };
}, []);
```

### Remember Me Functionality

```typescript
// Store preference
if (formData.rememberMe) {
  localStorage.setItem('rjcc_remember', 'true');
  localStorage.setItem('rjcc_email', formData.email);
} else {
  sessionStorage.setItem('rjcc_auth', 'true');
}
```

---

## 🧪 Testing Authentication

### Manual Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout functionality
- [ ] Protected route access (logged in)
- [ ] Protected route redirect (logged out)
- [ ] Session persistence on refresh
- [ ] Remember me checkbox
- [ ] Password visibility toggle
- [ ] Mobile responsiveness
- [ ] Error messages display

---

## 🚀 Production Deployment

### Before Going Live

1. **Remove Demo Mode**
   - Delete demo credential section
   - Implement real backend authentication

2. **Environment Variables**
   ```env
   VITE_API_URL=https://api.rjcc.org
   VITE_AUTH_ENDPOINT=/api/auth/login
   ```

3. **Security Headers**
   - Set Content-Security-Policy
   - Enable HSTS
   - Configure CORS properly

4. **SSL/TLS**
   - Use HTTPS only
   - Redirect HTTP to HTTPS
   - Valid SSL certificate

---

## 📝 Customization

### Changing Logo

Replace the cross symbol in login.tsx:

```typescript
<div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
  <img src="/logo.png" alt="RJCC" className="w-16 h-16" />
</div>
```

### Custom Branding

Update colors in login.tsx and theme.css to match your church branding.

---

## 🐛 Troubleshooting

### "Cannot read property 'user' of undefined"
**Solution:** Ensure AuthProvider wraps your routes

### Session not persisting
**Solution:** Check localStorage is enabled in browser

### Infinite redirect loop
**Solution:** Verify protected route logic and auth state

### Login button not working
**Solution:** Check form submission and async/await handling

---

## 🔗 Related Files

- `/src/app/context/auth-context.tsx` - Auth state management
- `/src/app/components/protected-route.tsx` - Route protection
- `/src/app/pages/login.tsx` - Login UI
- `/src/app/routes.tsx` - Route configuration
- `/src/app/components/layout.tsx` - User display & logout

---

**Your authentication system is ready! 🔐**

For production use, connect to a real authentication backend (Firebase, Supabase, custom API, etc.).
