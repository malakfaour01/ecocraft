import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import { claimListing } from "@/lib/actions";

export default async function MarketplacePage() {
  const session = await auth();
  const listings = await prisma.marketplaceListing.findMany({ where: { status: "available" }, orderBy: { createdAt: "desc" }, include: { user: true } });
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>♻️ Materials Marketplace</h1>
          {session?.user && <Link href="/marketplace/new" className="text-sm bg-[#C99A3E] hover:bg-[#B3862F] text-white px-4 py-2 rounded-md transition">+ List Materials</Link>}
        </div>
        <p className="text-[#4A4238] dark:text-[#C9C5B8] mb-8">Give away or swap materials with the community</p>
        {listings.length === 0 ? (
          <div className="p-8 bg-white dark:bg-[#333730] border border-[#87A08D]/30 text-center">
            <p className="text-[#4A4238] dark:text-[#C9C5B8]">No materials listed yet — be the first!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div key={listing.id} className="p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                      {listing.title} <span className="text-sm font-normal text-[#4A4238] dark:text-[#C9C5B8]">× {listing.quantity}</span>
                    </h2>
                    {listing.description && <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8] mt-1">{listing.description}</p>}
                    <p className="text-xs font-mono text-[#87A08D] mt-2">Offered by {listing.user.name ?? listing.user.email}</p>
                  </div>
                  {session?.user && session.user.email !== listing.user.email && (
                    <form action={async () => { "use server"; await claimListing(listing.id); }}>
                      <button className="text-sm bg-[#EAE6D8] dark:bg-[#3D423A] hover:bg-[#C99A3E] hover:text-white px-3 py-1.5 rounded-md transition">Claim</button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}