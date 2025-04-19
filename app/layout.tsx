import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"

const inter = Montserrat({ subsets: ["latin"] })
// app/layout.tsx
export const metadata = {
  title: "Satyam Jha | Full Stack Developer & HackClub VIT President",
  description:
    "I'm Satyam Jha — a full stack developer, open-source enthusiast, and President of HackClub VIT Chennai. Explore my projects, hackathon achievements, freelance work, and developer journey.",
  keywords: [
    "Satyam Jha",
    "Full Stack Developer",
    "HackClub VIT Chennai",
    "Next.js Portfolio",
    "Rust Developer",
    "Freelance Developer",
    "Student Developer India",
    "Pharmora",
    "InsureFi",
    "Hackathon Projects",
  ],
  metadataBase: new URL("https://satyamjha-dev.xyz"),
  openGraph: {
    title: "Satyam Jha | Full Stack Developer",
    description:
      "Check out my developer portfolio, hackathon wins, and projects like Pharmora and InsureFi. Built with Next.js, Rust, and passion.",
    url: "https://satyamjha-dev.xyz",
    siteName: "Satyam Jha Portfolio",
    images: [
      {
        url: "https://satyamjha-dev.xyz/preview.jpg", // recommended 1200x630
        width: 1200,
        height: 630,
        alt: "Satyam Jha Portfolio Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satyam Jha | Full Stack Developer",
    description:
      "HackClub VIT President | Full Stack Dev | Rust & Next.js | Hackathons | Freelance | Pharmora, InsureFi, and more.",
    images: ["https://satyamjha-dev.xyz/preview.jpg"],
    creator: "@th3_ma3stro",
  },
  authors: [{ name: "Satyam Jha", url: "https://satyamjha-dev.xyz" }],
  creator: "Satyam Jha",
  publisher: "Satyam Jha",
  themeColor: "#e63946",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
