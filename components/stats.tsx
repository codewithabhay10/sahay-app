"use client";

import { useEffect, useState } from "react";

interface StatItem {
  value: string;
  label: string;
  unit: string;
  targetValue: number;
}

const stats: StatItem[] = [
  { value: "3", label: "Faster Onboarding", unit: "x", targetValue: 3 },
  { value: "99", label: "Data availability", unit: "%", targetValue: 99 },
  { value: "24", label: "Access anywhere", unit: "h", targetValue: 24 },
];

export default function Stats() {
  const [animateElements, setAnimateElements] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateElements(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("stats");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!animateElements) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const newValue = Math.floor(easedProgress * stat.targetValue);

        setAnimatedValues((prev) => {
          const newValues = [...prev];
          newValues[index] = newValue;
          return newValues;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedValues((prev) => {
            const newValues = [...prev];
            newValues[index] = stat.targetValue;
            return newValues;
          });
        }
      }, interval);
    });
  }, [animateElements]);

  return (
    <section id="stats" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Title */}
        <div className="text-center">
          <h3
            className="text-4xl md:text-5xl font-medium leading-tight"
            style={{ textAlign: "center" }}
          >
            <span style={{ color: "rgb(94, 64, 0)" }} className="inline-block">
              <span
                className={`inline-block transition-all duration-700 ${
                  animateElements
                    ? "opacity-100 blur-0 translate-y-0"
                    : "opacity-0 blur-sm translate-y-2"
                }`}
                style={{ transitionDelay: "0ms", willChange: "transform" }}
              >
                Leveraging
              </span>{" "}
              <span
                className={`inline-block transition-all duration-700 ${
                  animateElements
                    ? "opacity-100 blur-0 translate-y-0"
                    : "opacity-0 blur-sm translate-y-2"
                }`}
                style={{
                  color: "rgb(255, 174, 0)",
                  transitionDelay: "100ms",
                  willChange: "transform",
                }}
              >
                efficiency
              </span>{" "}
              <span
                className={`inline-block transition-all duration-700 ${
                  animateElements
                    ? "opacity-100 blur-0 translate-y-0"
                    : "opacity-0 blur-sm translate-y-2"
                }`}
                style={{
                  color: "rgb(94, 64, 0)",
                  transitionDelay: "200ms",
                  willChange: "transform",
                }}
              >
                from
              </span>{" "}
              <span
                className={`inline-block transition-all duration-700 ${
                  animateElements
                    ? "opacity-100 blur-0 translate-y-0"
                    : "opacity-0 blur-sm translate-y-2"
                }`}
                style={{
                  color: "rgb(255, 174, 0)",
                  transitionDelay: "300ms",
                  willChange: "transform",
                }}
              >
                anywhere
              </span>{" "}
              <span
                className={`inline-block transition-all duration-700 ${
                  animateElements
                    ? "opacity-100 blur-0 translate-y-0"
                    : "opacity-0 blur-sm translate-y-2"
                }`}
                style={{
                  color: "rgb(94, 64, 0)",
                  transitionDelay: "400ms",
                  willChange: "transform",
                }}
              >
                with
              </span>{" "}
              <span
                className={`inline-block transition-all duration-700 ${
                  animateElements
                    ? "opacity-100 blur-0 translate-y-0"
                    : "opacity-0 blur-sm translate-y-2"
                }`}
                style={{
                  color: "rgb(94, 64, 0)",
                  transitionDelay: "500ms",
                  willChange: "transform",
                }}
              >
                reassured
              </span>{" "}
              <span
                className={`inline-block transition-all duration-700 ${
                  animateElements
                    ? "opacity-100 blur-0 translate-y-0"
                    : "opacity-0 blur-sm translate-y-2"
                }`}
                style={{
                  color: "rgb(255, 174, 0)",
                  transitionDelay: "600ms",
                  willChange: "transform",
                }}
              >
                availability
              </span>{" "}
              <span
                className={`inline-block transition-all duration-700 ${
                  animateElements
                    ? "opacity-100 blur-0 translate-y-0"
                    : "opacity-0 blur-sm translate-y-2"
                }`}
                style={{
                  color: "rgb(94, 64, 0)",
                  transitionDelay: "700ms",
                  willChange: "transform",
                }}
              >
                for
              </span>{" "}
              <span
                className={`inline-block transition-all duration-700 ${
                  animateElements
                    ? "opacity-100 blur-0 translate-y-0"
                    : "opacity-0 blur-sm translate-y-2"
                }`}
                style={{
                  color: "rgb(94, 64, 0)",
                  transitionDelay: "800ms",
                  willChange: "transform",
                }}
              >
                everyone.
              </span>
            </span>
          </h3>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`transition-all duration-700 hover:scale-105 transform ${
                animateElements
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div
                style={{
                  border: "3px solid rgb(255, 255, 255)",
                  backgroundColor: "rgba(255, 255, 255, 0.35)",
                  borderRadius: "30px",
                  padding: "2rem",
                }}
              >
                {/* Number and Suffix */}
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span
                    style={{
                      fontFamily: 'Inter, "Inter Placeholder", sans-serif',
                      fontSize: "74px",
                      fontWeight: 400,
                      letterSpacing: "-0.09em",
                      lineHeight: "1em",
                      color: "rgb(15, 15, 15)",
                    }}
                  >
                    {animatedValues[i]}
                  </span>
                  <p
                    style={{
                      fontFamily:
                        '"Clash Display", "Clash Display Placeholder", sans-serif',
                      fontSize: "56px",
                      fontWeight: 500,
                      letterSpacing: "-0.04em",
                      lineHeight: "1em",
                      color: "rgb(255, 174, 0)",
                    }}
                  >
                    {stat.unit}
                  </p>
                </div>

                {/* Label */}
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    lineHeight: "1.4em",
                    color: "rgb(15, 15, 15)",
                    textAlign: "center",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
