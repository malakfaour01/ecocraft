import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function CraftDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const craft = await prisma.craft.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!craft) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          {craft.title}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
          By {craft.user.name ?? craft.user.email}
        </p>

        <div className="flex gap-3 mb-6 text-xs">
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full capitalize">
            {craft.difficulty}
          </span>
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full">
            ⏱ {craft.estimatedTime} min
          </span>
        </div>

        <p className="text-zinc-700 dark:text-zinc-200 leading-relaxed">
          {craft.description}
        </p>

        {craft.steps.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Steps</h2>
            <ol className="list-decimal list-inside space-y-1 text-zinc-700 dark:text-zinc-200">
              {craft.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </main>
  );
}