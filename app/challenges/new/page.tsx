import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createChallenge } from "@/lib/actions";

export default async function NewChallengePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>🏅 Start a Challenge</h1>
        <form action={createChallenge} className="space-y-4 bg-white dark:bg-[#333730] p-6 border border-[#87A08D]/30">
          <div>
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Title</label>
            <input name="title" required placeholder="Cardboard Only Month" className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
          </div>
          <div>
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Description</label>
            <textarea name="description" required rows={3} className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Start Date</label>
              <input type="date" name="startDate" required className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
            </div>
            <div>
              <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">End Date</label>
              <input type="date" name="endDate" required className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
            </div>
          </div>
          <button type="submit" className="w-full bg-[#C99A3E] hover:bg-[#B3862F] text-white font-medium py-2 rounded-md transition">Create Challenge</button>
        </form>
      </div>
    </main>
  );
}