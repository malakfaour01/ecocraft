import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ makers?: string; materials?: string }>;
}) {
  const params = await searchParams;
  const makerQuery = params.makers ?? "";
  const materialQuery = params.materials ?? "";

  const makers = makerQuery
    ? await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: makerQuery, mode: "insensitive" } },
            { email: { contains: makerQuery, mode: "insensitive" } },
          ],
        },
        take: 10,
      })
    : [];

  const materials = materialQuery
    ? await prisma.marketplaceListing.findMany({
        where: {
          status: "available",
          title: { contains: materialQuery, mode: "insensitive" },
        },
        include: { user: true },
        take: 10,
      })
    : [];

  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto space-y-10">
        <h1
          className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          🔍 Search
        </h1>

        {/* MAKERS SEARCH */}
        <section>
          <h2
            className="text-lg text-[#3D5A45] dark:text-[#E8E4D8] mb-3"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            Find Makers
          </h2>
          <form method="GET" className="flex gap-2 mb-4">
            <input type="hidden" name="materials" value={materialQuery} />
            <input
              name="makers"
              defaultValue={makerQuery}
              placeholder="Search by name or email..."
              className="flex-1 p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]"
            />
            <button className="bg-[#C99A3E] hover:bg-[#B3862F] text-white px-4 py-2 rounded-md transition">
              Search
            </button>
          </form>

          {makerQuery && makers.length === 0 && (
            <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8]">No makers found.</p>
          )}

          <div className="space-y-2">
            {makers.map((maker) => (
              <Link
                key={maker.id}
                href={`/maker/${maker.id}`}
                className="block p-4 bg-white dark:bg-[#333730] border border-[#87A08D]/30 hover:-translate-y-1 transition-transform"
              >
                <p className="font-medium text-[#3D5A45] dark:text-[#E8E4D8]">
                  {maker.name ?? maker.email}
                </p>
                <p className="text-xs font-mono text-[#87A08D]">{maker.ecoPoints} eco-points</p>
              </Link>
            ))}
          </div>
        </section>

        {/* MATERIALS SEARCH */}
        <section>
          <h2
            className="text-lg text-[#3D5A45] dark:text-[#E8E4D8] mb-3"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            Find Materials
          </h2>
          <form method="GET" className="flex gap-2 mb-4">
            <input type="hidden" name="makers" value={makerQuery} />
            <input
              name="materials"
              defaultValue={materialQuery}
              placeholder="Search available materials..."
              className="flex-1 p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]"
            />
            <button className="bg-[#C99A3E] hover:bg-[#B3862F] text-white px-4 py-2 rounded-md transition">
              Search
            </button>
          </form>

          {materialQuery && materials.length === 0 && (
            <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8]">No materials found.</p>
          )}

          <div className="space-y-2">
            {materials.map((listing) => (
              <div
                key={listing.id}
                className="p-4 bg-white dark:bg-[#333730] border border-[#87A08D]/30"
              >
                <p className="font-medium text-[#3D5A45] dark:text-[#E8E4D8]">
                  {listing.title} <span className="text-sm font-normal">× {listing.quantity}</span>
                </p>
                <p className="text-xs font-mono text-[#87A08D]">
                  Offered by {listing.user.name ?? listing.user.email}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}