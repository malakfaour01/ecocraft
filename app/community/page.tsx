import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CommunityPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, craft: true },
  });

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            🌍 Community Showcase
          </h1>
          <Link
            href="/new-post"
            className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition"
          >
            + Share Post
          </Link>
        </div>
        <p className="text-zinc-600 dark:text-zinc-300 mb-8">
          See what others have built
        </p>

        {posts.length === 0 ? (
          <div className="p-8 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              No posts yet — be the first to share your craft!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.caption ?? "Craft photo"}
                  className="w-full max-h-96 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {post.user.name ?? post.user.email} made{" "}
                    <Link
                      href={`/craft/${post.craft.id}`}
                      className="text-emerald-600 dark:text-emerald-400 underline"
                    >
                      {post.craft.title}
                    </Link>
                  </p>
                  {post.caption && (
                    <p className="text-zinc-700 dark:text-zinc-200 mt-2">
                      {post.caption}
                    </p>
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