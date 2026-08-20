import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ExplorePage() {
  const crafts = await prisma.craft.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-[#3D5A45] dark:text-[#E8E4D8] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>🧰 Craft Library</h1>
        <p className="text-[#4A4238] dark:text-[#C9C5B8] mb-8">Browse upcycling project ideas from the community</p>
        {crafts.length === 0 ? (
          <div className="p-8 bg-white dark:bg-[#333730] border border-[#87A08D]/30 text-center">
            <p className="text-[#4A4238] dark:text-[#C9C5B8]">No crafts yet — be the first to add one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crafts.map((craft) => (
              <Link key={craft.id} href={`/craft/${craft.id}`} className="p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all block">
                <h2 className="text-lg text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{craft.title}</h2>
                <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8] mt-1">{craft.description}</p>
                <div className="flex gap-3 mt-3 text-xs">
                  <span className="px-2 py-1 bg-[#EAE6D8] dark:bg-[#3D423A] text-[#4A4238] dark:text-[#C9C5B8] rounded-full capitalize font-mono">{craft.difficulty}</span>
                  <span className="px-2 py-1 bg-[#EAE6D8] dark:bg-[#3D423A] text-[#4A4238] dark:text-[#C9C5B8] rounded-full font-mono">⏱ {craft.estimatedTime} min</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}