// lib/auth.ts
import { setCookie, destroyCookie, parseCookies } from 'nookies';

export const setAccessToken = (token: string) => {
  // Set secure, HTTP-only cookie
  setCookie(null, 'accessToken', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/', // Available across the site
    httpOnly: false, // Note: In a true server-side setup, this would be true
    secure: process.env.NODE_ENV === 'production', // Use secure in production
    sameSite: 'lax'
  });

  // Also store in localStorage for client-side access
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
  }
};

export const getAccessToken = () => {
  // Try to get token from cookies first
  const cookies = parseCookies();
  const cookieToken = cookies['accessToken'];

  // Fallback to localStorage if needed
  if (cookieToken) return cookieToken;
  
  return typeof window !== 'undefined' 
    ? localStorage.getItem('accessToken') 
    : null;
};

export const removeAccessToken = () => {
  // Remove cookie
  destroyCookie(null, 'accessToken');
  
  // Remove from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
  }
};


// In lib/auth.ts (add to existing file)
export const logout = () => {
  // Remove token from cookies and localStorage
  removeAccessToken();
  
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};