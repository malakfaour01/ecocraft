import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import { claimListing } from "@/lib/actions";

export default async function MarketplacePage() {
  const session = await auth();

  const listings = await prisma.marketplaceListing.findMany({
    where: { status: "available" },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            ♻️ Materials Marketplace
          </h1>
          {session?.user && (
            <Link
              href="/marketplace/new"
              className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition"
            >
              + List Materials
            </Link>
          )}
        </div>
        <p className="text-zinc-600 dark:text-zinc-300 mb-8">
          Give away or swap materials with the community
        </p>

        {listings.length === 0 ? (
          <div className="p-8 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              No materials listed yet — be the first!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="p-5 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {listing.title}{" "}
                      <span className="text-sm font-normal text-zinc-400">
                        × {listing.quantity}
                      </span>
                    </h2>
                    {listing.description && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        {listing.description}
                      </p>
                    )}
                    <p className="text-xs text-zinc-400 mt-2">
                      Offered by {listing.user.name ?? listing.user.email}
                    </p>
                  </div>

                  {session?.user && session.user.email !== listing.user.email && (
                    <form
                      action={async () => {
                        "use server";
                        await claimListing(listing.id);
                      }}
                    >
                      <button className="text-sm bg-zinc-100 dark:bg-zinc-700 hover:bg-emerald-100 dark:hover:bg-emerald-900 px-3 py-1.5 rounded-md transition">
                        Claim
                      </button>
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