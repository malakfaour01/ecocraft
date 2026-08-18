import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ExplorePage() {
  const crafts = await prisma.craft.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          🧰 Craft Library
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 mb-8">
          Browse upcycling project ideas from the community
        </p>

        {crafts.length === 0 ? (
          <div className="p-8 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              No crafts yet — be the first to add one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crafts.map((craft) => (
              <Link
                key={craft.id}
                href={`/craft/${craft.id}`}
                className="p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:border-emerald-400 transition block"
              >
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {craft.title}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {craft.description}
                </p>
                <div className="flex gap-3 mt-3 text-xs text-zinc-400">
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full capitalize">
                    {craft.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full">
                    ⏱ {craft.estimatedTime} min
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}