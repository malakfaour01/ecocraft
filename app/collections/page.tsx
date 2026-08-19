import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";

export default async function CollectionsPage() {
  const session = await auth();

  const collections = await prisma.collection.findMany({
    orderBy: { createdAt: "desc" },
    include: { crafts: true },
  });

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            📦 Craft Collections
          </h1>
          {session?.user && (
            <Link
              href="/collections/new"
              className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition"
            >
              + New Collection
            </Link>
          )}
        </div>
        <p className="text-zinc-600 dark:text-zinc-300 mb-8">
          Curated bundles of crafts to get you started
        </p>

        {collections.length === 0 ? (
          <div className="p-8 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              No collections yet — create one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className="p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-emerald-400 transition"
              >
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {collection.title}
                </h2>
                {collection.description && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {collection.description}
                  </p>
                )}
                <p className="text-xs text-zinc-400 mt-2">
                  {collection.crafts.length} craft
                  {collection.crafts.length !== 1 ? "s" : ""}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}