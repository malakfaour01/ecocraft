import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createRecyclingCenter } from "@/lib/actions";

export default async function NewRecyclingCenterPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
          📍 Add a Recycling Center
        </h1>

        <form
          action={createRecyclingCenter}
          className="space-y-4 bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              required
              placeholder="Green Valley Recycling Center"
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              name="address"
              required
              placeholder="123 Main St, Your City"
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Accepted Materials
            </label>
            <input
              name="acceptedMaterials"
              required
              placeholder="Plastic, Glass, Paper, Metal"
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            />
            <p className="text-xs text-zinc-400 mt-1">
              Separate materials with commas
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md transition"
          >
            Add Center
          </button>
        </form>
      </div>
    </main>
  );
}