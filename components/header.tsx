"use client"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between rounded-full bg-white/80 backdrop-blur px-8 py-4 shadow-sm">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: "#4169E1" }}></div>
            <span className="font-bold text-lg" style={{ color: "#2C3E50" }}>
              Sahay
            </span>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#stats" className="text-sm" style={{ color: "#4A4A4A" }}>
              Stats
            </a>
            <a href="#features" className="text-sm" style={{ color: "#4A4A4A" }}>
              Features
            </a>
            <a href="#faq" className="text-sm" style={{ color: "#4A4A4A" }}>
              Faq
            </a>
          </div>

          {/* CTA Button */}
          <button
            className="px-6 py-2 rounded-full font-medium text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: "#FDB714" }}
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  )
}
