import type { Metadata } from "next";
import { Parkinsans } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from '@/contexts/LanguageContext';
import DynamicLayout from '@/components/DynamicLayout';

const parkinsans = Parkinsans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-parkinsans",
  adjustFontFallback: false
});

const mina = localFont({
  src: [
    {
      path: '../public/fonts/Mina-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Mina-Bold.ttf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-mina',
});

export const metadata: Metadata = {
  title: {
    default: "Biyaa - Islamic Matrimonial Platform",
    template: "%s | Biyaa"
  },
  description: "Find your ideal Islamic life partner with Biyaa - a modern, secure matrimonial platform designed for Muslims. Create detailed biodata, search compatible matches, and connect with potential partners while maintaining Islamic values.",
  keywords: ["Islamic matrimonial", "Muslim marriage", "biodata", "halal dating", "Islamic marriage", "Muslim community", "matrimonial website", "Bengali matrimonial"],
  authors: [{ name: "Biyaa Team" }],
  creator: "Biyaa",
  publisher: "Biyaa",
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://biyaa.com' : 'http://localhost:3000'),
  alternates: {
    canonical: "/",
    languages: {
      'en': '/en',
      'bn': '/bn',
    },
  },
  openGraph: {
    title: "Biyaa - Islamic Matrimonial Platform",
    description: "Find your ideal Islamic life partner with comprehensive biodata matching and Islamic values-based connections.",
    url: "/",
    siteName: "Biyaa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/wedding.png",
        width: 1200,
        height: 630,
        alt: "Biyaa - Islamic Matrimonial Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biyaa - Islamic Matrimonial Platform",
    description: "Find your ideal Islamic life partner with comprehensive biodata matching.",
    images: ["/images/wedding.png"],
    creator: "@biyaa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${parkinsans.variable} ${mina.variable} min-h-screen bg-background text-foreground`}>
        <LanguageProvider>
          <DynamicLayout>
            <ReduxProvider>
              {children}
              <Toaster position="top-center" />
            </ReduxProvider>
          </DynamicLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
