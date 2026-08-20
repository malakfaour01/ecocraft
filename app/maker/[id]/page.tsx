import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { toggleFollow } from "@/lib/actions";
import Link from "next/link";

export default async function MakerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const maker = await prisma.user.findUnique({
    where: { id },
    include: {
      crafts: true,
      followers: true,
      following: true,
    },
  });

  if (!maker) {
    notFound();
  }

  let currentUserId: string | null = null;
  let isFollowing = false;

  if (session?.user?.email) {
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (currentUser) {
      currentUserId = currentUser.id;
      isFollowing = maker.followers.some((f) => f.followerId === currentUser.id);
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-[#333730] border border-[#87A08D]/30 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1
                className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {maker.name ?? maker.email}
              </h1>
              <p className="text-sm font-mono text-[#87A08D] mt-1">
                {maker.followers.length} followers · {maker.following.length} following
              </p>
            </div>

            {currentUserId && currentUserId !== maker.id && (
              <form action={toggleFollow}>
                <input type="hidden" name="targetUserId" value={maker.id} />
                <button
                  className={`text-sm px-4 py-2 rounded-md transition ${
                    isFollowing
                      ? "bg-[#EAE6D8] dark:bg-[#3D423A] text-[#4A4238] dark:text-[#C9C5B8]"
                      : "bg-[#C99A3E] hover:bg-[#B3862F] text-white"
                  }`}
                >
                  {isFollowing ? "Following" : "+ Follow"}
                </button>
              </form>
            )}
          </div>
        </div>

        <h2
          className="text-xl text-[#3D5A45] dark:text-[#E8E4D8] mb-3"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          Crafts by {maker.name ?? maker.email}
        </h2>
        {maker.crafts.length === 0 ? (
          <p className="text-[#4A4238] dark:text-[#C9C5B8] text-sm">No crafts yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {maker.crafts.map((craft) => (
              <Link
                key={craft.id}
                href={`/craft/${craft.id}`}
                className="p-5 bg-white dark:bg-[#333730] border border-[#87A08D]/30 hover:-translate-y-1 transition-transform"
              >
                <h3 className="font-semibold text-[#3D5A45] dark:text-[#E8E4D8]">
                  {craft.title}
                </h3>
                <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8] mt-1">
                  {craft.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}