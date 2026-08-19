import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const collection = await prisma.collection.findUnique({
    where: { id },
    include: { crafts: { include: { craft: true } } },
  });

  if (!collection) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="text-zinc-600 dark:text-zinc-300 mb-8">
            {collection.description}
          </p>
        )}

        <div className="space-y-3">
          {collection.crafts.map((link) => (
            <Link
              key={link.craft.id}
              href={`/craft/${link.craft.id}`}
              className="block p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-emerald-400 transition"
            >
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                {link.craft.title}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {link.craft.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}