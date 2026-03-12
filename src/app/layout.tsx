import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iSecurify - Advanced Security Dashboard',
  description: 'Real-time threat monitoring and professional risk analysis by iSecurify',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full text-gray-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}
