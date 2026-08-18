import { createCraft } from "@/lib/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewCraftPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
          ✨ Add a New Craft
        </h1>

        <form
          action={createCraft}
          className="space-y-4 bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              required
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
              placeholder="Plastic Bottle Vase"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
              placeholder="Turn an old plastic bottle into a decorative vase..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Difficulty</label>
            <select
              name="difficulty"
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Estimated Time (minutes)
            </label>
            <input
              type="number"
              name="estimatedTime"
              defaultValue={30}
              min={1}
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md transition"
          >
            Create Craft
          </button>
        </form>
      </div>
    </main>
  );
}