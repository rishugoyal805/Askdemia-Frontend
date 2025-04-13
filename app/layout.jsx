import { ThemeProvider } from "@/context/theme-context"
import { StyledEngineProvider } from "@mui/material/styles"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Askdemia",
  description: "A full-stack chatbot application with authentication",
  icons: {
    icon: "/logo.jpg",
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Poppins', sans-serif" }} className={inter.className} suppressHydrationWarning>
        <StyledEngineProvider injectFirst>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledEngineProvider>
      </body>
    </html>
  )
}