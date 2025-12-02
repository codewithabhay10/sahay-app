"use client"

import { useState, useEffect } from "react"

const faqs = [
  { question: "What will I learn?", answer: "You will learn comprehensive skills..." },
  { question: "Do I need coding experience?", answer: "No prior experience required..." },
  { question: "Do I get a certificate?", answer: "Yes, you will receive a certificate..." },
  { question: "Are the courses self-paced?", answer: "Yes, all courses are self-paced..." },
]

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [animateElements, setAnimateElements] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAnimateElements(true)
      }
    })

    const section = document.getElementById("faq-section")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="faq" className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div
          id="faq-section"
          className={`text-center space-y-4 mb-16 transition-all duration-700 ${animateElements ? "opacity-100" : "opacity-0"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur">
            <span>❓</span>
            <span className="text-sm font-medium" style={{ color: "#4A4A4A" }}>
              Faq's
            </span>
            <span>❓</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: "#2C3E50" }}>
            You asked, we answered.
          </h2>
          <p style={{ color: "#4A4A4A" }}>
            Still got questions? Feel free to reach out to our incredible support team, 7 days a week.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl bg-white/70 backdrop-blur overflow-hidden transition-all duration-700 ${
                animateElements ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/90 transition-colors"
              >
                <span className="font-medium text-left" style={{ color: "#2C3E50" }}>
                  {faq.question}
                </span>
                <span className="text-2xl" style={{ color: "#FDB714" }}>
                  {expandedIndex === i ? "−" : "+"}
                </span>
              </button>
              {expandedIndex === i && (
                <div className="px-6 pb-4 border-t" style={{ borderColor: "#E5E7EB", color: "#4A4A4A" }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 ${animateElements ? "opacity-100" : "opacity-0"}`}
        >
          <button
            className="px-8 py-3 rounded-full font-bold text-white transition-all hover:shadow-lg hover:scale-105"
            style={{ backgroundColor: "#FDB714" }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  )
}
