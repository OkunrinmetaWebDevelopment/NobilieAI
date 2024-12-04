import React from 'react';
import { useRouter } from 'next/router';
import { validateServerToken as serverValidateToken } from './serverAuth';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export function withAuth<P extends Record<string, unknown>>(WrappedComponent: React.ComponentType<P>) {
  const AuthWrapper: React.FC<P> = (props) => {
    const router = useRouter();

    // Client-side check
   // Client-side check
  if (typeof window !== 'undefined') {
    const { isAuthenticated } = serverValidateToken();

    if (!isAuthenticated) {
      router.replace('/');
      return null;
    }
  }


    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
}

// Server-side authentication helper
export const withServerAuth: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { isAuthenticated } = validateServerToken(context);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
};

// Token validation utility
export function validateServerToken(context: GetServerSidePropsContext | undefined = undefined) {
  if (context) {
    // Logic for server-side validation
    return { isAuthenticated: /* your logic */ true };
  } else {
    // Logic for client-side validation
    return { isAuthenticated: /* your logic */ true };
  }
}
