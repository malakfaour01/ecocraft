import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { submitToChallenge } from "@/lib/actions";
import Link from "next/link";

export default async function ChallengeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const challenge = await prisma.challenge.findUnique({ where: { id }, include: { submissions: { include: { user: true, craft: true } } } });
  if (!challenge) notFound();

  let myCrafts: { id: string; title: string }[] = [];
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user) myCrafts = await prisma.craft.findMany({ where: { userId: user.id }, select: { id: true, title: true } });
  }

  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{challenge.title}</h1>
        <p className="text-[#4A4238] dark:text-[#C9C5B8] mb-6">{challenge.description}</p>
        {session?.user && myCrafts.length > 0 && (
          <form action={submitToChallenge} className="mb-8 p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30 space-y-3">
            <input type="hidden" name="challengeId" value={challenge.id} />
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Submit one of your crafts</label>
            <select name="craftId" required className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]">
              {myCrafts.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
            <button type="submit" className="bg-[#C99A3E] hover:bg-[#B3862F] text-white text-sm px-4 py-2 rounded-md transition">Submit</button>
          </form>
        )}
        <h2 className="text-lg text-[#3D5A45] dark:text-[#E8E4D8] mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>Submissions ({challenge.submissions.length})</h2>
        <div className="space-y-3">
          {challenge.submissions.map((sub) => (
            <Link key={sub.id} href={`/craft/${sub.craft.id}`} className="block p-4 bg-white dark:bg-[#333730] border border-[#87A08D]/30 hover:-translate-y-1 transition-transform">
              <p className="font-medium text-[#3D5A45] dark:text-[#E8E4D8]">{sub.craft.title}</p>
              <p className="text-xs font-mono text-[#87A08D]">by {sub.user.name ?? sub.user.email}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}