"use client";

import { useState } from "react";
import { quizQuestions } from "@/lib/quiz";
import { submitQuizScore } from "@/lib/actions";

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const question = quizQuestions[current];

  function handleAnswer(index: number) {
    if (selected !== null) return;
    setSelected(index);
    if (index === question.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 < quizQuestions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  async function handleFinish() {
    if (!submitted) {
      setSubmitted(true);
      await submitQuizScore(score);
    }
  }

  return (
    <main className="min-h-screen bg-[#F4F1E8] dark:bg-[#2B2E28] p-8">
      <div className="max-w-xl mx-auto">
        <h1
          className="text-3xl text-[#3D5A45] dark:text-[#E8E4D8] mb-6"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          🧠 Weekly Eco Quiz
        </h1>

        {!finished ? (
          <div className="bg-white dark:bg-[#333730] border border-[#87A08D]/30 p-6">
            <p className="text-xs font-mono text-[#87A08D] mb-3">
              Question {current + 1} of {quizQuestions.length}
            </p>
            <p className="text-lg text-[#3D5A45] dark:text-[#E8E4D8] mb-4">
              {question.question}
            </p>

            <div className="space-y-2">
              {question.options.map((option, i) => {
                const isCorrect = i === question.correct;
                const isSelected = i === selected;
                let style = "border-[#87A08D]/30 dark:text-[#C9C5B8]";
                if (selected !== null) {
                  if (isCorrect) style = "border-[#3D5A45] bg-[#3D5A45]/10 text-[#3D5A45] dark:text-[#E8E4D8]";
                  else if (isSelected) style = "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-3 border transition ${style}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selected !== null && (
              <button
                onClick={handleNext}
                className="mt-4 bg-[#C99A3E] hover:bg-[#B3862F] text-white px-4 py-2 rounded-md transition"
              >
                {current + 1 < quizQuestions.length ? "Next" : "See Results"}
              </button>
            )}
          </div>
        ) : (
          <div className="bg-[#3D5A45] text-[#F4F1E8] p-8 text-center">
            <p className="text-sm font-mono uppercase tracking-wide opacity-70 mb-2">
              Quiz Complete
            </p>
            <p
              className="text-4xl mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              {score} / {quizQuestions.length}
            </p>
            <p className="opacity-70 mb-6">
              {score === quizQuestions.length
                ? "Perfect score! You know your materials."
                : score >= quizQuestions.length / 2
                ? "Nice work — solid recycling knowledge."
                : "Check out the Guides section to learn more!"}
            </p>
            <button
              onClick={handleFinish}
              disabled={submitted}
              className="bg-[#C99A3E] hover:bg-[#B3862F] disabled:opacity-50 text-white px-6 py-3 rounded-md transition"
            >
              {submitted ? "Points Awarded! ✓" : `Claim +${score * 2} Eco-Points`}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}