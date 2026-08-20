import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createListing } from "@/lib/actions";

export default async function NewListingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>♻️ List Materials</h1>
        <form action={createListing} className="space-y-4 bg-white dark:bg-[#333730] p-6 border border-[#87A08D]/30">
          <div>
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">What are you offering?</label>
            <input name="title" required placeholder="Glass jars" className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
          </div>
          <div>
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Quantity</label>
            <input type="number" name="quantity" defaultValue={1} min={1} className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
          </div>
          <div>
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Description (optional)</label>
            <textarea name="description" rows={3} className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
          </div>
          <button type="submit" className="w-full bg-[#C99A3E] hover:bg-[#B3862F] text-white font-medium py-2 rounded-md transition">List It</button>
        </form>
      </div>
    </main>
  );
}