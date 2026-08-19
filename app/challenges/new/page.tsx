import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createChallenge } from "@/lib/actions";

export default async function NewChallengePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
          🏅 Start a Challenge
        </h1>

        <form
          action={createChallenge}
          className="space-y-4 bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              required
              placeholder="Cardboard Only Month"
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="This month, only crafts made from cardboard count!"
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                required
                className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                required
                className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md transition"
          >
            Create Challenge
          </button>
        </form>
      </div>
    </main>
  );
}