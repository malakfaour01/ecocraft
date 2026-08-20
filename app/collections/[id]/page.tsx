import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const collection = await prisma.collection.findUnique({ where: { id }, include: { crafts: { include: { craft: true } } } });
  if (!collection) notFound();
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{collection.title}</h1>
        {collection.description && <p className="text-[#4A4238] dark:text-[#C9C5B8] mb-8">{collection.description}</p>}
        <div className="space-y-3">
          {collection.crafts.map((link) => (
            <Link key={link.craft.id} href={`/craft/${link.craft.id}`} className="block p-4 bg-white dark:bg-[#333730] border border-[#87A08D]/30 hover:-translate-y-1 transition-transform">
              <p className="font-medium text-[#3D5A45] dark:text-[#E8E4D8]">{link.craft.title}</p>
              <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8] mt-1">{link.craft.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}