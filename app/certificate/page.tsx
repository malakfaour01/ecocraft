import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";

const signatureFont = Dancing_Script({ subsets: ["latin"], weight: "700" });

export default async function CertificatePage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; year?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) redirect("/login");

  const params = await searchParams;
  const now = new Date();
  const year = params.year ? Number(params.year) : now.getFullYear();
  const month = params.month ? Number(params.month) : now.getMonth() + 1;

  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 1);

  const [crafts, posts] = await Promise.all([
    prisma.craft.findMany({
      where: { userId: user.id, createdAt: { gte: monthStart, lt: monthEnd } },
    }),
    prisma.post.findMany({
      where: { userId: user.id, createdAt: { gte: monthStart, lt: monthEnd } },
    }),
  ]);

  const monthlyPoints = crafts.length * 10 + posts.length * 5;
  const monthLabel = monthStart.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;

  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-6 md:p-12 flex flex-col items-center">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href={`/certificate?month=${prevMonth}&year=${prevYear}`}
          className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]"
        >
          ← Prev
        </Link>
        <span className="text-sm font-mono text-[#3D5A45] dark:text-[#E8E4D8] uppercase tracking-wide">
          {monthLabel}
        </span>
        {!isCurrentMonth && (
          <Link
            href={`/certificate?month=${nextMonth}&year=${nextYear}`}
            className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] hover:text-[#C99A3E]"
          >
            Next →
          </Link>
        )}
      </div>

      <div
        className="w-full max-w-4xl bg-white p-1.5"
        style={{ boxShadow: "0 20px 60px rgba(61,90,69,0.2)", aspectRatio: "1.35 / 1" }}
      >
        <div className="w-full h-full border border-[#C99A3E] p-1.5">
          <div
            className="w-full h-full border-4 border-double border-[#3D5A45] relative overflow-hidden flex flex-col justify-between px-8 py-8 md:px-14 md:py-10"
            style={{
              backgroundImage: "radial-gradient(#87A08D15 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            {[
              "top-3 left-3 border-t-2 border-l-2",
              "top-3 right-3 border-t-2 border-r-2",
              "bottom-3 left-3 border-b-2 border-l-2",
              "bottom-3 right-3 border-b-2 border-r-2",
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-10 h-10 border-[#C99A3E]`} />
            ))}

            <span
              className="absolute inset-0 flex items-center justify-center text-[260px] opacity-[0.035] select-none pointer-events-none"
              aria-hidden
            >
              ♻
            </span>

            <div className="relative text-center">
              <p className="text-[11px] font-mono uppercase tracking-[0.4em] text-[#87A08D]">
                Monthly Impact Certificate
              </p>
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="text-[#87A08D] text-base">❧</span>
                <div className="w-24 h-px bg-[#C99A3E]" />
                <span className="text-2xl">♻️</span>
                <div className="w-24 h-px bg-[#C99A3E]" />
                <span className="text-[#87A08D] text-base">❧</span>
              </div>
            </div>

            <div className="relative text-center">
              <p className="text-sm text-[#4A4238] mb-1">
                This certifies that during <strong>{monthLabel}</strong>
              </p>
              <h1
                className="text-3xl md:text-5xl text-[#3D5A45] leading-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {user.name ?? user.email}
              </h1>
              <div className="w-40 h-px bg-[#C99A3E]/60 mx-auto mt-2 mb-4" />
              <p className="text-sm md:text-base text-[#4A4238] max-w-lg mx-auto">
                contributed real, measurable environmental impact through
                sustainable upcycling on EcoCraft.
              </p>
            </div>

            <div className="relative grid grid-cols-3 gap-4 max-w-md mx-auto w-full text-center">
              <div>
                <p
                  className="text-2xl md:text-3xl text-[#C99A3E]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                >
                  {crafts.length}
                </p>
                <p className="text-[10px] font-mono text-[#4A4238] uppercase mt-0.5">
                  Crafts This Month
                </p>
              </div>
              <div className="border-x border-[#87A08D]/20">
                <p
                  className="text-2xl md:text-3xl text-[#C99A3E]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                >
                  {posts.length}
                </p>
                <p className="text-[10px] font-mono text-[#4A4238] uppercase mt-0.5">
                  Builds Shared
                </p>
              </div>
              <div>
                <p
                  className="text-2xl md:text-3xl text-[#C99A3E]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                >
                  {monthlyPoints}
                </p>
                <p className="text-[10px] font-mono text-[#4A4238] uppercase mt-0.5">
                  Points Earned
                </p>
              </div>
            </div>

            <div className="relative flex items-end justify-between border-t border-[#87A08D]/20 pt-4">
              <div>
                <p
                  className={signatureFont.className}
                  style={{ fontSize: "24px", color: "#3D5A45", lineHeight: 1 }}
                >
                  EcoCraft Team
                </p>
                <div className="w-28 h-px bg-[#4A4238]/30 mt-1" />
                <p className="text-[10px] font-mono text-[#87A08D] mt-1">
                  Founder & Community
                </p>
              </div>

              <div className="relative w-14 h-14 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#C99A3E" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#3D5A45" strokeWidth="1.5" />
                  <text x="50" y="58" fontSize="26" textAnchor="middle">♻</text>
                </svg>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-mono text-[#87A08D] uppercase">Issued</p>
                <p className="text-sm text-[#4A4238]">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8] mt-6 text-center max-w-md">
        Right-click the certificate above and choose &quot;Save Image As&quot; or
        take a screenshot to share on LinkedIn, Instagram, or your portfolio.
      </p>
    </main>
  );
}