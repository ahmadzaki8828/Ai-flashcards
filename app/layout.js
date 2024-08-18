import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flashcard Saas",
  description: "Create flashcard from your text",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
