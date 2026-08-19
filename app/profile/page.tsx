import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      crafts: true,
      posts: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          🏆 Your Impact
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 mb-8">
          {user.name ?? user.email}&apos;s eco journey so far
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {user.crafts.length}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Crafts Created
            </p>
          </div>
          <div className="p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {user.posts.length}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Posts Shared
            </p>
          </div>
          <div className="p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {user.ecoPoints}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Eco Points
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold mb-4">Your Crafts</h2>
          {user.crafts.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              You haven&apos;t created any crafts yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {user.crafts.map((craft) => (
                <li key={craft.id} className="text-sm text-zinc-700 dark:text-zinc-200">
                  • {craft.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}