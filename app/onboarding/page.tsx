import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { completeOnboarding } from "@/lib/actions";

const MATERIAL_OPTIONS = [
  "Plastic",
  "Glass",
  "Cardboard",
  "Fabric",
  "Metal",
  "Paper",
  "Wood",
];

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700">
        <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          Welcome to EcoCraft! 🌱
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          What materials do you usually have lying around? We&apos;ll use this to
          personalize your experience.
        </p>

        <form action={completeOnboarding} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {MATERIAL_OPTIONS.map((material) => (
              <label
                key={material}
                className="flex items-center gap-2 text-sm p-2 border border-zinc-200 dark:border-zinc-600 rounded-md cursor-pointer hover:border-emerald-400"
              >
                <input type="checkbox" name="interests" value={material} />
                {material}
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-md transition"
          >
            Get Started
          </button>
        </form>
      </div>
    </main>
  );
}