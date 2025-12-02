"use client"

import { useEffect, useState } from "react"

interface StatItem {
  value: string
  label: string
  unit: string
}

const stats: StatItem[] = [
  { value: "3", label: "Faster Onboarding", unit: "x" },
  { value: "98", label: "Data availability", unit: "%" },
  { value: "24", label: "Access anywhere", unit: "h" },
]

export default function Stats() {
  const [animateElements, setAnimateElements] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimateElements(true)
      }
    })

    const section = document.getElementById("stats-section")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto text-center space-y-16">
        {/* Section Title */}
        <div className={`space-y-6 transition-all duration-700 ${animateElements ? "opacity-100" : "opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span style={{ color: "#2C3E50" }}>Leveraging </span>
            <span style={{ color: "#FDB714" }}>efficiency</span>
            <span style={{ color: "#2C3E50" }}> from </span>
            <span style={{ color: "#FFA500" }}>anywhere</span>
            <br />
            <span style={{ color: "#2C3E50" }}>with reassured </span>
            <span style={{ color: "#FDB714" }}>availability</span>
            <span style={{ color: "#2C3E50" }}> for </span>
            <span style={{ color: "#FFA500" }}>everyone</span>
            <span style={{ color: "#2C3E50" }}>.</span>
          </h2>
        </div>

        {/* Stats Cards */}
        <div id="stats-section" className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl bg-white/70 backdrop-blur shadow-sm transition-all duration-700 hover:shadow-lg hover:scale-105 transform ${
                animateElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-5xl md:text-6xl font-bold">
                <span>{stat.value}</span>
                <span style={{ color: "#FDB714" }}>{stat.unit}</span>
              </div>
              <p className="mt-4" style={{ color: "#4A4A4A" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
