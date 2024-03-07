'use client';
import { useEffect, useState, createContext, Context } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import appConfig from '../app.config';

export const SessionContext: Context<Session | null> = createContext<Session | null>(null);

/**
 * This is our custom UseSesion provider that fetches the session because the default SessionProvider that calls getSession doesn't make a request with credentials mode set to include
 */
export function UseSession({ children }: { children: any }) {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function loadSession() {
      const sess: Session | null = await fetch(`${appConfig.apiHost}/api/auth/session`, {
        credentials: 'include',
      }).then(res => res.json());
      setSession(sess);
    }

    if (pathname !== `${appConfig.apiHost}/api/auth/callback`) {
      loadSession();
    }
  }, [pathname]);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
