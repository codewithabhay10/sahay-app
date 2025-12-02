import Header from "@/components/header"
import Hero from "@/components/hero"
import Stats from "@/components/stats"
import Features from "@/components/features"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F5E6D3" }}>
      <Header />
      <Hero />
      <Stats />
      <Features />
      <FAQ />
      <Footer />
    </main>
  )
}
