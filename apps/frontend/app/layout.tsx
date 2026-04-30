import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import MainLayout from "../components/layout/MainLayout";
import { AuthProvider } from "../context/AuthContext";
import { PostHogProvider } from "../components/providers/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STATE OS",
  description: "SaaS Dashboard STATE OS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Toaster position="top-right" toastOptions={{
          style: { fontSize: 16, fontWeight: 500 },
          success: { style: { background: '#22c55e', color: '#fff' } },
          error: { style: { background: '#ef4444', color: '#fff' } },
        }} />
        <AuthProvider>
          <PostHogProvider>
            <MainLayout>{children}</MainLayout>
          </PostHogProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
