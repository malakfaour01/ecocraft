import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createPost } from "@/lib/actions";

export default async function NewPostPage() {
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
          📸 Share Your Craft
        </h1>

        {crafts.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400">
            No crafts exist yet — create one first before posting a photo of it.
          </p>
        ) : (
          <form
            action={createPost}
            className="space-y-4 bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Which craft?</label>
              <select
                name="craftId"
                required
                className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
              >
                {crafts.map((craft) => (
                  <option key={craft.id} value={craft.id}>
                    {craft.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                name="imageUrl"
                required
                type="url"
                placeholder="https://example.com/my-photo.jpg"
                className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
              />
              <p className="text-xs text-zinc-400 mt-1">
                Paste a link to a photo (e.g. from Imgur, or any image URL).
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Caption (optional)</label>
              <textarea
                name="caption"
                rows={3}
                placeholder="How did it turn out?"
                className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md transition"
            >
              Share Post
            </button>
          </form>
        )}
      </div>
    </main>
  );
}