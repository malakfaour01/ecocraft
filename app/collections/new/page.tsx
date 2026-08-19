import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createCollection } from "@/lib/actions";

export default async function NewCollectionPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const crafts = await prisma.craft.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true },
  });

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
          📦 Create a Collection
        </h1>

        {crafts.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400">
            No crafts exist yet — create some crafts first.
          </p>
        ) : (
          <form
            action={createCollection}
            className="space-y-4 bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                name="title"
                required
                placeholder="Beginner's Kitchen Upcycling Kit"
                className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description (optional)
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Easy crafts using common kitchen waste"
                className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Select crafts to include
              </label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {crafts.map((craft) => (
                  <label
                    key={craft.id}
                    className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200"
                  >
                    <input type="checkbox" name="craftIds" value={craft.id} />
                    {craft.title}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md transition"
            >
              Create Collection
            </button>
          </form>
        )}
      </div>
    </main>
  );
}