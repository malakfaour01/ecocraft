import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { submitToChallenge } from "@/lib/actions";
import Link from "next/link";

export default async function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const challenge = await prisma.challenge.findUnique({
    where: { id },
    include: {
      submissions: { include: { user: true, craft: true } },
    },
  });

  if (!challenge) {
    notFound();
  }

  let myCrafts: { id: string; title: string }[] = [];
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (user) {
      myCrafts = await prisma.craft.findMany({
        where: { userId: user.id },
        select: { id: true, title: true },
      });
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          {challenge.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 mb-6">
          {challenge.description}
        </p>

        {session?.user && myCrafts.length > 0 && (
          <form
            action={submitToChallenge}
            className="mb-8 p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 space-y-3"
          >
            <input type="hidden" name="challengeId" value={challenge.id} />
            <label className="block text-sm font-medium mb-1">
              Submit one of your crafts
            </label>
            <select
              name="craftId"
              required
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            >
              {myCrafts.map((craft) => (
                <option key={craft.id} value={craft.id}>
                  {craft.title}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-4 py-2 rounded-md transition"
            >
              Submit
            </button>
          </form>
        )}

        <h2 className="text-lg font-semibold mb-3">
          Submissions ({challenge.submissions.length})
        </h2>
        <div className="space-y-3">
          {challenge.submissions.map((sub) => (
            <Link
              key={sub.id}
              href={`/craft/${sub.craft.id}`}
              className="block p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-emerald-400 transition"
            >
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                {sub.craft.title}
              </p>
              <p className="text-xs text-zinc-400">
                by {sub.user.name ?? sub.user.email}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}