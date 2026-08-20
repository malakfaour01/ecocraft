import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import { toggleFeedbackVote } from "@/lib/actions";

export default async function FeedbackPage() {
  const session = await auth();

  const feedbackItems = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, votes: true },
  });

  let currentUserId: string | null = null;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    currentUserId = user?.id ?? null;
  }

  const sorted = [...feedbackItems].sort((a, b) => b.votes.length - a.votes.length);

  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1
            className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            💡 Feedback & Ideas
          </h1>
          {session?.user && (
            <Link
              href="/feedback/new"
              className="text-sm bg-[#C99A3E] hover:bg-[#B3862F] text-white px-4 py-2 rounded-md transition"
            >
              + Submit Idea
            </Link>
          )}
        </div>
        <p className="text-[#4A4238] dark:text-[#C9C5B8] mb-8">
          Suggest features, report bugs, and vote on what matters most
        </p>

        {sorted.length === 0 ? (
          <div className="p-8 bg-white dark:bg-[#333730] border border-[#87A08D]/30 text-center">
            <p className="text-[#4A4238] dark:text-[#C9C5B8]">No feedback yet — share the first idea!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sorted.map((item) => {
              const hasVoted = currentUserId
                ? item.votes.some((v) => v.userId === currentUserId)
                : false;

              return (
                <div
                  key={item.id}
                  className="p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30 flex items-start gap-4"
                >
                  <form action={toggleFeedbackVote}>
                    <input type="hidden" name="feedbackId" value={item.id} />
                    <button
                      className={`flex flex-col items-center px-3 py-2 border transition ${
                        hasVoted
                          ? "border-[#C99A3E] bg-[#C99A3E]/10 text-[#C99A3E]"
                          : "border-[#87A08D]/30 text-[#4A4238] dark:text-[#C9C5B8]"
                      }`}
                    >
                      <span>▲</span>
                      <span className="text-xs font-mono">{item.votes.length}</span>
                    </button>
                  </form>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono uppercase px-2 py-0.5 rounded-full ${
                          item.type === "bug"
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            : "bg-[#87A08D]/20 text-[#3D5A45] dark:text-[#E8E4D8]"
                        }`}
                      >
                        {item.type}
                      </span>
                      <span className="text-xs font-mono text-[#87A08D] uppercase">
                        {item.status}
                      </span>
                    </div>
                    <h2 className="font-semibold text-[#3D5A45] dark:text-[#E8E4D8] mt-1">
                      {item.title}
                    </h2>
                    <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8] mt-1">
                      {item.description}
                    </p>
                    <p className="text-xs font-mono text-[#87A08D] mt-2">
                      by {item.user.name ?? item.user.email}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}