"use client";

import { useActionState } from "react";
import { authenticate } from "@/lib/actions";

export default function LoginPage() {
  const [errorMessage, formAction, pending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-8">
      <div className="max-w-sm w-full bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700">
        <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
          Log in
        </h1>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full p-2 rounded-md border border-zinc-300 dark:border-zinc-600 dark:bg-zinc-700"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium py-2 rounded-md transition"
          >
            {pending ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4 text-center">
          No account?{" "}
          <a href="/signup" className="text-emerald-600 dark:text-emerald-400 underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}