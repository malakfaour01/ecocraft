import Link from "next/link";
import { guides } from "@/lib/guides";

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-2"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          📚 Guides & Knowledge Hub
        </h1>
        <p className="text-[#4A4238] dark:text-[#C9C5B8] mb-8">
          Real, practical guides on recycling and upcycling common materials
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30 hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <span className="text-xs font-mono uppercase tracking-wide text-[#C99A3E]">
                {guide.category} · {guide.readTime}
              </span>
              <h2
                className="text-lg text-[#3D5A45] dark:text-[#E8E4D8] mt-1 mb-2"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                {guide.title}
              </h2>
              <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8]">
                {guide.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}