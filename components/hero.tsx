"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [animateElements, setAnimateElements] = useState(false)

  useEffect(() => {
    setAnimateElements(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Decorative fan element */}
      <div className="absolute left-0 top-1/4 w-96 h-96 opacity-40 animate-float">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M100 20 L120 180 L100 160 L80 180 Z" fill="#FFA500" opacity="0.3" />
          <path d="M100 20 L130 140 L100 120 L70 140 Z" fill="#FFB84D" opacity="0.25" />
          <path d="M100 20 L140 100 L100 90 L60 100 Z" fill="#FFC866" opacity="0.2" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-8">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur transition-all duration-700 ${animateElements ? "opacity-100" : "opacity-0"}`}
        >
          <span className="text-xl">⚡</span>
          <span className="text-sm font-medium" style={{ color: "#4A4A4A" }}>
            Most Efficient
          </span>
          <span className="text-xl">⚡</span>
        </div>

        {/* Main Heading */}
        <h1
          className={`text-5xl md:text-6xl font-bold leading-tight transition-all duration-700 ${animateElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span style={{ color: "#2C3E50" }}>Access Government </span>
          <span style={{ color: "#FDB714" }}>Welfare Schemes</span>
          <br />
          <span style={{ color: "#2C3E50" }}>Effortlessly</span>
        </h1>

        {/* Description */}
        <p
          className={`text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${animateElements ? "opacity-100" : "opacity-0"}`}
          style={{ color: "#4A4A4A" }}
        >
          A unified portal for citizens, organizations, and administrators to manage documents, verify identities, and
          apply for welfare schemes securely.
        </p>

        {/* Features List */}
        <div
          className={`flex flex-wrap justify-center gap-4 md:gap-6 transition-all duration-700 delay-300 ${animateElements ? "opacity-100" : "opacity-0"}`}
        >
          {["Unified Documents", "Secure Verification", "Fast Applications"].map((feature, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "#6366F1" }}
              >
                ✓
              </span>
              <span className="text-sm font-medium" style={{ color: "#4A4A4A" }}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className={`px-8 py-3 rounded-full font-bold text-white transition-all hover:shadow-lg hover:scale-105 duration-700 ${animateElements ? "opacity-100 delay-500" : "opacity-0"}`}
          style={{ backgroundColor: "#FDB714" }}
        >
          Get Started
        </button>
      </div>
    </section>
  )
}
