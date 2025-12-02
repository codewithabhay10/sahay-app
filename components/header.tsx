"use client"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-5xl px-6 py-6">
        <div
          className="flex items-center justify-between px-8 py-4"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "99px",
            border: "3px solid rgb(255, 255, 255)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center">
            <a href="./" className="block" style={{ borderRadius: "10px" }}>
              <div style={{ borderRadius: "10px" }}>
                <img
                  decoding="auto"
                  width="488"
                  height="172"
                  src="https://framerusercontent.com/images/vTOb6B02y0BqN1vVhaRu2HxvB0.png?width=488&height=172"
                  alt="Sahay logo"
                  className="h-10 w-auto object-cover"
                  style={{ borderRadius: "10px" }}
                />
              </div>
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2" style={{ borderRadius: "99px" }}>
            <a
              href="./#stats"
              className="px-6 py-2 rounded-full transition-all group"
              style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <p className="text-sm font-medium transition-colors group-hover:text-white" style={{ color: "rgb(94, 64, 0)" }}>
                Stats
              </p>
            </a>
            <a
              href="./#features"
              className="px-6 py-2 rounded-full transition-all group"
              style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <p className="text-sm font-medium transition-colors group-hover:text-white" style={{ color: "rgb(94, 64, 0)" }}>
                Features
              </p>
            </a>
            <a
              href="./#faq"
              className="px-6 py-2 rounded-full transition-all group"
              style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <p className="text-sm font-medium transition-colors group-hover:text-white" style={{ color: "rgb(94, 64, 0)" }}>
                Faq
              </p>
            </a>
          </nav>

          {/* CTA Button */}
          <a
            href="/signup"
            className="px-6 py-2 rounded-full font-medium transition-all hover:shadow-lg"
            style={{
              backgroundColor: "rgb(255, 174, 0)",
              border: "3px solid rgb(255, 255, 255)",
              borderRadius: "99px",
              color: "rgb(94, 64, 0)",
            }}
          >
            Get Started
          </a>
        </div>
      </nav>
    </header>
  )
}
