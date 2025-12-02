"use client"

import { useEffect, useState } from "react"

const featuresList = [
  {
    icon: "📊",
    title: "Real-time Analytics",
    description: "Track status, approval rates, and distribution metrics with live dashboards.",
  },
  {
    icon: "🔗",
    title: "Blockchain Security",
    description: "Immutable records on Fabric-like ledgers guarantee transparency and tamper resistance.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Verification",
    description: "Machine learning ensures accurate beneficiary identification and reduces fraud.",
  },
]

export default function Features() {
  const [animateElements, setAnimateElements] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimateElements(true)
      }
    })

    const section = document.getElementById("features-section")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Section Header */}
        <div
          id="features-section"
          className={`text-center space-y-4 transition-all duration-700 ${animateElements ? "opacity-100" : "opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur">
            <span>✨</span>
            <span className="text-sm font-medium" style={{ color: "#4A4A4A" }}>
              Features
            </span>
            <span>✨</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#2C3E50" }}>
            About the Platform
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#4A4A4A" }}>
            The Digital Beneficiary Identification System leverages cutting-edge technology to identify, verify, and
            track eligible beneficiaries. We combine artificial intelligence, blockchain, and analytics to ensure
            transparent, fair, and efficient distribution of aid.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {featuresList.map((feature, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl bg-white/70 backdrop-blur shadow-sm transition-all duration-700 hover:shadow-lg hover:scale-105 transform ${
                animateElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#FDB714" }}
              >
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#2C3E50" }}>
                {feature.title}
              </h3>
              <p style={{ color: "#4A4A4A" }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
