import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import type { LinksFunction } from 'react-router';
import appStyles from '~/styles/app.css?url';

export const links: LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'icon', type: 'image/png', href: '/images/profile.png', sizes: '64x64' },
  { rel: 'apple-touch-icon', href: '/images/profile.png' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap',
  },
  { rel: 'stylesheet', href: appStyles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'Page not found.' : error.statusText || details;
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        background: '#f4f3ef',
        color: '#0a0a0a',
        padding: 40,
      }}
    >
      <h1 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 122, lineHeight: 1, margin: 0 }}>
        {message}
      </h1>
      <p style={{ marginTop: 16, fontSize: 18, color: '#5a5a58' }}>{details}</p>
      <a
        href="/"
        style={{
          marginTop: 32,
          fontSize: 14,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          borderBottom: '1px solid currentColor',
        }}
      >
        ← Back home
      </a>
    </main>
  );
}
