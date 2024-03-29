import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare'
import { cssBundleHref } from '@remix-run/css-bundle'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  PrefetchPageLinks,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styles from '~/globals.css'
import { PageToggle } from '~/components/PageToggle'
import { CodeSource } from '~/components/CodeSource'

export const meta: MetaFunction = () => [
  { title: "It's Kin 🥶" },
  { name: 'description', content: 'Welcome to my website!' },
]

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/site.webmanifest' },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

const App = () => (
  <html lang="en" className="dark">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body className="container relative min-h-screen">
      <PrefetchPageLinks page="/" />
      <PrefetchPageLinks page="/experience" />
      <PageToggle />
      <div className="absolute right-4 mt-2 sm:right-8 sm:mr-2 sm:mt-4">
        <CodeSource />
      </div>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
)

export default App
