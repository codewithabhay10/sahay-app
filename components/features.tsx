"use client"

import { useEffect, useState, useRef } from "react"

const featuresList = [
  {
    icon: "https://framerusercontent.com/images/Qx1I38whO5MV1MpjrZ9TbkvZmM.svg?width=24&height=24",
    title: "Real-time Analytics",
    description: "Track status, approval rates, and distribution metrics with live dashboards.",
  },
  {
    icon: "https://framerusercontent.com/images/fcnGAkxzQ2tyQbDagHeYMgTek.svg?width=256&height=256",
    title: "Blockchain Security",
    description: "Immutable records on Fabric-like ledgers guarantee transparency and tamper resistance.",
  },
  {
    icon: "https://framerusercontent.com/images/GDK8xy92VX3VpUaqEghVbcvxsX0.svg?width=24&height=24",
    title: "AI-Powered Verification",
    description: "Machine learning ensures accurate beneficiary identification and reduces fraud.",
  },
  {
    icon: "https://framerusercontent.com/images/5Bak9dqo6L3G2gf7pKQsKlRbQU.svg?width=24&height=24",
    title: "Blockchain Security",
    description: "Immutable records on Fabric-like ledgers guarantee transparency and tamper resistance.",
  },
]

export default function Features() {
  const [animateElements, setAnimateElements] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateElements(true)
        }
      },
      { threshold: 0.2 }
    )

    const section = document.getElementById("features")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    const scrollSpeed = 0.5

    const animate = () => {
      scrollPosition += scrollSpeed
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollPosition
        // Reset when reaching end
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0
        }
      }
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div
          className={`text-center space-y-6 transition-all duration-1000 ${
            animateElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Badge */}
          <div className="flex justify-center">
            <div
              className="flex items-center gap-3 px-6 py-3"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "99px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  background: "radial-gradient(50% 50%, rgb(255, 162, 0) 0%, rgba(255, 162, 0, 0.69) 100%)",
                  borderRadius: "1000px",
                }}
              />
              <p className="text-sm font-medium" style={{ color: "rgb(94, 64, 0)" }}>
                Features
              </p>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  background: "radial-gradient(50% 50%, rgb(255, 162, 0) 0%, rgba(255, 162, 0, 0.69) 100%)",
                  borderRadius: "1000px",
                }}
              />
            </div>
          </div>

          {/* Heading */}
          <h3
            className="text-4xl md:text-5xl font-medium"
            style={{ textAlign: "center", color: "rgb(15, 15, 15)" }}
          >
            About the Platform
          </h3>

          {/* Description */}
          <p
            className="text-base max-w-3xl mx-auto"
            style={{ textAlign: "center", color: "rgb(15, 15, 15)" }}
          >
            The Digital Beneficiary Identification System leverages cutting-edge technology to identify, verify, and
            track eligible beneficiaries. We combine artificial intelligence, blockchain, and analytics to ensure
            transparent, fair, and efficient distribution of aid.
          </p>
        </div>

        {/* Scrolling Cards Container with Background */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            backgroundImage:
              "url(https://framerusercontent.com/images/gDTSJhM46wbHL90G2IUodOW4uuY.png?width=1988&height=1446)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Horizontal Scroll Container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto py-12 px-6 hide-scrollbar"
            style={{
              maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)",
            }}
          >
            <div className="flex gap-10" style={{ width: "max-content" }}>
              {/* Duplicate cards for infinite scroll effect */}
              {[...featuresList, ...featuresList].map((feature, i) => (
                <div
                  key={i}
                  className="shrink-0"
                  style={{
                    width: "360px",
                  }}
                >
                  <div
                    style={{
                      border: "3px solid rgb(255, 255, 255)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "24px",
                      padding: "2rem",
                    }}
                  >
                    {/* Icon with rotating background */}
                    <div
                      className="relative mb-6 mx-auto"
                      style={{
                        width: "80px",
                        height: "80px",
                        border: "4px solid rgb(252, 252, 252)",
                        backgroundColor: "rgb(255, 174, 0)",
                        borderRadius: "99px",
                        boxShadow:
                          "rgba(255, 255, 255, 0.35) 0px 0.602187px 0.541969px -0.583333px inset, rgba(255, 255, 255, 0.4) 0px 2.28853px 2.05968px -1.16667px inset, rgba(255, 255, 255, 0.62) 0px 10px 9px -1.75px inset",
                      }}
                    >
                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <img src={feature.icon} alt="" className="w-8 h-8" />
                      </div>
                      {/* Rotating Background */}
                      <div
                        className="absolute inset-0 animate-spin-slow"
                        style={{
                          backgroundImage:
                            "url(https://framerusercontent.com/images/oSmoZCBcliEugUiPUdOsbZvVd8Y.png?width=180&height=180)",
                          backgroundSize: "cover",
                          borderRadius: "99px",
                        }}
                      />
                    </div>

                    {/* Title */}
                    <p
                      className="text-xl font-medium mb-3"
                      style={{
                        textAlign: "left",
                        color: "rgb(38, 60, 72)",
                      }}
                    >
                      {feature.title}
                    </p>

                    {/* Description */}
                    <p
                      className="text-sm"
                      style={{
                        textAlign: "left",
                        color: "rgb(94, 64, 0)",
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  )
}
