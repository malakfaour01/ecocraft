import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createRecyclingCenter } from "@/lib/actions";

export default async function NewRecyclingCenterPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>📍 Add a Recycling Center</h1>
        <form action={createRecyclingCenter} className="space-y-4 bg-white dark:bg-[#333730] p-6 border border-[#87A08D]/30">
          <div>
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Name</label>
            <input name="name" required placeholder="Green Valley Recycling Center" className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
          </div>
          <div>
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Address</label>
            <input name="address" required placeholder="123 Main St, Your City" className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
          </div>
          <div>
            <label className="block text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8] mb-1">Accepted Materials</label>
            <input name="acceptedMaterials" required placeholder="Plastic, Glass, Paper, Metal" className="w-full p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8]" />
            <p className="text-xs text-[#87A08D] mt-1">Separate materials with commas</p>
          </div>
          <button type="submit" className="w-full bg-[#C99A3E] hover:bg-[#B3862F] text-white font-medium py-2 rounded-md transition">Add Center</button>
        </form>
      </div>
    </main>
  );
}