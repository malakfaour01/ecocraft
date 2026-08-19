import type { Metadata } from "next";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import "./globals.css";

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
      <body className="antialiased">
        <nav className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-emerald-600 dark:text-emerald-400">
              🌱 EcoCraft
            </Link>
            <Link href="/explore" className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-emerald-600">
              Explore
            </Link>
            <Link href="/community" className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-emerald-600">
  Community
</Link>

<Link href="/marketplace" className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-emerald-600">
  Marketplace
</Link>

            {session?.user && (
              <Link href="/new-craft" className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-emerald-600">
                Add Craft
              </Link>
            )}

            {session?.user && (
  <Link href="/profile" className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-emerald-600">
    Profile
  </Link>
)}

          </div>

          <div className="flex items-center gap-4">
            {session?.user ? (
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="text-sm text-zinc-500 hover:text-red-500 underline">
                  Log out
                </button>
              </form>
            ) : (
              <>
                <Link href="/login" className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-emerald-600">
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="text-sm bg-emerald-600 text-white px-3 py-1.5 rounded-md hover:bg-emerald-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}