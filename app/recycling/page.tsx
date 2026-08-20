import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";

export default async function RecyclingPage() {
  const session = await auth();
  const centers = await prisma.recyclingCenter.findMany({ orderBy: { name: "asc" } });
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>📍 Recycling Directory</h1>
          {session?.user && <Link href="/recycling/new" className="text-sm bg-[#C99A3E] hover:bg-[#B3862F] text-white px-4 py-2 rounded-md transition">+ Add Center</Link>}
        </div>
        <p className="text-[#4A4238] dark:text-[#C9C5B8] mb-8">Find where to recycle materials that can&apos;t be upcycled</p>
        {centers.length === 0 ? (
          <div className="p-8 bg-white dark:bg-[#333730] border border-[#87A08D]/30 text-center">
            <p className="text-[#4A4238] dark:text-[#C9C5B8]">No recycling centers listed yet — add one!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {centers.map((center) => (
              <div key={center.id} className="p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30">
                <h2 className="text-lg text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>{center.name}</h2>
                <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8] mt-1">{center.address}</p>
                {center.acceptedMaterials.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {center.acceptedMaterials.map((m, i) => <span key={i} className="text-xs font-mono bg-[#EAE6D8] dark:bg-[#3D423A] text-[#4A4238] dark:text-[#C9C5B8] px-2 py-1 rounded-full">{m}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}