"use client";
import { useActionState } from "react";
import { signUp } from "@/lib/actions";

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUp, undefined);
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] flex items-center justify-center p-8">
      <div className="max-w-sm w-full bg-white dark:bg-[#333730] p-6 border border-[#87A08D]/30">
        <h1 className="text-2xl text-[#3D5A45] dark:text-[#E8E4D8] mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Create your account</h1>
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Name</label>
            <input name="name" required className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
          </div>
          <div>
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Email</label>
            <input type="email" name="email" required className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
          </div>
          <div>
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Password</label>
            <input type="password" name="password" required minLength={6} className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
          </div>
          {state?.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
          <button type="submit" disabled={pending} className="w-full bg-[#C99A3E] hover:bg-[#B3862F] disabled:opacity-50 text-white font-medium py-2 rounded-md transition">{pending ? "Creating account..." : "Sign Up"}</button>
        </form>
      </div>
    </main>
  );
}