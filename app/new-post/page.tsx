import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createPost } from "@/lib/actions";

export default async function NewPostPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const crafts = await prisma.craft.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, title: true } });
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>📸 Share Your Craft</h1>
        {crafts.length === 0 ? (
          <p className="text-[#4A4238] dark:text-[#C9C5B8]">No crafts exist yet — create one first.</p>
        ) : (
          <form action={createPost} className="space-y-4 bg-white dark:bg-[#333730] p-6 border border-[#87A08D]/30">
            <div>
              <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Which craft?</label>
              <select name="craftId" required className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]">
                {crafts.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Image URL</label>
              <input name="imageUrl" required type="url" placeholder="https://example.com/photo.jpg" className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
            </div>
            <div>
              <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Caption (optional)</label>
              <textarea name="caption" rows={3} className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
            </div>
            <button type="submit" className="w-full bg-[#C99A3E] hover:bg-[#B3862F] text-white font-medium py-2 rounded-md transition">Share Post</button>
          </form>
        )}
      </div>
    </main>
  );
}