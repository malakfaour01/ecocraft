import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "EcoCraft",
  description: "Turn recyclable waste into creative upcycled crafts",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`antialiased ${fraunces.variable}`}>
        <nav className="bg-[#F4F1E8] dark:bg-[#2B2E28] border-b-2 border-[#87A08D]/40 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/" className="text-lg text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              🌱 EcoCraft
            </Link>
            <Link href="/explore" className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]">Explore</Link>
            <Link href="/community" className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]">Community</Link>
            <Link href="/marketplace" className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]">Marketplace</Link>
            <Link href="/challenges" className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]">Challenges</Link>
            <Link href="/recycling" className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]">Recycling</Link>
            <Link href="/collections" className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]">Collections</Link>
            <Link href="/calculator" className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]">Calculator</Link>
            <Link href="/guides" className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]">Guides</Link>
           <Link href="/feedback" className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]">Feedback</Link>
           <Link href="/quiz" className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]">Quiz</Link>
            {session?.user && <Link href="/new-craft" className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]">Add Craft</Link>}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/search" className="text-lg text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]" title="Search">
              🔍
            </Link>
            {session?.user && (
              <Link href="/profile" className="text-lg text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]" title="Profile">
                👤
              </Link>
            )}
            {session?.user ? (
              <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
                <button className="text-sm text-[#4A4238] dark:text-[#C9C5B8] hover:text-red-600 underline">Log out</button>
              </form>
            ) : (
              <>
                <Link href="/login" className="text-sm text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#3D5A45]">Log in</Link>
                <Link href="/signup" className="text-sm bg-[#C99A3E] text-white px-3 py-1.5 rounded-md hover:bg-[#B3862F]">Sign Up</Link>
              </>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}