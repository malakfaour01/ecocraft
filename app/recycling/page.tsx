import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";

export default async function RecyclingPage() {
  const session = await auth();

  const centers = await prisma.recyclingCenter.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            📍 Recycling Directory
          </h1>
          {session?.user && (
            <Link
              href="/recycling/new"
              className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition"
            >
              + Add Center
            </Link>
          )}
        </div>
        <p className="text-zinc-600 dark:text-zinc-300 mb-8">
          Find where to recycle materials that can&apos;t be upcycled
        </p>

        {centers.length === 0 ? (
          <div className="p-8 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              No recycling centers listed yet — add one!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {centers.map((center) => (
              <div
                key={center.id}
                className="p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700"
              >
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {center.name}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {center.address}
                </p>
                {center.acceptedMaterials.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {center.acceptedMaterials.map((material, i) => (
                      <span
                        key={i}
                        className="text-xs bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded-full"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}