import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";

export default async function CollectionsPage() {
  const session = await auth();
  const collections = await prisma.collection.findMany({ orderBy: { createdAt: "desc" }, include: { crafts: true } });
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>📦 Craft Collections</h1>
          {session?.user && <Link href="/collections/new" className="text-sm bg-[#C99A3E] hover:bg-[#B3862F] text-white px-4 py-2 rounded-md transition">+ New Collection</Link>}
        </div>
        <p className="text-[#4A4238] dark:text-[#C9C5B8] mb-8">Curated bundles of crafts to get you started</p>
        {collections.length === 0 ? (
          <div className="p-8 bg-white dark:bg-[#333730] border border-[#87A08D]/30 text-center">
            <p className="text-[#4A4238] dark:text-[#C9C5B8]">No collections yet — create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.map((c) => (
              <Link key={c.id} href={`/collections/${c.id}`} className="p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30 hover:-translate-y-1 hover:shadow-lg transition-all">
                <h2 className="text-lg text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{c.title}</h2>
                {c.description && <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8] mt-1">{c.description}</p>}
                <p className="text-xs font-mono text-[#87A08D] mt-2">{c.crafts.length} crafts</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}