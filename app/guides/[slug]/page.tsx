import { guides } from "@/lib/guides";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide Not Found | EcoCraft" };
  return { title: `${guide.title} | EcoCraft`, description: guide.summary };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/guides" className="text-sm text-[#C99A3E] underline mb-6 inline-block">
          ← All Guides
        </Link>

        <span className="text-xs font-mono uppercase tracking-wide text-[#C99A3E]">
          {guide.category} · {guide.readTime}
        </span>

        <h1
          className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mt-2 mb-6"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          {guide.title}
        </h1>

        <div className="bg-white dark:bg-[#333730] border border-[#87A08D]/30 p-6">
          {guide.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-[#4A4238] dark:text-[#C9C5B8] leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}