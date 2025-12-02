"use client"

export default function Footer() {
  return (
    <footer className="bg-white/60 backdrop-blur py-12 px-6 border-t" style={{ borderColor: "#E5E7EB" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: "#4169E1" }}></div>
              <span className="font-bold" style={{ color: "#2C3E50" }}>
                Sahay
              </span>
            </div>
            <p className="text-sm" style={{ color: "#4A4A4A" }}>
              Our comprehensive platform is designed to empower your organization by simplifying complex processes,
              fostering seamless collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold" style={{ color: "#2C3E50" }}>
              Pages
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#4A4A4A" }}>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold" style={{ color: "#2C3E50" }}>
              Resources
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#4A4A4A" }}>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  404
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold" style={{ color: "#2C3E50" }}>
              Utility Pages
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: "#4A4A4A" }}>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Utility Pages
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  404
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t text-center text-sm" style={{ borderColor: "#E5E7EB", color: "#4A4A4A" }}>
          <p>© 2025 Sahay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
