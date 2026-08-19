import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createListing } from "@/lib/actions";

export default async function NewListingPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
          ♻️ List Materials
        </h1>

        <form
          action={createListing}
          className="space-y-4 bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              What are you offering?
            </label>
            <input
              name="title"
              required
              placeholder="Glass jars"
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              defaultValue={1}
              min={1}
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
              placeholder="Clean, various sizes, local pickup only..."
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md transition"
          >
            List It
          </button>
        </form>
      </div>
    </main>
  );
}