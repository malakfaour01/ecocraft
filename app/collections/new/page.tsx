import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createCollection } from "@/lib/actions";

export default async function NewCollectionPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const crafts = await prisma.craft.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true } });
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>📦 Create a Collection</h1>
        {crafts.length === 0 ? (
          <p className="text-[#4A4238] dark:text-[#C9C5B8]">No crafts exist yet — create some crafts first.</p>
        ) : (
          <form action={createCollection} className="space-y-4 bg-white dark:bg-[#333730] p-6 border border-[#87A08D]/30">
            <div>
              <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Title</label>
              <input name="title" required placeholder="Beginner's Kitchen Upcycling Kit" className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
            </div>
            <div>
              <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Description (optional)</label>
              <textarea name="description" rows={3} className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
            </div>
            <div>
              <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-2">Select crafts to include</label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {crafts.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 text-sm text-[#4A4238] dark:text-[#C9C5B8]">
                    <input type="checkbox" name="craftIds" value={c.id} /> {c.title}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full bg-[#C99A3E] hover:bg-[#B3862F] text-white font-medium py-2 rounded-md transition">Create Collection</button>
          </form>
        )}
      </div>
    </main>
  );
}