import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";

export default async function ChallengesPage() {
  const session = await auth();

  const challenges = await prisma.challenge.findMany({
    orderBy: { startDate: "desc" },
    include: { submissions: true },
  });

  const official = challenges.filter((c) => c.isOfficial);
  const community = challenges.filter((c) => !c.isOfficial);

  function ChallengeCard({ challenge }: { challenge: (typeof challenges)[number] }) {
    const now = new Date();
    const isActive = now >= challenge.startDate && now <= challenge.endDate;

    return (
      <Link
        href={`/challenges/${challenge.id}`}
        className="block p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-emerald-400 transition"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {challenge.title}
          </h2>
          {isActive && (
            <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          {challenge.description}
        </p>
        <p className="text-xs text-zinc-400 mt-2">
          {challenge.submissions.length} submission
          {challenge.submissions.length !== 1 ? "s" : ""}
        </p>
      </Link>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            🏅 Challenges
          </h1>
          {session?.user && (
            <Link
              href="/challenges/new"
              className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition"
            >
              + New Challenge
            </Link>
          )}
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
            🏆 Official Monthly Challenges
          </h2>
          {official.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No official challenges yet.
            </p>
          ) : (
            <div className="space-y-4">
              {official.map((c) => (
                <ChallengeCard key={c.id} challenge={c} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
            🌍 Community Challenges
          </h2>
          {community.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No community challenges yet — start one!
            </p>
          ) : (
            <div className="space-y-4">
              {community.map((c) => (
                <ChallengeCard key={c.id} challenge={c} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}