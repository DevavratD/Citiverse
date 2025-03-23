import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UrbanPulse Pune",
  description: "Real-time urban data platform for Pune citizens",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <Script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js" strategy="afterInteractive" />
          <Script src="https://files.bpcontent.cloud/2025/03/23/00/20250323003302-TZS6A7L3.js" strategy="afterInteractive" />
        </ThemeProvider>
      </body>
    </html>
  )
}
