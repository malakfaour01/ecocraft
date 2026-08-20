import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const [craftCount, userCount, postCount, featuredCrafts] = await Promise.all([
    prisma.craft.count(),
    prisma.user.count(),
    prisma.post.count(),
    prisma.craft.findMany({ orderBy: { createdAt: "desc" }, take: 3, include: { user: true } }),
  ]);

  return (
    <main
      className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28]"
      style={{
        backgroundImage:
          "radial-gradient(#87A08D22 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          <div className="inline-block -rotate-2 border-2 border-dashed border-[#87A08D] px-3 py-1 mb-6">
            <span className="font-mono text-xs tracking-widest text-[#3D5A45] dark:text-[#E8E4D8] uppercase">
              Material Recovery Program
            </span>
          </div>

          <h1
            className="text-6xl md:text-7xl text-[#3D5A45] dark:text-[#E8E4D8] leading-[0.95] mb-6"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Trash has a
            <br />
            second draft.
          </h1>

          <p className="text-lg text-[#4A4238] dark:text-[#C9C5B8] max-w-lg mb-8">
            EcoCraft turns what you were about to throw away into something
            worth keeping. Browse real projects, share what you build, and
            track the waste you divert.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/explore"
              className="bg-[#C99A3E] hover:bg-[#B3862F] text-white font-medium px-6 py-3 rounded-md transition"
            >
              Explore Crafts
            </Link>
            {!session?.user && (
              <Link
                href="/signup"
                className="border-2 border-[#87A08D] text-[#3D5A45] dark:text-[#E8E4D8] font-medium px-6 py-3 rounded-md hover:bg-[#87A08D]/10 transition"
              >
                Join free
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT: stamp + note card */}
        <div className="relative flex flex-col items-center gap-6">
          <svg viewBox="0 0 200 200" className="w-40 h-40 -rotate-[8deg] opacity-90">
            <defs>
              <path
                id="circlePath"
                d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <circle cx="100" cy="100" r="92" fill="none" stroke="#C99A3E" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="75" fill="none" stroke="#3D5A45" strokeWidth="1.5" />
            <text fontSize="11" fill="#3D5A45" letterSpacing="3" className="uppercase font-mono">
              <textPath href="#circlePath" startOffset="2%">
                MATERIAL RECOVERY PROGRAM • EST 2026 •
              </textPath>
            </text>
            <text x="100" y="112" fontSize="32" textAnchor="middle">♻️</text>
          </svg>

          <div className="relative bg-white dark:bg-[#333730] p-5 w-64 rotate-2 shadow-md border border-[#87A08D]/30">
            <div className="absolute -top-3 left-8 w-16 h-5 bg-[#C99A3E]/40 -rotate-3" />
            <p className="text-xs font-mono uppercase tracking-wide text-[#87A08D] mb-2">
              Field Note #001
            </p>
            <p className="text-sm text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)" }}>
              Yesterday&apos;s yogurt tub is today&apos;s seed starter.
            </p>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y-2 border-[#87A08D]/40 bg-[#EAE6D8] dark:bg-[#333730]">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-3 divide-x-2 divide-[#87A08D]/30 text-center">
          <div>
            <p className="text-2xl font-bold text-[#3D5A45] dark:text-[#E8E4D8]">{craftCount}</p>
            <p className="text-xs uppercase tracking-wide text-[#4A4238] dark:text-[#C9C5B8] font-mono">Crafts Logged</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#3D5A45] dark:text-[#E8E4D8]">{postCount}</p>
            <p className="text-xs uppercase tracking-wide text-[#4A4238] dark:text-[#C9C5B8] font-mono">Builds Shared</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#3D5A45] dark:text-[#E8E4D8]">{userCount}</p>
            <p className="text-xs uppercase tracking-wide text-[#4A4238] dark:text-[#C9C5B8] font-mono">Makers Joined</p>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Latest builds
          </h2>
          <Link href="/explore" className="text-sm text-[#C99A3E] underline">
            View all →
          </Link>
        </div>

        {featuredCrafts.length === 0 ? (
          <p className="text-[#4A4238] dark:text-[#C9C5B8]">No crafts yet — be the first to build something.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredCrafts.map((craft) => (
              <Link
                key={craft.id}
                href={`/craft/${craft.id}`}
                className="bg-white dark:bg-[#333730] border border-[#87A08D]/30 p-5 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <h3
                  className="text-lg text-[#3D5A45] dark:text-[#E8E4D8] mb-1"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                >
                  {craft.title}
                </h3>
                <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8] line-clamp-2 mb-3">
                  {craft.description}
                </p>
                <p className="text-xs font-mono text-[#C99A3E]">
                  by {craft.user.name ?? craft.user.email}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-[#3D5A45] text-[#F4F1E8] p-10 text-center">
          <h2
            className="text-3xl mb-2"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Got materials to sort?
          </h2>
          <p className="text-[#F4F1E8]/70 mb-6 max-w-md mx-auto">
            Log what you&apos;ve got, find a project, and give it a second
            draft instead of a landfill.
          </p>
          <Link
            href={session?.user ? "/new-craft" : "/signup"}
            className="inline-block bg-[#C99A3E] text-white font-medium px-6 py-3 rounded-md hover:bg-[#B3862F] transition"
          >
            {session?.user ? "Start a Craft" : "Get Started"}
          </Link>
        </div>
      </section>
    </main>
  );
}