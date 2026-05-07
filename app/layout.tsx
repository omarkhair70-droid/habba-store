import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Habba | حبّة',
  description: 'Handmade bead accessories catalog'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar"><body>{children}</body></html>;
}
