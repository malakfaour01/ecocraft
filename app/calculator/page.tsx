"use client";

import { useState } from "react";

const MATERIALS = [
  { key: "plastic", label: "Plastic Bottles (PET)", co2PerUnit: 0.15, unit: "bottle (~50g)" },
  { key: "glass", label: "Glass Jars", co2PerUnit: 0.15, unit: "jar (~500g)" },
  { key: "aluminum", label: "Aluminum Cans", co2PerUnit: 0.135, unit: "can (~15g)" },
  { key: "textiles", label: "Textile Items", co2PerUnit: 0.72, unit: "item (~200g)" },
  { key: "cardboard", label: "Cardboard Boxes", co2PerUnit: 0.5, unit: "box (~300g)" },
];

export default function CalculatorPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const totalCo2 = MATERIALS.reduce(
    (sum, m) => sum + (counts[m.key] || 0) * m.co2PerUnit,
    0
  );

  const phoneCharges = Math.round(totalCo2 / 0.01);

  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-xl mx-auto">
        <h1
          className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-2"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          🌍 Climate Impact Calculator
        </h1>
        <p className="text-[#4A4238] dark:text-[#C9C5B8] mb-8">
          See how much CO₂ you saved by upcycling instead of landfilling
        </p>

        <div className="bg-white dark:bg-[#333730] border border-[#87A08D]/30 p-6 space-y-4">
          {MATERIALS.map((material) => (
            <div key={material.key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-mono text-[#4A4238] dark:text-[#C9C5B8]">
                  {material.label}
                </label>
                <p className="text-xs text-[#87A08D]">{material.unit}</p>
              </div>
              <input
                type="number"
                min={0}
                value={counts[material.key] ?? ""}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setCounts({
                    ...counts,
                    [material.key]: isNaN(val) ? 0 : Math.max(0, val),
                  });
                }}
                className="w-20 p-2 border border-[#87A08D]/40 dark:bg-[#3D423A] dark:text-[#E8E4D8] text-center"
                placeholder="0"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[#3D5A45] text-[#F4F1E8] p-6 text-center">
          <p className="text-sm font-mono uppercase tracking-wide opacity-70 mb-1">
            Estimated CO₂ Saved
          </p>
          <p
            className="text-4xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            {totalCo2.toFixed(2)} kg
          </p>
          {totalCo2 > 0 && (
            <p className="text-sm opacity-70 mt-2">
              ≈ enough to charge a smartphone {phoneCharges} times
            </p>
          )}
        </div>

        <p className="text-xs text-[#87A08D] mt-4">
          Estimates based on average emissions savings per material type
          compared to landfilling. Actual savings vary by item and
          manufacturing process.
        </p>
      </div>
    </main>
  );
}