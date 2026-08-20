import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { completeOnboarding } from "@/lib/actions";

const MATERIAL_OPTIONS = ["Plastic", "Glass", "Cardboard", "Fabric", "Metal", "Paper", "Wood"];

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white dark:bg-[#333730] p-6 border border-[#87A08D]/30">
        <h1 className="text-2xl text-[#3D5A45] dark:text-[#E8E4D8] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Welcome to EcoCraft! 🌱</h1>
        <p className="text-sm text-[#4A4238] dark:text-[#C9C5B8] mb-6">What materials do you usually have lying around?</p>
        <form action={completeOnboarding} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {MATERIAL_OPTIONS.map((m) => (
              <label key={m} className="flex items-center gap-2 text-sm p-2 border border-[#87A08D]/30 rounded-md cursor-pointer hover:border-[#C99A3E]">
                <input type="checkbox" name="interests" value={m} /> {m}
              </label>
            ))}
          </div>
          <button type="submit" className="w-full bg-[#C99A3E] hover:bg-[#B3862F] text-white font-medium py-2 rounded-md transition">Get Started</button>
        </form>
      </div>
    </main>
  );
}