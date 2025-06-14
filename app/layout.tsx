import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Header from "@/components/header"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Gut Decode",
  description: "Understand how foods and ingredients affect your gut health with AI-synthesized research summaries.",
  icons: {
    icon: "/images/microbiome-logo.png",
    apple: "/images/microbiome-logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/microbiome-logo.png" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
      </body>
    </html>
  )
}
