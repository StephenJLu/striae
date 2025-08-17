import type { LinksFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  Link
} from "@remix-run/react";
import { 
  ThemeProvider,
  themeStyles 
} from '~/components/theme-provider/theme-provider';
import Footer from "~/components/footer/footer";
import MobileWarning from "~/components/mobile/mobile-warning";
import "./tailwind.css";
import styles from '~/styles/root.module.css';
import { auth } from "./services/firebase";
import { AuthContext } from "./contexts/auth.context";
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import './reset.module.css';

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: 'manifest', href: '/manifest.json' },
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'shortcut_icon', href: '/shortcut.png', type: 'image/png', sizes: '64x64' },
  { rel: 'apple-touch-icon', href: '/icon-256.png', sizes: '256x256' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = 'light';
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000" />
        <meta name="color-scheme" content={theme === 'light' ? 'dark' : 'light'} />
        <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
        <script src="https://www.gstatic.com/firebasejs/8.0/firebase.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `var config = {
          apiKey: "AIzaSyAqglixt1o36QGgxX1cca1uuK1g8lHXguM",
          authDomain: "striae-auth.firebaseapp.com",
        };
        firebase.initializeApp(config);` }}></script>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen w-screen max-w-full overflow-x-hidden">
        <ThemeProvider theme={theme} className="">
        <MobileWarning />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <title>{`${error.status} ${error.statusText}`}</title>          
        </head>
        <body className="flex flex-col min-h-screen">
          <ThemeProvider theme="light" className="">          
          <main className="flex-grow">
            <div className={styles.errorContainer}>
              <div className={styles.errorTitle}>{error.status}</div>
              <p className={styles.errorMessage}>{error.statusText}</p>
              <Link to="/" className={styles.errorLink}>Return Home</Link>
            </div>
          </main>
          </ThemeProvider>          
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <title>Oops! Something went wrong</title>       
      </head>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider theme="light" className="">        
        <main className="flex-grow">
          <div className={styles.errorContainer}>
            <div className={styles.errorTitle}>500</div>
            <p className={styles.errorMessage}>Something went wrong. Please try again later.</p>
            <Link to="/" className={styles.errorLink}>Return Home</Link>
          </div>
        </main>
        </ThemeProvider>        
      </body>
    </html>
  );
}