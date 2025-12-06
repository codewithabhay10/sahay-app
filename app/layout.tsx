import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: 'सहाय - Sahay App',
  description: 'Fund management and tracking system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
