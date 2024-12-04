// lib/serverAuth.tsx
// lib/serverAuth.tsx
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { parseCookies } from 'nookies';

export function validateServerToken(ctx?: GetServerSidePropsContext | NextPageContext) {
  // Use nookies to parse cookies
  const cookies = ctx ? parseCookies(ctx) : parseCookies();
  const accessToken = cookies['accessToken'];

  return {
    isAuthenticated: !!accessToken,
    token: accessToken,
  };
}
