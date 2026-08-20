import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, include: { crafts: true, posts: true } });
  if (!user) redirect("/login");
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>🏆 Your Impact</h1>
        <p className="text-[#4A4238] dark:text-[#C9C5B8] mb-8">{user.name ?? user.email}&apos;s eco journey so far</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30 text-center">
            <p className="text-3xl text-[#C99A3E]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{user.crafts.length}</p>
            <p className="text-xs font-mono text-[#4A4238] dark:text-[#C9C5B8] mt-1">Crafts Created</p>
          </div>
          <div className="p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30 text-center">
            <p className="text-3xl text-[#C99A3E]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{user.posts.length}</p>
            <p className="text-xs font-mono text-[#4A4238] dark:text-[#C9C5B8] mt-1">Posts Shared</p>
          </div>
          <div className="p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30 text-center">
            <p className="text-3xl text-[#C99A3E]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{user.ecoPoints}</p>
            <p className="text-xs font-mono text-[#4A4238] dark:text-[#C9C5B8] mt-1">Eco Points</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#333730] border border-[#87A08D]/30 p-6">
          <h2 className="text-lg text-[#3D5A45] dark:text-[#E8E4D8] mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>Your Crafts</h2>
          {user.crafts.length === 0 ? (
            <p className="text-[#4A4238] dark:text-[#C9C5B8] text-sm">You haven&apos;t created any crafts yet.</p>
          ) : (
            <ul className="space-y-2">
              {user.crafts.map((c) => <li key={c.id} className="text-sm text-[#4A4238] dark:text-[#C9C5B8]">• {c.title}</li>)}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}