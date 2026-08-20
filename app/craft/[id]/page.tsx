import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const craft = await prisma.craft.findUnique({ where: { id } });
  if (!craft) return { title: "Craft Not Found | EcoCraft" };
  return { title: `${craft.title} | EcoCraft`, description: craft.description };
}

export default async function CraftDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const craft = await prisma.craft.findUnique({ where: { id }, include: { user: true } });
  if (!craft) notFound();

  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-[#333730] border border-[#87A08D]/30 p-6">
        <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>{craft.title}</h1>
        <Link href={`/maker/${craft.user.id}`} className="text-sm font-mono text-[#87A08D] mb-4 underline block">
  By {craft.user.name ?? craft.user.email}
</Link>
        <div className="flex gap-3 mb-6 text-xs">
          <span className="px-3 py-1 bg-[#EAE6D8] dark:bg-[#3D423A] text-[#4A4238] dark:text-[#C9C5B8] rounded-full capitalize font-mono">{craft.difficulty}</span>
          <span className="px-3 py-1 bg-[#EAE6D8] dark:bg-[#3D423A] text-[#4A4238] dark:text-[#C9C5B8] rounded-full font-mono">⏱ {craft.estimatedTime} min</span>
        </div>
        <p className="text-[#4A4238] dark:text-[#C9C5B8] leading-relaxed">{craft.description}</p>
        {craft.steps.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg text-[#3D5A45] dark:text-[#E8E4D8] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>Steps</h2>
            <ol className="list-decimal list-inside space-y-1 text-[#4A4238] dark:text-[#C9C5B8]">
              {craft.steps.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </div>
        )}
      </div>
    </main>
  );
}