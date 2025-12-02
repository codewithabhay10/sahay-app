"use client"

export default function Footer() {
  return (
    <footer className="py-12 px-6" style={{ width: "100%", opacity: 1 }}>
      <div className="max-w-7xl mx-auto" style={{ opacity: 1 }}>
        <div
          className="rounded-[40px] p-12"
          style={{
            border: "1px solid rgb(237, 239, 243)",
            backgroundColor: "rgb(255, 255, 255)",
            opacity: 1,
          }}
        >
          <div className="flex flex-col lg:flex-row gap-12" style={{ opacity: 1 }}>
            {/* Logo and Description */}
            <div className="flex-1 space-y-4" style={{ opacity: 1 }}>
              <a href="./" className="inline-block" style={{ borderRadius: "10px", opacity: 1 }}>
                <div style={{ borderRadius: "10px", opacity: 1 }}>
                  <img
                    src="https://framerusercontent.com/images/vTOb6B02y0BqN1vVhaRu2HxvB0.png?width=488&height=172"
                    alt="logo"
                    className="h-12 w-auto object-cover"
                  />
                </div>
              </a>
              <p className="text-sm" style={{ color: "rgb(38, 60, 72)", opacity: 1 }}>
                A unified portal for citizens, organizations, and administrators to manage documents, verify
                identities, and apply for welfare schemes securely
              </p>
            </div>

            {/* Menu Sections */}
            <div className="flex flex-col sm:flex-row gap-12" style={{ opacity: 1 }}>
              {/* Pages */}
              <div className="space-y-4" style={{ opacity: 1 }}>
                <h4
                  className="font-semibold"
                  style={{ color: "rgb(38, 60, 72)", opacity: 1 }}
                >
                  Pages
                </h4>
                <div className="space-y-2" style={{ opacity: 1 }}>
                  <a
                    href="./#features"
                    className="block text-sm hover:text-orange-500 transition-colors"
                    style={{
                      color: "rgb(38, 60, 72)",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      borderRadius: "99px",
                      opacity: 1,
                    }}
                  >
                    Features
                  </a>
                  <a
                    href="./"
                    className="block text-sm hover:text-orange-500 transition-colors"
                    style={{
                      color: "rgb(38, 60, 72)",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      borderRadius: "99px",
                      opacity: 1,
                    }}
                  >
                    Pricing
                  </a>
                </div>
              </div>

              {/* Resources */}
              <div className="space-y-4" style={{ opacity: 1 }}>
                <h4
                  className="font-semibold"
                  style={{ color: "rgb(38, 60, 72)", opacity: 1 }}
                >
                  Resources
                </h4>
                <div className="space-y-2" style={{ opacity: 1 }}>
                  <a
                    href="./"
                    className="block text-sm hover:text-orange-500 transition-colors"
                    style={{
                      color: "rgb(38, 60, 72)",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      borderRadius: "99px",
                      opacity: 1,
                    }}
                  >
                    Blog
                  </a>
                  <a
                    href="./contact"
                    className="block text-sm hover:text-orange-500 transition-colors"
                    style={{
                      color: "rgb(38, 60, 72)",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      borderRadius: "99px",
                      opacity: 1,
                    }}
                  >
                    Contact
                  </a>
                </div>
              </div>

              {/* Utility Pages */}
              <div className="space-y-4" style={{ opacity: 1 }}>
                <h4
                  className="font-semibold"
                  style={{ color: "rgb(38, 60, 72)", opacity: 1 }}
                >
                  Utility Pages
                </h4>
                <div className="space-y-2" style={{ opacity: 1 }}>
                  <a
                    href="./privacy-policy"
                    className="block text-sm hover:text-orange-500 transition-colors"
                    style={{
                      color: "rgb(38, 60, 72)",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      borderRadius: "99px",
                      opacity: 1,
                    }}
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="./404"
                    className="block text-sm hover:text-orange-500 transition-colors"
                    style={{
                      color: "rgb(38, 60, 72)",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      borderRadius: "99px",
                      opacity: 1,
                    }}
                  >
                    404
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
