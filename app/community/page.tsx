import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CommunityPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" }, include: { user: true, craft: true } });
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8]" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>🌍 Community Showcase</h1>
          <Link href="/new-post" className="text-sm bg-[#C99A3E] hover:bg-[#B3862F] text-white px-4 py-2 rounded-md transition">+ Share Post</Link>
        </div>
        <p className="text-[#4A4238] dark:text-[#C9C5B8] mb-8">See what others have built</p>
        {posts.length === 0 ? (
          <div className="p-8 bg-white dark:bg-[#333730] border border-[#87A08D]/30 text-center">
            <p className="text-[#4A4238] dark:text-[#C9C5B8]">No posts yet — be the first to share your craft!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-[#333730] border border-[#87A08D]/30 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.imageUrl} alt={post.caption ?? "Craft photo"} className="w-full max-h-96 object-cover" />
                <div className="p-4">
                  <p className="text-sm font-mono text-[#87A08D]">
                    {post.user.name ?? post.user.email} made{" "}
                    <Link href={`/craft/${post.craft.id}`} className="text-[#C99A3E] underline">{post.craft.title}</Link>
                  </p>
                  {post.caption && <p className="text-[#4A4238] dark:text-[#C9C5B8] mt-2">{post.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}