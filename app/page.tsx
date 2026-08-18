import { prisma } from "@/lib/prisma";
import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  let users = [] as Array<{ id: string }>;
  let items = [] as Array<{ id: string }>;
  let dbError: string | null = null;

  try {
    [users, items] = await Promise.all([
      prisma.user.findMany(),
      prisma.item.findMany(),
    ]);
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Unknown database error";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-xl w-full p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-700 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
            🌱 EcoCraft Dashboard
          </h1>

          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button className="text-sm text-zinc-500 hover:text-red-500 underline">
                Log out
              </button>
            </form>
          ) : (
            <a
              href="/login"
              className="text-sm text-emerald-600 hover:text-emerald-700 underline"
            >
              Log in
            </a>
          )}
        </div>

        {session?.user ? (
          <p className="text-zinc-600 dark:text-zinc-300">
            Welcome back, {session.user.name ?? session.user.email}!
          </p>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-300">
            Database successfully connected via Prisma ORM!
          </p>
        )}

        {dbError ? (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded">
            <p className="text-red-700 dark:text-red-300 font-medium">Database not connected</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{dbError}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <div className="p-4 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Total Items</p>
              <p className="text-2xl font-bold">{items.length}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}