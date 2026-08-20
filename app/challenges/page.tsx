import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";

export default async function ChallengesPage() {
  const session = await auth();
  const challenges = await prisma.challenge.findMany({ orderBy: { startDate: "desc" }, include: { submissions: true } });
  const official = challenges.filter((c) => c.isOfficial);
  const community = challenges.filter((c) => !c.isOfficial);

  function ChallengeCard({ challenge }: { challenge: (typeof challenges)[number] }) {
    const now = new Date();
    const isActive = now >= challenge.startDate && now <= challenge.endDate;
    return (
      <Link href={`/challenges/${challenge.id}`} className="block p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30 hover:-translate-y-1 hover:shadow-lg transition-all">
        <div className="flex items-center justify-between">
          <h2 className="text-lg text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{challenge.title}</h2>
          {isActive && <span className="text-xs bg-[#87A08D]/20 text-[#3D5A45] dark:text-[#E8E4D8] px-2 py-1 rounded-full font-mono">Active</span>}
        </div>
        <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8] mt-1">{challenge.description}</p>
        <p className="text-xs font-mono text-[#87A08D] mt-2">{challenge.submissions.length} submissions</p>
      </Link>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>🏅 Challenges</h1>
          {session?.user && <Link href="/challenges/new" className="text-sm bg-[#C99A3E] hover:bg-[#B3862F] text-white px-4 py-2 rounded-md transition">+ New Challenge</Link>}
        </div>
        <section className="mb-10">
          <h2 className="text-xl text-[#3D5A45] dark:text-[#E8E4D8] mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>🏆 Official Monthly Challenges</h2>
          {official.length === 0 ? <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8]">No official challenges yet.</p> : <div className="space-y-4">{official.map((c) => <ChallengeCard key={c.id} challenge={c} />)}</div>}
        </section>
        <section>
          <h2 className="text-xl text-[#3D5A45] dark:text-[#E8E4D8] mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>🌍 Community Challenges</h2>
          {community.length === 0 ? <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8]">No community challenges yet — start one!</p> : <div className="space-y-4">{community.map((c) => <ChallengeCard key={c.id} challenge={c} />)}</div>}
        </section>
      </div>
    </main>
  );
}