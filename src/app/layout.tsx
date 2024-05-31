import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";
import type { Metadata } from 'next'
import { QueryProvider } from "../../lib/QueryProvider";

export const metadata: Metadata = {
  title: '...',
  description: '...',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          <QueryProvider>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              { children }
            </div>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
